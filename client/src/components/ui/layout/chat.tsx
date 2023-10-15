import { useState } from 'react';
import Bubble from '../bubble';
import { Button } from '../button';
import { Input } from '../input';
import { SendHorizontal } from 'lucide-react';

interface ChatProps {
  role: string;
  content: string;
}

const fetchPrompt = async (prompt: string) => {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  try {
    const response = await fetch(`${base}/gpt/chat?prompt=${prompt}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    return res;
  } catch {
    throw new Error('Error fetching response!');
  }
};

const Chat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [log, setLog] = useState<ChatProps[]>([]);

  const generateResponse = async (event: React.FormEvent<HTMLFormElement>) => {
    const content = event.currentTarget.prompt.value;
    event.preventDefault();
    setLog([...log, { role: 'user', content }]);
    setLoading(true);

    try {
      const res = await fetchPrompt(content);
      setLog((previous) => [...previous, res]);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 w-[80%] border-l py-2 space-y-4 overflow-hidden">
      <div className="py-4" />
      <div className="h-[86%] w-full py-4 space-y-4 overflow-scroll">
        {log.map(({ role, content }, index) => (
          <Bubble key={index} role={role} content={content} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          generateResponse(e);
        }}
        className="h-[15%] relative py-4"
      >
        <Input
          id="prompt"
          name="prompt"
          type="text"
          className="h-[50%] text-md"
          placeholder="Enter your prompt here."
          disabled={loading ? true : false}
        />
        <Button
          type="submit"
          className="absolute right-4 items-center bottom-0 top-6 rounded-full text-white bg-[#5E5ADB]"
          disabled={loading ? true : false}
        >
          <SendHorizontal className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;

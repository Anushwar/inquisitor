import { useRef, useState } from 'react';
import Bubble from '../ui/bubble';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash, Paperclip, SendHorizontal } from 'lucide-react';
import { fetchCSVResult, fetchPrompt } from '@/api/gpt';
import { useToast } from '@/hooks/use-toast';
import { parseConfig } from '@/utils';
import Papa from 'papaparse';

interface ChatProps {
  role: string;
  content: string;
  file?: string;
  graph?: {
    xField: string;
    yField: string;
    graph_type: string;
    data: unknown[];
  };
}

const Chat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [log, setLog] = useState<ChatProps[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedFile, setParsedFile] = useState<unknown[]>([]);
  const { toast } = useToast();

  const generateResponse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const content = event.currentTarget.prompt.value;

    if (file) {
      formData.append('file', file);
      formData.append('prompt', content);
      setLog([
        ...log,
        {
          role: 'user',
          content: content,
          file: file?.name.replace('.csv', ''),
        },
      ]);
    } else {
      setLog([...log, { role: 'user', content }]);
    }

    setFile(null);
    setLoading(true);

    try {
      const res = formData?.entries().next().done
        ? await fetchPrompt(content)
        : await fetchCSVResult(formData);

      res?.function_call
        ? setLog((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                'Referring to the data from the csv, check out the visualisation below.',
              graph: {
                ...parseConfig(JSON.parse(res?.function_call.arguments)),
                data: [...parsedFile],
              },
            },
          ])
        : setLog((previous) => [...previous, res]);
    } catch {
      toast({
        title: 'Error!',
        description: 'Error generating prompt!',
        variant: 'destructive',
        dir: 'top',
      });
    }

    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      Papa.parse(uploadedFile, {
        complete: (result) => {
          setParsedFile(result?.data);
        },
        header: true,
      });
    }
  };

  return (
    <div className="px-4 w-[80%] border-l py-2 space-y-4 overflow-hidden">
      <div className="py-4" />
      <div className="h-[86%] w-full py-4 space-y-4 overflow-scroll">
        {log.length === 0 ? (
          <div className="flex justify-center w-full">
            <div className="max-w-md bg-slate-100 border text-center rounded-md border-slate-400 p-2 font-medium">
              Please input a CSV file and/or enter a prompt to get started.
              <br />
            </div>
          </div>
        ) : (
          log.map(({ role, content, file, graph }, index) => (
            <Bubble
              key={index}
              role={role}
              content={content}
              file={file}
              graph={graph}
            />
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          generateResponse(e);
          e.currentTarget.reset();
        }}
        className="h-[15%] relative py-4"
      >
        {file && (
          <div className="absolute py-1 flex justify-between rounded-md px-2 bg-green-100 text-green-700 font-bold w-full border border-green-200 top-[-18%]">
            <span>{file?.name}</span>
            <Trash
              onClick={() => setFile(null)}
              className="w-6 h-6 cursor-pointer items-center font-bold text-red-600"
            />
          </div>
        )}
        <Input
          id="prompt"
          name="prompt"
          type="text"
          required={file === null}
          className="h-[50%] w-[85%] text-md"
          placeholder="Enter your query here (You can also input a CSV file along with your prompt)."
          disabled={loading ? true : false}
        />
        <div className="absolute gap-2 right-4 flex bottom-0 top-6">
          <div className="relative">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="items-center rounded-full text-black hover:bg-slate-300 bg-transparent"
              disabled={loading ? true : false}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              id="fileInput"
              type="file"
              accept=".csv"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e)}
              disabled={loading ? true : false}
            />
          </div>
          <Button
            type="submit"
            className="items-center rounded-full text-white bg-[#5E5ADB]"
            disabled={loading ? true : false}
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;

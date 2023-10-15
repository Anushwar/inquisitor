import Bubble from '../bubble';
import { Button } from '../button';
import { Input } from '../input';
import { SendHorizontal } from 'lucide-react';

const mock = [
  {
    sender: 'bot',
    content: 'Hey There!!',
  },
  {
    sender: 'user',
    content: 'Hi! How are you?',
  },
  {
    sender: 'bot',
    content: 'Never been better!',
  },
];

const Chat = () => {
  return (
    <div className="px-4 w-[80%] border-l py-2 space-y-4 overflow-hidden">
      <div className="py-4" />
      <div className="h-[86%] w-full py-4 space-y-4 overflow-scroll">
        {mock.map(({ sender, content }, index) => (
          <Bubble key={sender + index} sender={sender} content={content} />
        ))}
      </div>
      <div className="h-[15%] relative py-4">
        <Input
          type="text"
          className="h-[50%] text-md"
          placeholder="Enter your prompt here."
        />
        <Button
          type="submit"
          className="absolute right-4 items-center bottom-0 top-6 rounded-full text-white bg-[#5E5ADB]"
        >
          <SendHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;

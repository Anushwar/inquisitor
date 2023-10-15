import { User, Bot } from 'lucide-react';

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  sender: string;
  content: string;
}

const Bubble = ({ sender, content, ...rest }: BubbleProps) => {
  return (
    <div
      key={sender}
      className={`flex py-4 mb-4 ${
        sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
      {...rest}
    >
      <div
        className={`flex ${
          sender === 'user' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {sender === 'user' ? (
          <User className="w-8 h-8 rounded-full" />
        ) : (
          <Bot className="w-8 h-8 rounded-full" />
        )}

        <div
          className={`p-4 max-w-xs mx-2 ${
            sender === 'user'
              ? 'bg-[#5E5ADB] text-white rounded-l-lg rounded-br-lg'
              : 'bg-gray-200 rounded-r-lg rounded-bl-lg'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Bubble;

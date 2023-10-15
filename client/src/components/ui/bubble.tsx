import { User, Bot } from 'lucide-react';

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string;
  content: string;
}

const Bubble = ({ role, content, ...rest }: BubbleProps) => {
  return (
    <div
      key={role}
      className={`flex py-4 mb-4 ${
        role !== 'assistant' ? 'justify-end' : 'justify-start'
      }`}
      {...rest}
    >
      <div
        className={`flex ${
          role !== 'assistant' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {role !== 'assistant' ? (
          <User className="w-8 h-8 rounded-full" />
        ) : (
          <Bot className="w-8 h-8 rounded-full" />
        )}

        <div
          className={`p-4 max-w-lg mx-2 ${
            role !== 'assistant'
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

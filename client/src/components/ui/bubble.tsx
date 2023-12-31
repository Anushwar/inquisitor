import { Paperclip, User, Bot } from 'lucide-react';
import Chart from './chart';

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
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

const Bubble = ({ role, content, file, graph, ...rest }: BubbleProps) => {
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
          className={`p-4 max-w-xl w-full mx-2 whitespace-pre-line ${
            role !== 'assistant'
              ? 'bg-[#5E5ADB] text-white rounded-l-lg rounded-br-lg'
              : 'bg-gray-200 rounded-r-lg rounded-bl-lg'
          }`}
        >
          {file && (
            <>
              <div className="border flex flex-row justify-between gap-2 items-center border-green-300 bg-green-100 p-2 rounded-md text-green-800 font-bold">
                <Paperclip className="w-4 h-4" />
                {file}
              </div>
              <br />
            </>
          )}
          <span>{content}</span>
          {graph?.data && graph?.data?.length > 0 && <Chart {...graph} />}
        </div>
      </div>
    </div>
  );
};

export default Bubble;

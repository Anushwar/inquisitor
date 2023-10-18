import { Button } from '../ui/button';
import { Plus, MessageSquare } from 'lucide-react';

const Logs = () => {
  return (
    <div className="px-4 w-[20%] border-r py-2 space-y-4">
      <div className="border-b-2 py-4">
        <div className="px-2">
          <h2 className="text-xl font-bold">Inquisitor</h2>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full justify-start gap-5 shadow-md"
      >
        <span>
          <Plus className="w-4 h-4" />
        </span>
        <p className="font-bold">New Chat</p>
      </Button>
      <div className="space-y-4 h-[80%] overflow-scroll">
        {[...new Array(20)].map((_, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start gap-5"
          >
            <span>
              <MessageSquare className="w-4 h-4" />
            </span>
            <p className="truncate">Data Chat {index + 1}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Logs;

import Chat from './chat';
import Logs from './logs';

const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <Logs />
      <Chat />
    </div>
  );
};

export default Layout;

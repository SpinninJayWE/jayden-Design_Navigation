import {Box, Card} from '@mui/material';
import SessionList from "../components/chat/session-list";
import {Outlet, useLocation} from "react-router-dom";


export const Chat = () => {
  const { pathname } = useLocation()
  return (
      <div className={'h-full flex gap-4'}>
        <SessionList />
        <Card className={'container p-6'} sx={{
        }}>
          <Outlet key={pathname} />
        </Card>
      </div>
  );
}

export default Chat;

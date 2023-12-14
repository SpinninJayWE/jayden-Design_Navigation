import {Box, Card} from '@mui/material';
import SessionListContainer from "../components/chat/session-list";
import {Outlet, useLocation, useOutlet} from "react-router-dom";
import { SwitchTransition, CSSTransition } from 'react-transition-group'

export const Chat = () => {
  const { key, pathname } = useLocation()
  return (
      <div className={'h-full flex gap-4'}>
        <SessionListContainer />
        <Box
            bgcolor={'background.paper'}
            borderRadius={4}
            boxShadow={6} className={'container p-6'}
            position='relative'
            overflow={'hidden'}
          >
          <SwitchTransition>
            <CSSTransition
              key={pathname}
              timeout={200}
              classNames="fade"
              unmountOnExit
            >
              <Outlet key={pathname}/>
            </CSSTransition>
          </SwitchTransition>
        </Box>
      </div>
  );
}

export default Chat;

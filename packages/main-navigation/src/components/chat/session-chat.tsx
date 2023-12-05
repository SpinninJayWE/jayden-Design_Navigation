import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
	Avatar,
	Box,
	Divider,
	Fab,
	InputAdornment,
	ListItemAvatar,
	Slide,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListItemText from '@mui/material/ListItemText';
import { SendRounded } from '@mui/icons-material';
import { BASE_URL } from 'plugins/service';
import { useAuth } from '../../providers/user';
import { getChatSession, sendChat } from 'plugins/service/gpt-api';
import useInView from '../../hooks/useInView';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ChatItem = React.memo(({ role, message, textLoading }: {role: 'user' | 'assistant', message: string, textLoading?: boolean}) => {
	const { user } = useAuth();
  const roleComp = useMemo(() => {
    return role === 'user'?  user.username : 'Assistant'
  }, [role, user.username])
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar
          alt='Travis Howard'
          src={`${BASE_URL}${
            role === 'user'
              ? user.avatar?.url
              : '/uploads/thumbnail_161958ae_498e_4d31_ba9c_67e9fa1c8bf8_d2542c9d63.webp'
          }`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={roleComp}
        secondary={
          <div className={'mt-2'}>
            <Typography
              lineHeight={2}
              variant={'body2'}
              color={'text.primary'}
            >
              {message}
              {
                textLoading &&
                  <LoadingButton
                    variant={'text'}
                    color={'primary'}
                    loading={true}
                  >
                  </LoadingButton>
              }
            </Typography>
          </div>
        }
      ></ListItemText>
    </ListItem>
  )
})

type Chat = {
  role: 'user' | 'assistant',
  content: string
}

export const SessionChatWindow = () => {
	const { id } = useParams();

	const [sessionId, setSessionId] = useState<string>(id ?? 'new');

	const [chat, setChat] = useState<Chat[]>([]);
	const [message, setMessage] = useState<string>('');
	const [messageLoading, setMessageLoading] = useState<boolean>(false);
	const nav = useNavigate();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [aiMessage, setAiMessage] = useState<Chat>({
		role: 'assistant',
		content: '',
	});

  const textFieldRef = useRef<HTMLDivElement>(null);

  const messageEndInView = useInView(messagesEndRef)

	const scrollToBottom = (smooth = false) => {
		messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
	};

	useEffect(() => {
		if (messageEndInView) {
      scrollToBottom(); // 当 chat 变化时，滚动到底部
    }
	}, [chat, aiMessage.content]); // 依赖项是 chat

	useEffect(() => {
		if (sessionId && sessionId !== 'new') {
      getChatSession(id!).then(res => {
        const { messages } = res.data
        if (messages) {
          setChat(messages)
        } else {
          nav('/chat/new');
        }
      })
		}
	}, []);

	const handleSend = () => {
		setChat((val) => {
			return [
				...val,
				{
					role: 'user',
					content: message,
				},
			];
		});
    setAiMessage((val) => {
      return {
        ...val,
        content: '',
      };
    });
		setMessageLoading(true);
    sendChat(sessionId, message, (data) => {
      setAiMessage((val) => {
        return {
         ...val,
          content: data.snapshot
        };
      })
    }).then((res: any) => {
      if (sessionId === 'new' && res.newSessionId) {
        setSessionId(res.newSessionId)
      }
      setChat((val) => {
        return [
          ...val,
          {
            role: 'assistant',
            content: res.content
          }
        ];
      })
      setMessageLoading(false);

    })
		setMessage('');
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			// 触发您想要的事件
			handleSend();
		}
	};
	return (
		<Box className={'h-full flex flex-col gap-4'} sx={{
      position: 'relative'
    }}>
			<div className={'flex-auto overflow-y-scroll'}>
				<List>
					{chat.map((item, index) => {
						return (
							<>
								{index > 0 && (
									<Divider key={index + 'Divider'} variant='inset' component='li' />
								)}
								<ChatItem key={index} role={item.role} message={item.content} />
							</>
						);
					})}
					{messageLoading && (
						<>
              <ChatItem role={aiMessage.role} message={aiMessage.content} textLoading={messageLoading} />
            </>
					)}
					<div ref={messagesEndRef} />
				</List>
			</div>
			<div ref={textFieldRef} className={'mt-auto'}>
				<TextField
					maxRows={4}
					autoFocus
					multiline={true}
					fullWidth
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onKeyDown={handleKeyDown}
					value={message}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<LoadingButton
									variant={'contained'}
									disabled={!message}
									loading={messageLoading}
									onClick={handleSend}
									endIcon={<SendRounded />}
								>
									Send
								</LoadingButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
      <Slide direction="up" in={!messageEndInView} mountOnEnter unmountOnExit>
        <Fab 
          sx={{
            position: 'absolute',
            bottom: 20 + (textFieldRef.current?.clientHeight || 0),
            right: '50%',
          }}
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => scrollToBottom(true)}
          >
          <ArrowDownwardIcon />
        </Fab>
      </Slide>
		</Box>
	);
};

export default SessionChatWindow;

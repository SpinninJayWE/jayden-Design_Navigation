import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useRef, useState} from "react";
import {getSession, sendMessageStrem, sendSessionMessage} from "plugins/service/apis";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Avatar, Box, Button, Divider, InputAdornment, ListItemAvatar, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import ListItemText from "@mui/material/ListItemText";
import {SendRounded} from "@mui/icons-material";
import {BASE_URL} from "plugins/service";
import {useAuth} from "../../providers/user";

function simplifyHistory(history: any[]) {
  return history.map((item: any) => {
    // 确定发送者是人类还是AI
    const sender = item.id && item.id.length && item.id.includes("HumanMessage") ? "You" : "AI";

    // 提取主要信息
    const content = item.kwargs.content;

    // 返回简化的结构
    return { sender, content };
  });
}


export const SessionChatWindow = () => {
  const { id } = useParams()

  const [sessionId, setSessionId] = useState<string>(id ?? 'new')

  const { user } = useAuth()
  const [chat, setChat] = useState<any[]>([])
  const [message, setMessage] = useState<string>('')
  const [messageLoading, setMessageLoading] = useState<boolean>(false)
  const nav = useNavigate()
  const messagesEndRef = useRef<any>(null)

  const [aiMessage , setAiMessage] = useState<any>({
    sender: 'AI',
    content: ''
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();  // 当 chat 变化时，滚动到底部
  }, [chat, aiMessage.content]);  // 依赖项是 chat
  useEffect(() => {
    if (sessionId && sessionId !== 'new') {
        getSession(id!).then(res => {
          if (!res.error) {
            setChat(simplifyHistory(res.history) ?? [])
          } else {
            nav('/chat/new')
          }

        })
    }
    const chatSSEService = new EventSource(`${BASE_URL}/api/strapi-chat-stream/${sessionId}`)

    chatSSEService.onmessage = (e) => {
      const data = JSON.parse(e.data)
      setAiMessage(val => {
        return {
          ...val,
          content: val.content + data.message
        }
      })
    }

    return () => {
      chatSSEService.close()
    }

  }, []);


  const handleSend = () => {
    setChat(val => {
      return [
        ...val,
        {
          sender: 'You',
          content: message
        }
      ]
    })
    setAiMessage(val => {
      return {
       ...val,
        content: ''
      }
    })
    setMessage('')
    setMessageLoading(true)
    sendSessionMessage(sessionId, message).then(({ data }) => {
      setChat(val => {
        return [
            ...val,
          {
            sender: 'AI',
            content: data.response
          }
        ]
      })
      if (sessionId === 'new') {
        setSessionId(data.sessionId)
      }
      setMessageLoading(false)
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // 触发您想要的事件
      handleSend()
    }
  };
  return (
      <Box className={'h-full flex flex-col gap-4'}>
        <div className={'flex-auto overflow-y-scroll'}>
          <List>
            {
              chat.map((item, index) => {
                return (
                    <>
                      {index > 0 && <Divider variant="inset" component="li" />}
                      <ListItem key={index} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                              alt="Travis Howard"
                              src={`${BASE_URL}${item.sender === 'You'? user.avatar?.url : '/uploads/thumbnail_161958ae_498e_4d31_ba9c_67e9fa1c8bf8_d2542c9d63.webp' }`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.sender}
                            secondary={
                              <div className={'mt-2'}>
                                <Typography
                                    lineHeight={2}
                                    variant={'body2'}
                                    color={'text.primary'}>
                                  {item.content}
                                </Typography>
                              </div>
                            }
                        >
                        </ListItemText>
                      </ListItem>
                    </>
                )

              })
            }
            {
                messageLoading && (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src={`${BASE_URL}/uploads/thumbnail_161958ae_498e_4d31_ba9c_67e9fa1c8bf8_d2542c9d63.webp }`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                          primary={aiMessage.sender}
                          secondary={
                            <div className={'mt-2'}>
                              <Typography
                                  lineHeight={2}
                                  variant={'body2'}
                                  color={'text.primary'}>
                                {aiMessage.content}
                              </Typography>
                            </div>
                          }
                      >
                      </ListItemText>
                    </ListItem>
                )
            }
            <div ref={messagesEndRef} />
          </List>
        </div>
        <div className={'mt-auto'}>
          <TextField
              maxRows={4}
              autoFocus
              multiline={true}
              fullWidth
              onChange={e => {
                setMessage(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              value={message}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <LoadingButton
                          variant={'contained'}
                          disabled={(!message)}
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
      </Box>
  )
}


export default SessionChatWindow
import { useParams } from "react-router-dom"
import {useEffect, useRef, useState} from "react";
import {getSession, sendMessageStrem, sendSessionMessage} from "plugins/service/apis";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";

export const SessionChatWindow = () => {
  const { id } = useParams()

  let [sessionId, setSessionId] = useState<string>(id ?? 'new')

  const [chat, setChat] = useState<any[]>([])
  const [message, setMessage] = useState<string>('')
  const [messageLoading, setMessageLoading] = useState<boolean>(false)

  const messagesEndRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();  // 当 chat 变化时，滚动到底部
  }, [chat]);  // 依赖项是 chat
  useEffect(() => {
    if (sessionId && sessionId !== 'new') {
        getSession(id!).then(res => {
          if (!res.error) {
            setChat(res.history ?? [])
          }

        })
    }
  }, []);


  const handleSend = () => {
    setChat(val => {
      return [
        ...val,
        {
          kwargs: {
            content: message
          }
        }
      ]
    })
    setMessage('')
    setMessageLoading(true)
    sendSessionMessage(sessionId, message).then(({ data }) => {
      setChat(val => {
        return [
            ...val,
          {
            kwargs: {
              content: data.response
            }
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
                    <ListItem key={index}>
                      {item.kwargs.content}
                    </ListItem>
                )
              })
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
                          loading={messageLoading}
                          onClick={handleSend}
                      >
                        发送
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
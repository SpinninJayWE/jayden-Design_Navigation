import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import {getSession} from "plugins/service/apis";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const SessionChatWindow = () => {
  const { id } = useParams()

  const [chat, setChat] = useState<any[]>([])

  useEffect(() => {
    getSession(id!).then(res => {
      setChat(res.history)
    })
  }, []);
  return (
      <>
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
        </List>
      </>
  )
}


export default SessionChatWindow
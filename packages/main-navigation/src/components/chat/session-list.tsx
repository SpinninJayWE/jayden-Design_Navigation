import React, {useEffect, useMemo} from "react";
import useTheme from "../../hooks/useTheme";
import {getAllSessions, getSession} from "plugins/service/apis";
import { getChatList } from "plugins/service/gpt-api";
import {Tree, TreeNode} from "../TreeList";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const SessionList = () => {

  const [sessions, setSessions] = React.useState<any[]>([])

  const nav = useNavigate()
  const treeData = useMemo(() => {
    return sessions.map(item => {
      return {
        key: item.sessionId,
        title: item.title || item.sessionId
      }
    })
  }, [sessions])

  useEffect(() => {
    getChatList().then(res => {
      setSessions(res.data)
    })
  }, []);

  const handleNodeSeleted = (node: TreeNode) => {
   nav('/chat/' + node.key)
  }

  const handleNewChat = () => {
    nav('/chat/new')
  }

  return (
      <Box
          className='overflow-y-auto'
          bgcolor={'background.paper'}
          borderRadius={2}
          boxShadow={5}
          py={2}
          px={1}
          width={220}
      >
        <Button onClick={handleNewChat} variant={'contained'} color={'secondary'} className={'mt-2'} fullWidth>
          New Chat
        </Button>
        <Tree onNodeSelect={handleNodeSeleted} treeData={treeData} />
      </Box>
  )
}

export default SessionList
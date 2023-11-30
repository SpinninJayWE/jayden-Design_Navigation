import React, {useEffect, useMemo} from "react";
import useTheme from "../../hooks/useTheme";
import {getAllSessions, getSession} from "plugins/service/apis";
import {Tree, TreeNode} from "../TreeList";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const SessionList = () => {

  const [sessions, setSessions] = React.useState<any[]>([])

  const { theme } = useTheme()
  const nav = useNavigate()
  const treeData = useMemo(() => {
    return sessions.map(item => {
      return {
        key: item,
        title: item
      }
    })
  }, [sessions])

  useEffect(() => {
    getAllSessions().then(res => {
      setSessions(res.data)
    })
  }, []);

  const handleNodeSeleted = (node: TreeNode) => {
   nav('/chat/' + node.key)
  }

  return (
      <Box
          className={'shadow-lg rounded-lg p-4 py-6'}
          sx={{
            width: 220,
            backgroundColor: theme.background.paper
          }}
      >
        <Button variant={'contained'} color={'secondary'} className={'mt-2'} fullWidth>
          New Chat
        </Button>
        <Tree onNodeSelect={handleNodeSeleted} treeData={treeData} />
      </Box>
  )
}

export default SessionList
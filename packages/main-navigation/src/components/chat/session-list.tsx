import React, {useEffect, useMemo, useState} from "react";
import { getChatList } from "plugins/service/gpt-api";
import {Tree, TreeNode} from "../TreeList";
import {Box, Button, Fab, Hidden, SwipeableDrawer, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {ChatBubbleOutline, FeaturedPlayList, HistorySharp} from "@mui/icons-material";

export const SessionList = ({setDrawerOpen} : any) => {

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

  const isMdDown = useMediaQuery('(max-width:600px)')

  const handleNodeSeleted = (node: TreeNode) => {
   nav('/chat/' + node.key)
    if (isMdDown) {
      setDrawerOpen(false)
    }
  }

  const handleNewChat = () => {
    nav('/chat/new')
  }



  const boxStyle = useMemo(() => {
   return !isMdDown ? {
     bgcolor: 'background.paper',
     borderRadius:2,
     boxShadow: 5
   } :
   {}
  }, [isMdDown])
  return (
      <Box
          className='overflow-y-auto'
          py={2}
          px={1}
          width={220}
          {...boxStyle}
      >
        <Button onClick={handleNewChat} variant={'contained'} color={'secondary'} className={'mt-2'} fullWidth>
          New Chat
        </Button>
        <Tree onNodeSelect={handleNodeSeleted} treeData={treeData} />
      </Box>
  )
}


export const SessionListContainer = () => {

  const [ drawerOpen, setDrawerOpen ] = useState(false)

  return (
      <>
        <Hidden smDown>
          <SessionList />
        </Hidden>
        <Hidden smUp>
          <SwipeableDrawer open={drawerOpen} onClose={() => {
            setDrawerOpen(false)
          }} onOpen={() => {
            setDrawerOpen(true)
          }}>
            <SessionList setDrawerOpen={setDrawerOpen} />
          </SwipeableDrawer>
          <Fab
              sx={{
                position: 'absolute',
                top: 95,
                left: 15,
              }}
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => {
                setDrawerOpen(true)
              }}
          >
            <HistorySharp />
          </Fab>
        </Hidden>
      </>
  )
}

export default SessionListContainer
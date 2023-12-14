import React, {useEffect, useMemo, useState} from "react";
import { getChatList } from "plugins/service/gpt-api";
import {Tree, TreeNode} from "../TreeList";
import {
  Box,
  Button,
  Divider,
  Fab, Fade,
  Hidden, Skeleton,
  SwipeableDrawer,
  useMediaQuery
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { HistorySharp, Refresh} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {css} from "@emotion/react";
import useTheme from "../../hooks/useTheme";

export const SessionList = ({setDrawerOpen} : any) => {

  const [sessions, setSessions] = React.useState<any[]>([])

  const [loading, setLoading] = React.useState<boolean>(false)

  const nav = useNavigate()
  const treeData = useMemo(() => {
    return sessions.map(item => {
      return {
        key: item.sessionId,
        title: item.title || item.sessionId
      }
    })
  }, [sessions])

  const fetchData = () => {
    if (sessions.length === 0) {
      setLoading(true)
    }
    const startTime = Date.now(); // 获取请求开始时间
    getChatList().then(res => {
      setSessions(res.data)
    }).finally(() => {
      if (sessions.length > 0) return
      const endTime = Date.now(); // 获取请求结束时间
      const requestTime = endTime - startTime; // 计算请求时间
      if (requestTime < 500) {
        setTimeout(() => {
          setLoading(false)
        }, 500 - requestTime)
      } else {
        setLoading(false)
      }
    })
  }


  useEffect(() => {
    fetchData()
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

  const { theme } = useTheme()

  const chatListStyle = css`
    /* 修改滚动条的样式 */
    ::-webkit-scrollbar {
      width: 4px; /* 设置滚动条的宽度 */
    }

    /* 为滚动条轨道添加背景颜色 */
    ::-webkit-scrollbar-track {
      background-color: ${theme.background.paper};
    }

    /* 为滚动条添加滑块的样式 */
    ::-webkit-scrollbar-thumb {
      background-color: ${theme.border};
    }

    /* 鼠标移入滚动条时的样式 */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `
  return (
      <Box
          className='flex flex-col overflow-hidden'
          width={220}
          {...boxStyle}
      >
        <Box
            px={2}
            py={2}
        >
          <Button size={'small'} onClick={handleNewChat} variant={'contained'} color={'secondary'} fullWidth>
            New Chat
          </Button>
          <LoadingButton loading={loading} size={'small'} startIcon={<Refresh/>} sx={{marginTop: 1}} color={'info'} onClick={fetchData} variant={'contained'} fullWidth>
            Refresh List
          </LoadingButton>
        </Box>
        <Divider />
        {
          !loading ?
            <Box css={chatListStyle} className={'overflow-y-auto'} sx={{
              transform: 'translateZ(0)'
            }}>
              <Tree animations={true} onNodeSelect={handleNodeSeleted} treeData={treeData} />
            </Box>
            :
            <div className={'p-3 flex flex-col gap-2 flex-1 justify-center'}>
              {
                Array.from({length: 18}).map((item, idx) => {
                  return (
                    <Skeleton key={idx} variant={'rectangular'} animation="wave" className={'flex-1'}  />
                  )
                })
              }
            </div>
        }
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
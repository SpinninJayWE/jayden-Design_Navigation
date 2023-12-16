import React, {useCallback, useEffect, useMemo, useState} from "react";
import {deleteSession, getChatList} from "plugins/service/gpt-api";
import {Lists, ListItemInstanceCallBack, Tree, TreeNode} from "../TreeList";
import {
  Box,
  Button,
  Divider,
  Fab, Fade,
  Hidden, IconButton, Menu, MenuItem, Popover, Skeleton,
  SwipeableDrawer, Typography,
  useMediaQuery
} from "@mui/material";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {HistorySharp, MoreHoriz, Refresh} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import useTheme from "../../hooks/useTheme";


const CustomAction: React.FC<any> = ({ sessionId, fetchData, nav }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = async (e:  React.MouseEvent<HTMLElement>, action: string) => {
    e.stopPropagation();
    let res = {}
    switch (action) {
      case 'edit':
        break
      case 'delete':
        res = await deleteSession(sessionId)
          fetchData()
          nav('/chat/new', {replace: true})
        break
      default:
        break
    }

    handleClose();
  };
  return (
    <>
      <IconButton size={'small'} onClick={handleClick}>
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled onClick={(e) => handleAction(e, 'edit')}>Edit</MenuItem>
        <MenuItem onClick={(e) => handleAction(e, 'delete')}>Delete</MenuItem>
      </Menu>
    </>
  )
}

export const SessionList = ({setDrawerOpen} : any) => {

  const [sessions, setSessions] = React.useState<any[]>([])

  const [loading, setLoading] = React.useState<boolean>(false)
  const [activeSessionKey, setActiveSessionKey] = React.useState<string>('')

  const nav = useNavigate()
  const { id: urlParamsSessionId } = useParams()


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

  useEffect(() => {
    if (urlParamsSessionId) {
      setActiveSessionKey(urlParamsSessionId)
    }
  }, [urlParamsSessionId])

  const handleNodeSelected: ListItemInstanceCallBack = ({ text, key }) => {
    nav('/chat/' + key)
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

  const customActionNode: ListItemInstanceCallBack<React.ReactNode> = ({ text, key } )=> {
    return <CustomAction {...{text, sessionId: key, fetchData, nav}} />
  }

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
            <Lists
              activeKey={activeSessionKey}
              itemProps={{
                onItemClick: handleNodeSelected,
                customActionNode
              }}
              list={sessions}
              fields={{ title: 'title', key: 'sessionId' }}
              animations={true}
            />
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
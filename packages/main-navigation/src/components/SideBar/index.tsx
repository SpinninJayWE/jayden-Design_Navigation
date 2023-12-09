import {css} from "@emotion/react";
import {Avatar, Box, Divider, Hidden, SwipeableDrawer, useMediaQuery, useTheme} from "@mui/material";
import JayLogo from "../../assets/Jay.png";
import React, {useMemo} from "react";
import {Tree, TreeNode} from "../TreeList";
import {ChatBubble, Dashboard, Explore, Forum, LibraryMusic, LocalMall, LocalPlay} from "@mui/icons-material";
import {useLocation, useNavigate} from 'react-router-dom'
import {useSideBar} from "../../providers/globals";
import UserInfo from "../user-info";


const Menus: React.FC<{
  treeData: TreeNode[]
  activeNode: TreeNode | null
}> = (props) => {

  const { treeData, activeNode } = props

  const nav = useNavigate()
  const theme = useTheme()
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const { setDrawerOpen } = useSideBar()
  return (
      <>
        <div className={'flex items-center pl-3.5 h-[80px]'}>
          <Avatar className={'h-[60px]'} alt="Remy Sharp" src={JayLogo} />
          <span className={'pl-2 text-xl font-bold'}>Jay Design</span>
        </div>
        <Divider />
        <Tree onNodeSelect={(node) => {
          if (node.path) {
            // 确保路径以单个斜杠开始
            nav(node.path);
            if (isMdDown) {
              setDrawerOpen(false)
            }
          }
        }} treeData={treeData} customSelectedNode={activeNode}/>
        <Divider />
      </>
  )
}
const Drawer: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const { setDrawerOpen, drawerOpen } =  useSideBar()

  return (
      <SwipeableDrawer
          anchor={'left'}
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false)
          }}
          onOpen={() => {
            setDrawerOpen(true)
          }}
      >
        <div className={'w-[200px]'}>
          {children}
          <Hidden smUp>
            <UserInfo/>
          </Hidden>
        </div>
      </SwipeableDrawer>
  )
}

export const SideBar = () => {

  const { theme } = useTheme()

  const treeData: TreeNode[] = [
    {
      key: '1',
      title: 'Dashboard',
      icon: <Dashboard />,
      path: '/'
    },
    {
      key: '2',
      title: 'Postings',
      icon: <Forum />,
      path: '/postings'
    },
    {
      key: '6',
      title: 'Chat',
      icon: <ChatBubble />,
      path: '/chat'
    },
    {
      key: '9',
      title: 'Mall',
      icon: <LocalMall />,
    },
    {
      key: '3',
      title: 'Music',
      icon: <LibraryMusic />,
      children :[
          {
            key: '3-1',
            title: 'Music',
            icon: <LibraryMusic />,
          },
      ]
    },
    {
      key: '4',
      title: 'Fun',
      icon: <LocalPlay />,
    },
    {
      key: '5',
      title: 'Explore',
      icon: <Explore />
    },
  ];
  const local = useLocation()
  const activeNode = useMemo(() => {
    const cur = treeData.find(item => {
      const res = item.path === local.pathname
      return res
    })

    if (cur) {
      return cur
    }

    return null
  }, [local.pathname])
  return (
      <>
        <Hidden mdDown>
          <Box
              width={200}
              bgcolor={'background.paper'}
              className={`pb-4 overflow-y-scroll shadow-sm sm:display-none`}
          >
            <Menus {...{ treeData, activeNode }} />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Drawer>
            <Menus {...{ treeData, activeNode }} />
          </Drawer>
        </Hidden>
      </>
  );
}

export default  SideBar
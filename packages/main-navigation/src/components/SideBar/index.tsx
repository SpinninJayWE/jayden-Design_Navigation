import {css} from "@emotion/react";
import {Avatar, Box, Divider} from "@mui/material";
import JayLogo from "../../assets/Jay.png";
import React from "react";
import {Tree, TreeNode} from "../TreeList";
import {Dashboard, Explore, Forum, LibraryMusic, LocalMall, LocalPlay} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
import useTheme from "../../hooks/useTheme";
export const SideBar = () => {

  const { theme } = useTheme()

  const style = css`
    width: 200px;
    background: ${theme.background.paper};
  `
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

  const nav = useNavigate()

  return (
      <Box css={style} className={`pb-4 overflow-y-scroll shadow-sm sm:display-none`}>
        <div className={'flex items-center pl-3.5 h-[80px]'}>
          <Avatar className={'h-[60px]'} alt="Remy Sharp" src={JayLogo} />
          <span className={'pl-2 text-xl font-bold'}>Jay Design</span>
        </div>
        <Divider />
        <Tree onNodeSelect={(node) => {
          if (node.path) {
            // 确保路径以单个斜杠开始
            nav(node.path);
          }
        }} treeData={treeData}/>
        <Divider />
      </Box>
  );
}

export default  SideBar
import {css} from "@emotion/react";
import {Avatar, Box, Divider} from "@mui/material";
import JayLogo from "../../assets/Jay.png";
import React from "react";
import {Tree, TreeNode} from "../TreeList";
import {Dashboard, Explore, Forum, LibraryMusic, LocalMall, LocalPlay} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
export const SideBar = () => {
  const style = css`
    width: 200px;
    background: white;
  `
  const treeData: TreeNode[] = [
    {
      key: '1',
      title: 'Overview',
      icon: <Dashboard />,
    },
    {
      key: '2',
      path: '/blog',
      title: 'Blog',
      icon: <Forum />,
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
      <Box css={style} className={`pb-4 overflow-y-scroll`}>
        <div className={'flex items-center pl-4 h-[80px]'}>
          <Avatar className={'h-[60px]'} alt="Remy Sharp" src={JayLogo} />
          <span className={'pl-2 text-xl blod'}>Jay Design</span>
        </div>
        <Divider />
        <Tree onNodeSelect={(node) => {
          nav('/' + node.path)
        }} treeData={treeData}/>
        <Divider />
      </Box>
  );
}

export default  SideBar
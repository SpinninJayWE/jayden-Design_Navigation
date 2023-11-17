import {css} from "@emotion/react";
import {Avatar, Divider, List} from "@mui/material";
import JayLogo from "../../assets/Jay.png";
import React from "react";
import {Tree, TreeItem, TreeNode} from "../TreeList";
import {Dashboard, Explore, Forum, LibraryMusic, LocalPlay} from "@mui/icons-material";

export const SideBar = () => {
  const style = css`
    width: 200px;
  `
  const treeData: TreeNode[] = [
    {
      key: '1',
      title: 'Overview',
      icon: <Dashboard />,
      children: [
        {
            key: '1-2',
            title: 'Analytics',
            icon: <Explore />
        }
      ]
    },
    {
      key: '2',
      title: 'Blog',
      icon: <Forum />,
      children: [
        {
          key: '1-4',
          title: 'Blog Jay',
          children: [{
            key:'2.5',
            title: 'a'
          }]
        }
      ]
    },
    {
      key: '3',
      title: 'Music',
      icon: <LibraryMusic />
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

  return (
      <div css={style} className={`pb-4 overflow-y-scroll`}>
        <div className={'flex items-center pl-4 h-[80px]'}>
          <Avatar className={'h-[60px]'} alt="Remy Sharp" src={JayLogo} />
          <span className={'pl-2 text-xl blod'}>Jay Design</span>
        </div>
        <Divider />
        <Tree treeData={treeData}/>
      </div>
  );
}

export default  SideBar
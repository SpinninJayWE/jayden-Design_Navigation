import React, { useState } from 'react';
import { css } from '@emotion/react'
import {Avatar, Button, Collapse, List, ListItem, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore, Home, MusicNote} from "@mui/icons-material";
import JayLogo from './assets/Jay.png'
const TopBar = () => {
  const [height, setHeight] = useState(60);
  const style = css`
    height: ${height}px;
    
    .MuiButton-root {
      margin-right: 6px;
      color: #1a1a1a;
      font-size: 18px;
    }
  `
  return (
    <div css={style} className={`flex items-center py-2 px-4`}>
      <Button size={'large'} startIcon={<Home/>}>Home</Button>
      <Button size={'large'} startIcon={<MusicNote/>}>Music</Button>
    </div>
  );
}

const TreeItem = ({ node }: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={node.title} />
          {node.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItem>
        {node.children && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {node.children.map((childNode) => (
                    <TreeItem key={childNode.key} node={childNode} />
                ))}
              </List>
            </Collapse>
        )}
      </>
  );
};

const SideBar = () => {
  const style = css`
    width: 200px;
  `
  const treeData = [
    {
      key: '1',
      title: '节点1',
      children: [
        { key: '1-1', title: '子节点1-1' },
        { key: '1-2', title: '子节点1-2' },
      ],
    },
    {
      key: '2',
      title: '节点2',
    },
  ];

  return (
      <div css={style} className={`py-4 overflow-y-scroll`}>
        <div className={'flex items-center pl-4'}>
          <Avatar className={'h-[60px]'} alt="Remy Sharp" src={JayLogo} />
          <span className={'pl-2 text-xl blod'}>Jay Design</span>
        </div>
        <List>
          {treeData.map((node) => (
              <TreeItem key={node.key} node={node} />
          ))}
        </List>
      </div>
  );
}

const Content = () => {
  const style = css`
    height: calc(100% - 60px);
  `
  return (
      <div css={style} className={`p-4 overflow-y-scroll`}>
        <div className={'h-[500px]'}></div>
        <div className={'h-[500px]'}></div>
        <div className={'h-[500px]'}></div>
      </div>
  );
}
function App() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <div className={'h-full flex '}>
        <SideBar />
        <div className={'flex-1'}>
          <TopBar />
          <Content />
        </div>
      </div>
  );
}

export default App;

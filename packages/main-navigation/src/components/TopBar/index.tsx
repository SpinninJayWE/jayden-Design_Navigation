import React, {useState} from "react";
import {css} from "@emotion/react";
import {Avatar, Button, Divider, IconButton, Menu, MenuItem, TextField} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageIcon from '@mui/icons-material/Message';
export const TopBar = () => {
  const [height, setHeight] = useState(80);
  const style = css`
    height: ${height}px;
    .MuiButton-root {
      margin-right: 6px;
      color: #1a1a1a;
      font-size: 18px;
    }
  `
  return (
      <div css={style} className={`flex items-center justify-between py-2 pr-4`}>
          <div className={'flex items-center'}>
            <IconButton sx={{
              border: '1px solid gray',
              borderRadius: '12px',
            }}>
              <DensityMediumIcon />
            </IconButton>
            <TextField sx={{
              marginLeft: '12px',
            }} size={'small'} label="Search" variant="outlined" />
          </div>
          <div className={'flex items-center'}>
            <IconButton sx={{
              border: '1px solid gray',
              borderRadius: '12px',
              marginRight: '12px',
            }}>
              <MessageIcon />
            </IconButton>
            <IconButton sx={{
              border: '1px solid gray',
              borderRadius: '12px',
            }}>
              <NotificationsNoneIcon />
            </IconButton>
            <Avatar
                className={'ml-4'}
                src={'https://images.unsplash.com/photo-1559718062-361155fad299?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhbGVzJTIwTWFuYWdlcnxlbnwwfHwwfHx8MA%3D%3D'} />
            <div className={'pl-4 text-left'}>
              <p className={'text-base text-gray-900'}>JayDen</p>
              <p className={'text-sm text-gray-500'}>Sales Manager</p>
            </div>
          </div>
        </div>
  );
}

export default TopBar

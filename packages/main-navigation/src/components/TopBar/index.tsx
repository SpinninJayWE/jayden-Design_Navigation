import React, {useState} from "react";
import {css} from "@emotion/react";
import {Avatar, Button, Divider, IconButton, Menu, MenuItem, TextField, Typography} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageIcon from '@mui/icons-material/Message';
import theme from "tailwindcss/defaultTheme";
import useTheme from "../../hooks/useTheme";
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import {useNavigate} from "react-router-dom";
const LightSwitch = () => {
  const { activeTheme, setTheme } = useTheme()
  const toggleLight = () => {
    setTheme(activeTheme === 'light'? 'dark' : 'light')
  };

  return (
      <IconButton sx={{ marginLeft: '10px'}} onClick={toggleLight} aria-label="add to shopping cart">
        {
          activeTheme === 'light'?
              <WbSunnyRoundedIcon /> :
              <DarkModeRoundedIcon />
        }
      </IconButton>
  );
};

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
  const nav = useNavigate();
  return (
      <div css={style} className={`flex items-center justify-between py-2 px-4 shadow-lg`}>
          <div className={'flex items-center'}>
            <IconButton>
              <DensityMediumIcon />
            </IconButton>
            <TextField sx={{
              marginLeft: '12px',
            }} size={'small'} label="Search" variant="outlined" />
          </div>
          <div className={'flex items-center'}>
            <IconButton sx={{
              marginRight: '12px',
            }}>
              <MessageIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <LightSwitch />
            <Avatar
                className={'ml-4 cursor-pointer'}
                onClick={() => {
                  nav('/login')
                }}
                src={'https://images.unsplash.com/photo-1559718062-361155fad299?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhbGVzJTIwTWFuYWdlcnxlbnwwfHwwfHx8MA%3D%3D'} />
            <div className={'pl-4 text-left'}>
              <Typography component={'p'}>JayDen</Typography>
              <Typography component={'p'} color={'text.secondary'}>
                Sales Manager
              </Typography>
            </div>
          </div>
        </div>
  );
}

export default TopBar

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
import {useAuth} from "../../providers/user";
import {BASE_URL} from "plugins/service";
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
  const { isAuthenticated, user } = useAuth()
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
            {
              isAuthenticated ?
                <>
                  <Avatar
                      className={'ml-4 cursor-pointer'}
                      onClick={() => {
                        nav('/login')
                      }}
                      src={BASE_URL + user.avatar?.url} />
                  <div className={'pl-4 text-left'}>
                    <Typography component={'p'}>{user.username}</Typography>
                    <Typography component={'p'} color={'text.secondary'}>
                      {user.email}
                    </Typography>
                  </div>
                </>
                :
                <Button variant={'text'} color={'warning'} onClick={() => {
                  nav('/login')
                }}>
                  Click to log in
                </Button>
            }

          </div>
        </div>
  );
}

export default TopBar

import React, {useState} from "react";
import {css} from "@emotion/react";
import {
  useTheme as useMuiTheme,
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  Hidden
} from "@mui/material";
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
import {useSideBar} from "../../providers/globals";
import UserInfo from "../user-info";
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
  const { toggleDrawer } = useSideBar()
  return (
      <div css={style} className={`flex items-center justify-between py-2 px-4 shadow-lg overflow-hidden`}>
          <div className={'flex items-center'}>
            <Hidden mdUp>
              <IconButton onClick={() => {
                toggleDrawer()
              }}>
                <DensityMediumIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <TextField sx={{
                marginLeft: '12px',
              }} size={'small'} label="Search" variant="outlined" />
            </Hidden>
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
            <Hidden smDown>
              <UserInfo/>
            </Hidden>

          </div>
        </div>
  );
}

export default TopBar

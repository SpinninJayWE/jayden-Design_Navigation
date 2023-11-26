import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import {login, logout} from "plugins/service/apis";
import {AuthStorage, useAuth} from "../providers/user";
import {Box, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import request from "plugins/service";
import {isEmptyObject} from "plugins/utils";
function LoginDialog({ open, handleClose }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setAuthData } = useAuth()
  const handleLogin = () => {
    // 实现登录逻辑
    login({email, password}).then(res => {
      setAuthData(res.jwt, res.user)
    })
  };

  const handLogout = () => {
    AuthStorage.clearAuthData()
    setAuthData('', null)
    request.defaults.headers.Authorization = null
  }

  return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>
          { (user && user.id ) ? 'Welcome back '+ user.username : 'Login'}
          <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              style={{ position: 'absolute', right: 15, top: 15 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        { (user && user.id ) ? <Button variant={'contained'} onClick={handLogout}>Logout</Button> : <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth={500}>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email or username"
                  type="Email"
                  fullWidth
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button color={'info'} variant='outlined' onClick={handleClose}>Cancel</Button>
              <Button variant='contained' onClick={handleLogin}>Login</Button>
            </DialogActions>
          </Box>
        </Box> }
      </Dialog>
  );
}
export const Login = () => {
  const nav = useNavigate()
  const handClose = () => {
    nav('/')
  }
  return (
      <LoginDialog handleClose={handClose} open={true}>

      </LoginDialog>
  )
}

export default Login
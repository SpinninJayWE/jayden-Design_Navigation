import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";
import {login} from "plugins/service/apis";
import {useAuth} from "../providers/user";
import {Box, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
function LoginDialog({ open, handleClose }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setAuthData } = useAuth()
  const handleLogin = () => {
    // 实现登录逻辑
    login({email, password}).then(res => {
      console.log(res)
      setAuthData(res.jwt, res.user)
    })
  };

  return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>
          Login
          <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              style={{ position: 'absolute', right: 15, top: 15 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
        </Box>
      </Dialog>
  );
}
export const Login = () => {
  return (
      <LoginDialog open={true}>

      </LoginDialog>
  )
}

export default Login
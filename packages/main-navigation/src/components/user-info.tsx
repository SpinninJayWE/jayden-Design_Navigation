import {Avatar, Button, Hidden, Typography} from "@mui/material";
import {BASE_URL} from "plugins/service";
import React from "react";
import {useAuth} from "../providers/user";
import {useNavigate} from "react-router-dom";

export const UserInfo = () => {
  const { isAuthenticated, user } = useAuth()
  const nav = useNavigate()
  return (
        <>
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
        </>
  )
}


export default UserInfo
import React, {MouseEventHandler} from "react";
import {Box, Button, Fab, IconButton, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import useTheme from "../../hooks/useTheme";
import { AddIcCallOutlined, AddOutlined } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


export const LikeButton = React.memo(({ liked, onClick }: { liked: boolean, onClick?: () => void, [key: string] : any }) => {
      return (
          <div onClick={onClick} className={'inline-flex items-center'}>
              <IconButton>
                  {liked? <FavoriteIcon color={'secondary'} /> : <FavoriteBorderIcon/>}
              </IconButton>
              <Typography variant={'body2'} component={'span'} color={`${liked ? 'secondary.main' : 'text.secondary'}`} className={'ml-2'}>
                {liked? 'Liked' : 'Like'}
              </Typography>
          </div>
      )
})


export const PostingActions = React.memo((
    { likeCount, commentCount, liked, onLikeClick, onCommentClick }:
        {
            likeCount?: number,
            commentCount: number
            liked: boolean,
            onLikeClick?: (a: boolean) => void,
            onCommentClick?: MouseEventHandler}) => {
      return (
          <Box onClick={e => {
              e.stopPropagation()
          }} className={'flex items-center justify-end'}>
              <IconButton onClick={onCommentClick}>
                <CommentOutlinedIcon  />
              </IconButton>
              <Typography variant={'body2'} color={'text.secondary'}>{commentCount}</Typography>
              <LikeButton likeCount={likeCount} onClick={(e: any) => {
                  e.stopPropagation()
                  onLikeClick && onLikeClick(!liked)
              }} liked={liked} />
          </Box>
      )
})

export const PostingTool = React.memo(() => {

  const nav = useNavigate()
  return (
      <Fab onClick={() => {
        nav('/postings/add')
      }} sx={{
        position: 'fixed',
        bottom: 32,
        right: 32
      }} color="primary" aria-label="add">
        <AddOutlined />
      </Fab>
  )
})
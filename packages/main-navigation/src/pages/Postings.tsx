import useTheme from "../hooks/useTheme";
import {Typography, IconButton, Box, Snackbar} from "@mui/material";
import {Alert, Masonry} from '@mui/lab';
import React, {useEffect, useState} from "react";
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {Outlet, useNavigate} from "react-router-dom";
import {getPostings, likePosting, postPosting} from "plugins/service/apis";
import {LikeButton, PostingActions} from "../components/postings";
import {SnackbarProvider} from "notistack";
const WaterfallGrid = ({ children }: any) => {
  return (
      <Masonry columns={{
        xl: 5,
        lg: 4,
        md: 3,
        sm: 2
      }} spacing={2}>
          { children }
      </Masonry>
  );
};

const PostingBlock = React.memo( (
    {
      id,
      commentCount,
      likeCount,
      title,
      image,
      description,
      scrollPosition,
      onClick,
    }: {
  id: number,
  image: string,
  title: string,
  description: string,
  scrollPosition?: any,
  onClick?: (id: number) => void,
  [key: string] : any
}) => {
  const { theme } = useTheme()

  const [like , setLike] = useState(false)


  const handleLikecLick = () => {
    likePosting(id).then(res => {
      setLike(true)
    })
  }
  return (
      <div onClick={()=>{
        onClick && onClick(id)
      }} style={{
        background: theme.background.paper
      }} data-id={id} className={`posting-item p-4 pb-2 rounded-lg cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-600/50 transition duration-600 ease-in-out`}>
        <LazyLoadImage
            src={image}
            alt={title}
            effect={'blur'}
            scrollPosition={scrollPosition}
            placeholder={<div style={{width: '100%', height: 320}}>Loading...</div>}
        />
        <div className={'mt-2'}>
          <Typography variant={'h6'} >
            {title}
          </Typography>
          <Typography variant={'subtitle2'} component={'p'} color={'text.secondary'}>{description}</Typography>
          <PostingActions commentCount={commentCount} liked={like} onLikeClick={handleLikecLick}/>
        </div>
      </div>
  )
})

const PostingsList = ({items, scrollPosition} : {items?: { id: number, image: string, title: string, description: string }[], scrollPosition?: any}) => {
  const nav = useNavigate()
  const handlePostingBlockClick = (id: number) => {
    nav(`/postings/${id}`)
  }

  const [open, setOpen] = useState(false)
  return (
      <>
        {
          items && items.map((item) => {
            return <PostingBlock {...item} key={item.id} scrollPosition={scrollPosition} onClick={handlePostingBlockClick}  />
          })
        }
      </>
  )
}

const PostingsListHoc =  trackWindowScroll(PostingsList)
export const Postings = () => {

  const [postings, setPostings] = useState<any[]>([])

  useEffect(() => {
    getPostings({ populate: "*" }).then(res => {
      setPostings(res.data)
    })
  }, []);


  return (
      <SnackbarProvider  maxSnack={3} className={'postings-conatiner'}>
        <WaterfallGrid>
          <PostingsListHoc items={postings} />
        </WaterfallGrid>
        <Outlet />
      </SnackbarProvider>
  )
}

export default Postings
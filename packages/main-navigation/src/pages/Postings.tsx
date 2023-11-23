import useTheme from "../hooks/useTheme";
import {Typography, IconButton, Box} from "@mui/material";
import { Masonry } from '@mui/lab';
import React, {useEffect, useState} from "react";
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {Outlet, useNavigate} from "react-router-dom";
import {getPostings, postPosting} from "plugins/service/apis";
import {LikeButton, PostingActions} from "../components/postings";
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

const PostingBlock = React.memo( ({ id, title, image, description, scrollPosition, onClick }: {
  id: number,
  image: string,
  title: string,
  description: string,
  scrollPosition?: any,
  onClick?: (id: number) => void
}) => {
  const { theme } = useTheme()

  const [like , setLike] = useState(false)
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
          <PostingActions liked={like} onLikeClick={setLike}/>
        </div>
      </div>
  )
})

const PostingsList = ({items, scrollPosition} : {items?: { id: number, image: string, title: string, description: string }[], scrollPosition?: any}) => {
  const nav = useNavigate()
  const handlePostingBlockClick = (id: number) => {
    nav(`/postings/${id}`)
  }
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
    getPostings().then(res => {
      setPostings(res.data.map((item: any) => {
        const newItem = {id: item.id, ...item.attributes}
        return newItem
      }))
    })
  }, []);


  return (
      <div className={'postings-conatiner'}>
        <WaterfallGrid>
          <PostingsListHoc items={postings} />
        </WaterfallGrid>
        <Outlet />
      </div>
  )
}

export default Postings
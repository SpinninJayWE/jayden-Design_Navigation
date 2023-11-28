import useTheme from "../hooks/useTheme";
import {Typography, Skeleton} from "@mui/material";
import { Masonry} from '@mui/lab';
import React, { useEffect, useMemo, useState} from "react";
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Outlet, useNavigate} from "react-router-dom";
import {getPostings, postingLike} from "plugins/service/apis";
import {PostingActions, PostingTool} from "../components/postings";
import {SnackbarProvider, useSnackbar} from "notistack";
import { BASE_URL } from "plugins/service";
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
      title,
      image,
      description,
      scrollPosition,
      onClick,
      isLiked,
      cover
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

  const [like , setLike] = useState(isLiked ?? false)
  const [imgIsLoaded, setImgIsLoaded] = useState(false)

  const { enqueueSnackbar } = useSnackbar();

  const handleLikecLick = () => {
    postingLike(id).then(res => {
      setLike(true)
      enqueueSnackbar(res.msg,{ variant: res.code ? 'warning' : 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    })
  }

  const images = useMemo(() => {
    return cover && cover.url ? BASE_URL + cover.url : image
  }, [image, cover])
  return (
      <div onClick={()=>{
        onClick && onClick(id)
      }} style={{
        background: theme.background.paper
      }} data-id={id} className={`posting-item p-4 pb-2 rounded-lg cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-600/50 transition duration-600 ease-in-out`}>
        {
          !imgIsLoaded ?  <Skeleton animation="wave" height={280} variant={'rounded'} />: <></>
        }
        <LazyLoadImage
            className={`${imgIsLoaded ? 'block' : 'hidden'}`}
            src={images}
            alt={title}
            effect={'blur'}
            scrollPosition={scrollPosition}
            onLoad={() => {
              setImgIsLoaded(true)
            }}
            onError={(e) => {
              setImgIsLoaded(true)
            }}
            threshold={0}
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
        <PostingTool />
        <WaterfallGrid>
          <PostingsListHoc items={postings} />
        </WaterfallGrid>
        <Outlet />
      </SnackbarProvider>
  )
}

export default Postings
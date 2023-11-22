import useTheme from "../hooks/useTheme";
import {Typography, IconButton, Box} from "@mui/material";
import { Masonry } from '@mui/lab';
import React, {useState} from "react";
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {Outlet, useNavigate} from "react-router-dom";
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

// 可供选择的标题和活泼俏皮的描述文字
const titles = [
  "The Energetic Girl",
  "A Playful Woman",
  "Life of the Party",
  "Radiant and Fun-loving",
  "Bubbly Personality",
  "Charming and Full of Life"
];

const descriptions = [
  "Meet our lively and vivacious woman who brightens up every room with her infectious energy.",
  "She's a playful spirit with a heart full of laughter and a smile that can light up the darkest of days.",
  "The life of the party, she knows how to have a good time and make everyone around her smile.",
  "Radiant and fun-loving, she approaches life with a sense of joy and adventure that's truly inspiring.",
  "With a bubbly personality that's impossible to resist, she's the one you want by your side for all your adventures.",
  "Charming and full of life, she's the kind of person who makes every moment memorable."
];

// 生成随机文章的函数
function generateRandomArticle() {
  const randomTitleIndex = Math.floor(Math.random() * titles.length);
  const randomDescriptionIndex = Math.floor(Math.random() * descriptions.length);

  const title = titles[randomTitleIndex];
  const description = descriptions[randomDescriptionIndex];

  return {
    title,
    description
  };
}


const LikeButton = React.memo(({ liked, onClick }: { liked: boolean, onClick?: () => void }) => {
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
          <Box className={'flex items-center justify-end'}>
            <IconButton>
              <CommentOutlinedIcon  />
            </IconButton>
            <Typography variant={'body2'} color={'text.secondary'}>325</Typography>
            <LikeButton onClick={(e) => {
              e.stopPropagation()
              setLike(!like)
            }} liked={like} />
          </Box>
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
  const items = Array.from({length: 10}).map((item, index) => {
    return {
      id: index,
      ...generateRandomArticle(),
      image: `https://source.unsplash.com/random/?girls,girl,${new Date().getTime() + Math.random().toString()}`,
    }
  });


  return (
      <div className={'postings-conatiner'}>
        <WaterfallGrid>
          <PostingsListHoc items={items} />
        </WaterfallGrid>
        <Outlet />
      </div>
  )
}

export default Postings
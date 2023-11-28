import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Typography
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {getPostingsById, postingLike} from "plugins/service/apis";
import {PostingActions} from "../components/postings";
import {enqueueSnackbar} from "notistack";
import { BASE_URL } from "plugins/service/index";


export const PostingDetail = () =>{
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const nav = useNavigate ()
  const [ open, setOpen ]  = useState(true)

  const [state, setState] = useState<any>({})

  useEffect(() => {
    if (id) {
      setLoading(true)
      getPostingsById(Number(id)).then(res => {
        setState(res.data)
      }).finally(() => setLoading(false))
    }
  }, []);

  const handleClose = () => {
    setOpen(() => {
      nav('/postings')
      return false
    })
  }

  const handleLikeClick = () => {
    postingLike(id).then(res => {
      setState(val => ({
        ...val,
        isLiked: true
      }))
      enqueueSnackbar(res.msg,{ variant: res.code ? 'warning' : 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
    })
  }

  const image = useMemo(() => {
    return state.cover ? BASE_URL + state.cover.url : state.image
  }, [state.image, state.cover])
  return (
      <Dialog maxWidth={'lg'} fullWidth={true} open={open} onClose={handleClose}>
        {
          loading ?
            <Box className={'w-full'}>
              <DialogTitle><Skeleton /></DialogTitle>
              <DialogContent>
                <Skeleton animation="wave" />
              </DialogContent>
              <DialogContent>
                <Skeleton animation={false} />
              </DialogContent>
            </Box> :
            <>
              <DialogContent>
                <Box className={`flex gap-4`}>
                  <div>
                    <img className={'max-h-[800px]'} src={image} alt={state.title} />
                  </div>
                  <div className={'flex flex-col flex-auto'}>
                    <Typography variant={'h5'} color={'text.primary'} className={'pb-4'}>{state.title}</Typography>
                    <Typography variant={'subtitle2'} color={'text.secondary'}>{state.description}</Typography>
                    <div className={'mt-auto'}>
                      <PostingActions commentCount={state.commentCount} liked={state.isLiked} onLikeClick={handleLikeClick}/>
                    </div>
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color={'secondary'} variant={'outlined'} onClick={handleClose}>Cancel</Button>
                <Button color={'primary'} variant={'contained'} onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </>
        }
      </Dialog>
  )
}

export default PostingDetail
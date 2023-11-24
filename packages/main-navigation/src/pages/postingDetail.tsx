import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostingsById} from "plugins/service/apis";


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
  return (
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
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
              <DialogTitle>{state.title}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {state.description}
                </DialogContentText>
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
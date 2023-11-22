import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {useState} from "react";


export const PostingDetail = () =>{
  const { id } = useParams()
  const nav = useNavigate ()
  const [ open, setOpen ]  = useState(true)

  const handleClose = () => {
    setOpen(() => {
      nav('/postings')
      return false
    })
  }
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Posting Detail {id}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color={'secondary'} variant={'outlined'} onClick={handleClose}>Cancel</Button>
            <Button color={'primary'} variant={'contained'} onClick={handleClose}>Subscribe</Button>
          </DialogActions>
      </Dialog>
  )
}

export default PostingDetail
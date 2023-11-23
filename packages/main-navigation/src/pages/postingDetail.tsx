import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getPostingsById} from "plugins/service/apis";


export const PostingDetail = () =>{
  const { id } = useParams()
  const nav = useNavigate ()
  const [ open, setOpen ]  = useState(true)

  const [state, setState] = useState<any>({})

  useEffect(() => {
    if (id) {
      getPostingsById(Number(id)).then(res => {
        const data = res.data
        setState({ id: data.id, ...data.attributes })
      })
    }
  }, []);

  const handleClose = () => {
    setOpen(() => {
      nav('/postings')
      return false
    })
  }
  return (
      <Dialog open={open} onClose={handleClose}>
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
      </Dialog>
  )
}

export default PostingDetail
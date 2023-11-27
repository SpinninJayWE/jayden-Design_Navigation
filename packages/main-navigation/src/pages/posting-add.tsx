import {useMemo, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {postingCreate} from "plugins/service/apis";
import {LazyLoadImage} from "react-lazy-load-image-component";


export const PostingAdd = () => {
  const [posting, setPosting] = useState<any>({
    title: '',
    description: '',
    image: '',
  })

  const nav = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const checkValid = useMemo(() => {
      if (posting.title.length === 0) {
        return false
      }
      if (posting.description.length === 0) {
        return false
      }
      if (posting.image.length === 0) {
        return false
      }
      return true
  }, [posting])

  const handleClose = () => {
    nav('/postings')
  }

  const handleChange = (e: any) => {
    setPosting(() => {
      return {
        ...posting,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = () => {
    postingCreate(posting).then(res => {
      enqueueSnackbar('Posting added', {variant:'success'})
      nav('/postings', {replace: true})
    })
  }
  return (
      <Dialog maxWidth={'sm'} fullWidth={true} onClose={handleClose} open={true}>
        <DialogTitle>
          Publish Posting
        </DialogTitle>
        <DialogContent>
          <TextField name={'title'}  onChange={handleChange} variant={'standard'} margin={'dense'} autoFocus={true} fullWidth={true} label={'Title'} ></TextField>
          <TextField name={'description'}  onChange={handleChange} variant={'outlined'} multiline margin={'dense'} rows={4} fullWidth={true} label={'Description'} ></TextField>
          <TextField name={'image'}  onChange={handleChange} variant={'standard'} margin={'dense'} fullWidth={true} label={'Image'} ></TextField>
          <Typography variant={'caption'} color={'text.secondary'}>You can copy the image link</Typography>
          {
            posting.image && <img width={120} height={120} src={posting.image} alt={'Image'} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!checkValid} variant={'contained'} onClick={handleSubmit}>OK</Button>
        </DialogActions>
      </Dialog>
  )
}

export default PostingAdd
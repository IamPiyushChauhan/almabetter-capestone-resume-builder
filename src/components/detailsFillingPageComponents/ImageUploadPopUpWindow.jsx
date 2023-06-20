import React ,{ useContext } from 'react'
import { InputUpdateDataContext } from '../../App';
import Avatar from 'react-avatar-edit';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';


function ImageUploadPopUpWindow({open , handleClose}) {
const inputUpdateDataContext = useContext(InputUpdateDataContext)

    const onClose =() => {
        inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "profile_photo", val: null})
      }
      
      const onCrop = (previewInput)=> {
        inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "profile_photo", val: previewInput})
      }

  return (
    <div>
        <Dialog
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload Image"}
        </DialogTitle>
        <DialogContent>
          <Avatar
            width={390}
            height={295}
            onCrop={onCrop}
            onClose={onClose}
            src={null}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ImageUploadPopUpWindow
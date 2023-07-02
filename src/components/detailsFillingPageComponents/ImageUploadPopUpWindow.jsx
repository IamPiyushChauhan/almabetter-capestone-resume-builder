import React ,{ useContext } from 'react'
import { InputUpdateDataContext } from '../../App';
import Avatar from 'react-avatar-edit';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

function ImageUploadPopUpWindow({open , handleClose}) {
  const isMidScreen = useMediaQuery('(max-width: 900px)')
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
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
            width={isSmallScreen? isMidScreen? 250 : 190 :390}
            height={isSmallScreen? isMidScreen? 195 : 145 :295}
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
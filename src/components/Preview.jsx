import React, { useContext, useState , useEffect} from 'react'
import { InputUpdateDataContext } from '../App'
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";

import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

import {useMediaQuery,FormControl,FormHelperText,OutlinedInput,Button, Dialog,  DialogContent, DialogTitle, Snackbar, MuiAlert, AlertProps} from '@mui/material';
import ResumeTemplate from './resumeTemplates/ResumeTemplate';


function Preview() {
  const midScreen = useMediaQuery('(max-width: 900px)')
   const smallScreen = useMediaQuery('(max-width: 600px)')

  const [isOpenDialog,setIsOpenDialog] = useState(false)
  const [isOpenTostMessage,setIsOpenTostMessage] = useState(false)
  const [fileName,setFilename] = useState("")
  const inputUpdateDataContext =  useContext(InputUpdateDataContext)

  const navigate = useNavigate();

  const print = () => {
    const pdf = new jsPDF('portrait','pt');
    pdf.html(document.querySelector('.template-preview')).then(() => {
      pdf.save(`${fileName}.pdf`);
  });
  };

  const printAndNavigate = () => {
    print()
    inputUpdateDataContext.updateDispatch({type: "RESET"})
    setIsOpenDialog(true)
    setTimeout(() => {
      setIsOpenDialog(false)
      navigate("/homepage/my-resume")
  }, 1000);
  }

  const saveResume = () => {
    if(fileName!==""){
      inputUpdateDataContext.myResumeDiapatch({type: "ADD" , data: { resumeName: fileName, resumeNumber : inputUpdateDataContext.resumeState , data: inputUpdateDataContext.stateInputs}})
      printAndNavigate()
    }
    else if (inputUpdateDataContext.stateInputs.is_edit){
      inputUpdateDataContext.myResumeDiapatch({type: "UPDATE-DATA", id: inputUpdateDataContext.stateInputs.my_resume_id , data: { resumeName: inputUpdateDataContext.stateInputs.file_name,  resumeNumber : inputUpdateDataContext.resumeState ,  data: inputUpdateDataContext.stateInputs}})
      printAndNavigate()
    } 
    else{
      setIsOpenTostMessage(true)
    }
    

  }


  return (
    <div className='preview'>

    <div style={{display: 'flex', flexDirection: smallScreen? 'column':'row', justifyContent: 'space-between' , alignItems: 'center'}}>
      <div style={{margin: "5rem"}}>
            <h4>Resume Preview</h4>
            <div class="resume-template-area" style={{width: smallScreen? "90%": midScreen? "70%": "20vw" , margin: "5%"}}>
                <div class="template-preview"><ResumeTemplate data={inputUpdateDataContext.stateInputs} resumeNumber={inputUpdateDataContext.resumeState}/></div>
            </div>
        </div>

        <div>
           <FormControl >
              <FormHelperText  id="filename">Create  File Name</FormHelperText>
              {inputUpdateDataContext.stateInputs.is_edit?  <OutlinedInput value={inputUpdateDataContext.stateInputs.file_name} InputProps={{readOnly: true}}/> : <OutlinedInput value={fileName}  onChange={(e)=>{setFilename(e.target.value)}} name="filename"/>}
          </FormControl>
          <div className='button-session' style={{margin: "5%"}}>
                <Button variant="outlined" onClick={()=> { navigate('/homepage/input-info/personal-info')}}>Back</Button>
                <Button variant="contained" sx={{marginLeft: "5%"}} onClick={saveResume}>Save</Button>
          </div>
        </div>

    </div>
        
        <Dialog open={isOpenDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Upload Image"}
        </DialogTitle>
        <DialogContent>
          <div style={{display: 'flex', flexDirection: "column", justifyContent: "center" , alignItems: "center"}}> 
               <CheckCircleSharpIcon  sx={{color: "#1965F5"}}/>
               <h5>Your resume has been Successfully save</h5>
          </div>
        </DialogContent>
      </Dialog>

      <Snackbar
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpenTostMessage}
        onClose={()=>{setIsOpenTostMessage(false)}}
        message="Please Enter the file name"
        key={"top" + "center"}
/>
        
    </div>
  )
}

export default Preview

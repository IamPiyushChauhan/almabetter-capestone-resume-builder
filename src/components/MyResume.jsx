import React,{useContext,useEffect} from 'react'
import { InputUpdateDataContext } from '../App'
import {Grid,Button,ButtonGroup,Card , Box, useMediaQuery} from '@mui/material';
import ResumeTemplate from './resumeTemplates/ResumeTemplate';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom';

function MyResume() {

  const midScreen = useMediaQuery('(max-width: 900px)')
   const smallScreen = useMediaQuery('(max-width: 600px)')

  const inputUpdateDataContext =  useContext(InputUpdateDataContext)

  const navigate = useNavigate();

  const editFunction = (index,resumeNumber) => {
    const data = inputUpdateDataContext.myResumeList[index].data
    inputUpdateDataContext.updateDispatch({type: "EDIT-DATA", editData: {...data,is_edit: true,file_name:inputUpdateDataContext.myResumeList[index].resumeName, my_resume_id: index }})
    inputUpdateDataContext.updateDataResumeState(resumeNumber)
    navigate("/homepage/input-info/personal-info")
  }

  const print = (fileName,num) => {
    console.log("_____________________"+fileName+" "+num)
    const pdf = new jsPDF('portrait','pt');
    pdf.html(document.querySelector(`.template-preview-${num}`)).then(() => {
      pdf.save(`${fileName}.pdf`);
  });
  }

  const isEmptyResume = ()=> {
    return (
      <div style={{marginTop: "5%"}}>
        <h1>Please Create a Resume</h1>
        <Button onClick={()=>{navigate("/homepage/resume-template")}}>Create Resume</Button>
      </div>
    )
  }
  
  
  return (

     <div className='resume-template-session'>
     {
      inputUpdateDataContext.myResumeList.length === 0 ?  isEmptyResume() : <div></div>  
     }

     <Grid container spacing={2}>
        {inputUpdateDataContext.myResumeList.map((item,index)=> (
          <Grid xs={smallScreen? 12 : midScreen? 6: 3}>
         <div class="resume-template-area" style={{width: smallScreen? "90%": midScreen? "70%": "20vw" , margin: "5%"}}>
            <div class={`template-preview template-preview-${index}`}><ResumeTemplate data={item.data} resumeNumber={item.resumeNumber}/></div>
		      <div class="resume-overlay resume-overlay--primary">
			      <div class="rbutton">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={()=>{editFunction(index, item.resumeNumber)}}><EditIcon sx={{color: 'white'}}/></Button>
                  <Button onClick={()=>{inputUpdateDataContext.myResumeDiapatch({type: "DELETE" , id: index})}}><DeleteIcon sx={{color: 'white'}}/></Button>
                  <Button onClick={()=>print(item.resumeName,index)}><DownloadForOfflineRoundedIcon sx={{color: 'white'}} /></Button>
              </ButtonGroup>
            </div>
		      </div>
         </div>
        </Grid>
        ))}
       </Grid>

    </div>
  )
}

export default MyResume

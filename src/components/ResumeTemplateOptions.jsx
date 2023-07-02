import React,{useRef,useContext, useState} from 'react'
import { useNavigate , Outlet} from 'react-router-dom'
import { InputUpdateDataContext } from '../App';
import { Button, Grid} from '@mui/material';
import ResumeTemplate from './resumeTemplates/ResumeTemplate';

import useMediaQuery from '@mui/material/useMediaQuery';



const data = {
   profile_photo: "",
   fname: "Christ",
 lname: "Candidate",
 email: "christ@gmail.com",
 mobile: "911287428",
 address: "Plot no 513 Area 51",
 city: "NYC",
 state: "New York",
 postal_code: "123456",
 objective: "The primary objective of an SDE is to write and deliver high-quality code. This involves understanding the software requirements, designing software solutions, implementing the code using appropriate programming languages and frameworks, and conducting thorough testing to ensure the software functions as expected",
 work_expreance_list: [{job_title: "SDE3",organization_name: "Amazon",start_year_of_job: "2019",end_year_of_job: "2023"},{job_title: "SDE2",organization_name: "google",start_year_of_job: "2017",end_year_of_job: "2019"}],
 type: "B.Tech",
 university: "IIT",
 degree: "B Deg",
 start_year_of_education: "2016",
 end_year_of_education: "2017",
 skill_list: ["Java","Python","C","C++"]
 }


function ResumeTemplateOptions() {
   const midScreen = useMediaQuery('(max-width: 900px)')
   const smallScreen = useMediaQuery('(max-width: 600px)')
   

   const navigate = useNavigate();
   const inputUpdateDataContext = useContext(InputUpdateDataContext);

  



  return (
    <div className='resume-template-session' >
       <div>
          <h1>Templates</h1>
          <p>Select a Template to get Started</p>
       </div>

       <div className='template-selection' style={{flexDirection: midScreen? "column" : "row"}}>

       <Grid container spacing={2} sx={{paddingTop: "1rem"}}>
        {["one","two","three","four"].map((item,index)=> (
         <Grid xs={smallScreen? 12 : midScreen? 6: 3}>
         <div class="resume-template-area" style={{width: smallScreen? "90%": midScreen? "70%": "20vw" , margin: "5%"}}>
            <div class="template-preview"><ResumeTemplate data={data} resumeNumber={item}/></div>
		      <div class="resume-overlay resume-overlay--primary">
			      <div class="rbutton"><Button variant="contained" onClick={()=>{navigate('/homepage/input-info'); inputUpdateDataContext.updateDataResumeState(item)}}>Use Template</Button></div>
		      </div>
         </div>
        </Grid>
        ))}
       </Grid>

        

      
       </div>
       <Outlet />  
    </div>
  )
}

export default ResumeTemplateOptions



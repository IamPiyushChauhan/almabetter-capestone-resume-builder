import React from 'react'
import { Avatar,Paper ,useMediaQuery } from '@mui/material'
import './ResumeTemplate.css';
function ResumeTemplateOne({data, resumeNumber}) {
    const midScreen = useMediaQuery('(max-width: 900px)')
   const smallScreen = useMediaQuery('(max-width: 600px)')
  return (
    
    <section className={`resume-one resume-template`}>
    <section className="head-session">
        <div className="head">
            <div className="avatar-and-name-section">
            
            <Avatar sx={{ width: smallScreen? 30 : midScreen? 40: 60, height: smallScreen? 30 : midScreen? 40: 60, marginLeft: "5%",marginRight: "5%", backgroundColor: "var(--resume-color-one)"  }} src= {data.profile_photo}> {data.fname[0]+data.lname[0]} </Avatar>
                <div className="name-and-job">
                    <h1>{data.fname+" "+ data.lname}</h1>
                    <h4>{data.work_expreance_list[0].job_title}</h4>
                </div>
            </div>
            
            
            <div className="add-and-contact">
                <p>{data.address}</p>
                <p>{data.postal_code}</p>
                <p>{data.city}</p>
                <p>{data.email}</p>
                <p>{data.mobile}</p>
            </div>
        </div>
        <hr style={{marginTop: "1%"}}/>
        <p className="intro">{data.objective}</p>
    <hr/>
        
    </section>
   
    <section className="professional-experience-section">
        <h2>Professional Experience</h2>
        <div className="experience">
            {
                data.work_expreance_list.map((item,index)=> { return(<div>
                    <h4>{item.job_title}</h4>
                    <p>{item.organization_name}</p>
                    <p>{`${item.start_year_of_job} - ${item.end_year_of_job}`}</p>
                </div>)})
            }
        </div>
    </section>

    <hr/>

    <section className="education-section">
        <h2>Education</h2>
        <div>
            <h4>{data.degree}</h4>
            <p>{data.university}</p>
            <p>{data.type}</p>
            <p>{`${data.start_year_of_education} - ${data.end_year_of_education}`}</p>
        </div>
    </section>

    <hr/>

    <section className="skils-section">
        <h2>Key Skill</h2>
        <ul> 
           {
            data.skill_list.map((item,index)=>{return (<li><p style={{color: "black"}}>{item}</p></li>)})
           }
        </ul>
    </section>
</section>
   
  )
}

export default ResumeTemplateOne
import React from 'react'
import { Button ,useMediaQuery} from '@mui/material';


function AboutAs() {
  const isMidScreen = useMediaQuery('(max-width: 900px)')


  return (
      <div style={{margin: "5rem"}}>
        <div style={{margin: "5rem"}}>
        <h1>Resume</h1>
          <h1>Builder</h1>
        </div>
        <div style={{display: 'flex' , justifyContent: "space-evenly" , flexDirection: isMidScreen? "column-reverse": "row" , alignItems: 'center'}}>
          <div>
            <p>You can post your resume in job postings using the free templates that resume builders provide. Simply pick the temple, fill out all the necessary information, and download the document as a PDF with the opportunity to update a previously saved template.</p>
            <h6>Share with your friends</h6>
            <div>
              <Button> <a href="whatsapp://send?text=https://merry-naiad-4f348f.netlify.app" data-action="share/whatsapp/share" target="_blank"><img src="/whatsapp.svg"/></a> </Button>
              <Button> <a href = "mailto:abc@example.com?subject = Resume Builder &body =https://merry-naiad-4f348f.netlify.app"><img src="/email.svg"/></a></Button>
              <Button> <a href="https://www.linkedin.com/in/piyush-chauhan-6b5342234/"><img src="/linkedin.svg"/></a></Button>
            </div>
          </div>

          <div>
            <img style={{width: "50vw"}} src="/about_us.jpeg"></img>
          </div>
        </div>
      </div>
  )
}

export default AboutAs
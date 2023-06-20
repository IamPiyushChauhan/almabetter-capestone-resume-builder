import React from 'react'
import { MenuItem , Divider , Select , OutlinedInput , Typography , FormControl , FormHelperText, Box, Button} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function WorkExpreanceChild({id,inputValue,updateValueDispatch}) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (v, i) => currentYear - i);

  return (
    <Box sx={{display: "flex", flexDirection: "column" ,paddingTop: id!=0? "2rem":""}}>
       <Typography component="h3">Work Expreance {id+1}</Typography>
       <Divider sx={{height: "1.5rem"}}/>

        <FormControl>
             <FormHelperText id="jobtitle">Job Title</FormHelperText>
            <OutlinedInput value={inputValue.job_title} onChange={(e)=>{updateValueDispatch({type: "ONCHANGE-UPDATE",id: id,key: "job_title", val: e.target.value})}} name='jobtitle'/>
        </FormControl>

        <FormControl>
             <FormHelperText id="organizationname">Organization Name</FormHelperText>
            <OutlinedInput value={inputValue.organization_name} onChange={(e)=>{updateValueDispatch({type: "ONCHANGE-UPDATE",id: id,key: "organization_name", val: e.target.value})}} name='organizationname'/>
        </FormControl>
     
      
        <FormControl>
             <FormHelperText id="startyear">Start Year</FormHelperText>
      
            <Select value={inputValue.start_year_of_job} onChange={(e)=>{updateValueDispatch({type: "ONCHANGE-UPDATE",id: id,key: "start_year_of_job", val: e.target.value})}} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>

        <FormControl>
             <FormHelperText id="endyear">End Year</FormHelperText>
            <Select value={inputValue.end_year_of_job}  onChange={(e)=>{updateValueDispatch({type: "ONCHANGE-UPDATE",id: id,key: "end_year_of_job", val: e.target.value})}} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>
        <Button sx={{display: id>0? "": "none", paddingTop: "1rem"}} onClick={()=>{updateValueDispatch({type: "DELETE",id: id})}}><DeleteForeverRoundedIcon/> </Button>
    </Box>
  )
}

export default WorkExpreanceChild
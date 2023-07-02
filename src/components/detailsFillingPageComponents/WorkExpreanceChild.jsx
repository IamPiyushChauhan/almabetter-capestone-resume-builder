import React from 'react'
import { MenuItem , Divider , Select , OutlinedInput , Typography , FormControl , FormHelperText, Box, Button} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function WorkExpreanceChild({id,inputValue, textValidation, onChangeDeleteExprieance, onChangeExprieance, showError}) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (v, i) => currentYear - i);

  return (
    <Box sx={{display: "flex", flexDirection: "column" ,paddingTop: id!=0? "2rem":""}}>
       <Typography component="h3">Work Expreance {id+1}</Typography>
       <Divider sx={{height: "1.5rem"}}/>

        <FormControl>
             <FormHelperText id="jobtitle">Job Title</FormHelperText>
            <OutlinedInput error={showError&&textValidation.job_title} value={inputValue.job_title} onChange={(e)=>{onChangeExprieance(id,e.target.value,"job_title")}} name='jobtitle'/>
        </FormControl>

        <FormControl>
             <FormHelperText id="organizationname">Organization Name</FormHelperText>
            <OutlinedInput error={showError&&textValidation.organization_name} value={inputValue.organization_name} onChange={(e)=>{onChangeExprieance(id,e.target.value,"organization_name")}} name='organizationname'/>
        </FormControl>
     
        <FormControl>
             <FormHelperText id="startyear">Start Year</FormHelperText>
            <Select error={showError&&textValidation.start_year_of_job} value={inputValue.start_year_of_job} onChange={(e)=>{onChangeExprieance(id,e.target.value,"start_year_of_job")}} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>

        <FormControl>
             <FormHelperText id="endyear">End Year</FormHelperText>
            <Select error={showError&&textValidation.end_year_of_job} value={inputValue.end_year_of_job}  onChange={(e)=>{onChangeExprieance(id,e.target.value,"end_year_of_job")}} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>
        <Button sx={{display: id>0? "": "none", paddingTop: "1rem"}} onClick={()=>{onChangeDeleteExprieance(id)}}><DeleteForeverRoundedIcon/> </Button>
    </Box>
  )
}

export default WorkExpreanceChild
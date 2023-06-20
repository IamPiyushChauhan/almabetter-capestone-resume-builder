import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { InputUpdateDataContext } from '../../App';
import { TextField,MenuItem , Divider , Select , OutlinedInput , Typography , FormControl , FormHelperText, Box, Card, Button, Input} from '@mui/material';

function Education() {
  const navigate = useNavigate()
  const [universityName,setUniversityName] = useState("")
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (v, i) => currentYear - i);

  
  const onClickBack = () => {
    navigate('/homepage/input-info/work-expreance')
  }
  
  const onClickNext = () => {
    navigate('/homepage/input-info/key-skills')
  }
  
  return (
    <Card sx={{padding: "5%"}}>
     <h4>Education Details</h4>
      <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>
     <FormControl>
     <FormHelperText id="type">Type</FormHelperText>
      
      <OutlinedInput value={inputUpdateDataContext.stateInputs.type} type="text" name="type" onChange={(e)=>inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "type",val: e.target.value})} />
     </FormControl>
      
      <Box sx={{  display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
    }}>
      <FormControl>
        <FormHelperText id="university">University</FormHelperText>
          
          <Select value={inputUpdateDataContext.stateInputs.university} name="university" onChange={(e)=>inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "university",val: e.target.value})}>
            <MenuItem value="">Select the University</MenuItem>
            <MenuItem value="Oxford University">Oxford University</MenuItem>
            <MenuItem value="Harvard University">Harvard University</MenuItem>
            <MenuItem value="IIT">IIT</MenuItem>
            <MenuItem value="IIM">IIM</MenuItem>
          </Select>

          <FormHelperText id="degree">Degree</FormHelperText>
          
          <Select value={inputUpdateDataContext.stateInputs.degree} name="degree" onChange={(e)=>inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "degree",val: e.target.value})}>
            <MenuItem value="">Select the Degree</MenuItem>
            <MenuItem value="Bachelor Degree">Bachelor Degree</MenuItem>
            <MenuItem value="Master Degree">Master Degree</MenuItem>
            <MenuItem value="Doctorate Degree">Doctorate Degree</MenuItem>
          </Select>
      </FormControl>
      
      <FormControl>
        <FormControl>
            <FormHelperText id="startyear">Start Year</FormHelperText>
            
            <Select value={inputUpdateDataContext.stateInputs.start_year_of_education}  onChange={(e)=> inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "start_year_of_education",val: e.target.value})} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>

        <FormControl>
            <FormHelperText id="endyear">End Year</FormHelperText>
            
            <Select value={inputUpdateDataContext.stateInputs.end_year_of_education} onChange={(e)=> inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "end_year_of_education",val: e.target.value})} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>
      </FormControl>
      </Box>

       <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>
       <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
        <Button sx={{margin: "2%"}} variant="outlined" onClick={ onClickBack }>Back</Button>
        <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext }>Next</Button>
      </Box>
    </Card>
  )
}

export default Education
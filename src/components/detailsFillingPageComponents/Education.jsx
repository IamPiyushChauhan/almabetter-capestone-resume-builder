import React,{useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { InputUpdateDataContext } from '../../App';
import { MenuItem , Divider , Select , OutlinedInput,  FormControl , FormHelperText, Box, Card, Button, LinearProgress} from '@mui/material';


function Education() {
  const navigate = useNavigate()
  const [message,setMessage] = useState("")
  const [isLodingVisiable,setIsLodingVisiable ]= useState(false)
  const [userInputNotice,setUserInputNotice] = useState(0)
  const [isOnClickOthers,setIsOnClickOthers] = useState(false)
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (v, i) => currentYear - i);

  
  
  const onClickBack = () => {
    navigate('/homepage/input-info/work-expreance')
  }
  

  //return if start year less then end year 
  const yearValidaion = () => {
    return Number(inputUpdateDataContext.stateInputs.start_year_of_education) < Number(inputUpdateDataContext.stateInputs.end_year_of_education)
  }

  const allEducationDetailsNotNull = () => {

    return (
      inputUpdateDataContext.stateInputs.type !== "" &&
      inputUpdateDataContext.stateInputs.university !== "" &&
      inputUpdateDataContext.stateInputs.degree !== "" &&
      inputUpdateDataContext.stateInputs.start_year_of_education !== "" &&
      inputUpdateDataContext.stateInputs.end_year_of_education !== ""
    )
  }

  useEffect(()=>{
    if(allEducationDetailsNotNull()){
      if(yearValidaion()){
        setIsLodingVisiable(false)
      }else{
        setMessage("Start year greater then end year")
      }
    }
  },[userInputNotice])

  const onClickNext = () => {
    setIsLodingVisiable(true)
    if(allEducationDetailsNotNull()) {
      if(yearValidaion()){
        navigate('/homepage/input-info/key-skills')
      }else{
        alert("Start year is greater then end year")
      }
      
    }
    
  }

  const onChangeUnivercity =  (e) => {
    const {value} = e.target
    if(value==="others"){
      inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "university",val: ""})
      setIsOnClickOthers(true)
      if(isLodingVisiable){
        setUserInputNotice(userInputNotice+1)
      }
    }else{
      inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: "university",val: value})

      if(isLodingVisiable){
        setUserInputNotice(userInputNotice+1)
      }
    }
  }

  const onChangeEducation = (e,key) =>{
    inputUpdateDataContext.updateDispatch({type: 'ONCHANGE', key: key,val: e.target.value})
    if(isLodingVisiable){
      setUserInputNotice(userInputNotice+1)
    }
  }
  
  return (
    <Card sx={{padding: "5%"}}>
     <h4>Education Details</h4>
      <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>
     <FormControl>
     <FormHelperText id="type">{(isLodingVisiable && inputUpdateDataContext.stateInputs.type==="")?"Please enter Type":"Type"}</FormHelperText>  
      <OutlinedInput error ={isLodingVisiable && inputUpdateDataContext.stateInputs.type===""}  value={inputUpdateDataContext.stateInputs.type} type="text" name="type" onChange={(e)=>onChangeEducation(e,"type")} />
     </FormControl>
      
      <Box sx={{  display: 'grid', columnGap: 3, rowGap: 1, gridTemplateColumns: 'repeat(2, 1fr)'}}>
      <FormControl>
        <FormHelperText id="university">{(isLodingVisiable && inputUpdateDataContext.stateInputs.university==="")? (isOnClickOthers)?"Please Type University":"Please Select University":"University"}</FormHelperText>
          {
            (isOnClickOthers) ?
            <OutlinedInput error={isLodingVisiable && inputUpdateDataContext.stateInputs.university===""} value={inputUpdateDataContext.stateInputs.university} type="text" name="university" onChange={onChangeUnivercity} placeholder='type your university' />
            :
            <Select error ={isLodingVisiable && inputUpdateDataContext.stateInputs.type===""} value={inputUpdateDataContext.stateInputs.university} name="university" onChange={onChangeUnivercity}>
                  <MenuItem value="">Select the University</MenuItem>
                  <MenuItem value="Oxford University">Oxford University</MenuItem>
                  <MenuItem value="Harvard University">Harvard University</MenuItem>
                  <MenuItem value="IIT">IIT</MenuItem>
                  <MenuItem value="IIM">IIM</MenuItem>
                  <MenuItem value="others">others</MenuItem>
                  {(inputUpdateDataContext.stateInputs.university!=="")? <MenuItem value={`${inputUpdateDataContext.stateInputs.university}`}>{inputUpdateDataContext.stateInputs.university}</MenuItem>:<></>}
            </Select>
          }

          <FormHelperText id="degree">Degree</FormHelperText>
          
          <Select error ={isLodingVisiable && inputUpdateDataContext.stateInputs.degree===""} value={inputUpdateDataContext.stateInputs.degree} name="degree" onChange={(e)=>onChangeEducation(e,"degree")}>
            <MenuItem value="">Select the Degree</MenuItem>
            <MenuItem value="Bachelor Degree">Bachelor Degree</MenuItem>
            <MenuItem value="Master Degree">Master Degree</MenuItem>
            <MenuItem value="Doctorate Degree">Doctorate Degree</MenuItem>
          </Select>
      </FormControl>
      
      <FormControl>
        <FormControl>
            <FormHelperText id="startyear">Start Year</FormHelperText>
            
            <Select error ={isLodingVisiable && inputUpdateDataContext.stateInputs.start_year_of_education===""} value={inputUpdateDataContext.stateInputs.start_year_of_education}  onChange={(e)=> onChangeEducation(e,"start_year_of_education") } >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>

        <FormControl>
            <FormHelperText id="endyear">End Year</FormHelperText>
            
            <Select error ={isLodingVisiable && inputUpdateDataContext.stateInputs.end_year_of_education===""} value={inputUpdateDataContext.stateInputs.end_year_of_education} onChange={(e)=> onChangeEducation(e,"end_year_of_education")} >
            {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
            </Select>
        </FormControl>
      </FormControl>
      </Box>

       <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>
       {
        (isLodingVisiable) ? 
                                  <React.Fragment>
                                   <div style={{padding: "0.8rem"}}>
                                     {message}
                                   </div>
                                     
                                    <LinearProgress sx={{gridColumn: 'span 2'}} />
                                  </React.Fragment>
                              :
                              <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
                                   <Button sx={{margin: "2%"}} variant="outlined" onClick={ onClickBack }>Back</Button>
                                   <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext }>Next</Button>
                               </Box>
       }
       
    </Card>
  )
}

export default Education
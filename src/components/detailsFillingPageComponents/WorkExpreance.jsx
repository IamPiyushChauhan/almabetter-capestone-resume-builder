import React, {useReducer,useContext} from 'react'
import WorkExpreanceChild from './WorkExpreanceChild';
import { useNavigate } from 'react-router-dom';
import { InputUpdateDataContext } from '../../App';
import { Card, Divider , Box, Button } from '@mui/material';


const reducer = (state,{type,key,id,val}) => {
  switch(type) {
    case "ONCHANGE-UPDATE":
       let obj = state[id];
       obj= {...obj, [key]: val}
      return [...(state.map((jobj,index)=>{ return (index===id)? obj: jobj}))];

    case "ADD":
      return [...state,{job_title: "",organization_name: "",start_year_of_job: "",end_year_of_job: ""}];

    case "DELETE":
      return state.filter((item,index)=>{ return index!=id})

    default:
      return state;
  }
}

function WorkExpreance() {
  const inputUpdateDataContext = useContext(InputUpdateDataContext)

  const navigate = useNavigate();
  const [state,dispatch] = useReducer(reducer,inputUpdateDataContext.stateInputs.work_expreance_list);
  console.log(state)
  
  const updateData = () => {
    inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "work_expreance_list", val: state})
  }

  const onClickBack = () => {
    updateData()
    navigate('/homepage/input-info/personal-info')
  }
  
  const onClickNext = () => {
    updateData()
    navigate('/homepage/input-info/education')
  }

  return (
    <Card sx={{padding: "5%"}}>
    
     {
      state.map((item,index)=>(<WorkExpreanceChild inputValue={item} key={index} id={index} updateValueDispatch={dispatch} />))
     }

     <Box sx={{display: 'flex', justifyContent: "center" , alignItems: "center", paddingTop: "1rem"}}> 
      <Button  variant="text" onClick={()=>{dispatch({type: "ADD"})}}>Add New</Button>
     </Box>

      
      
      <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>

      <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
        <Button sx={{margin: "2%"}} variant="outlined" onClick={ onClickBack }>Back</Button>
        <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext }>Next</Button>
      </Box>
    </Card>
  )
}

export default WorkExpreance
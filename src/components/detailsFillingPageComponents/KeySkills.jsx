import React,{useReducer,useContext} from 'react'
import { InputUpdateDataContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import {   Divider ,  OutlinedInput , Typography , FormControl , FormHelperText, Box, Card, Button} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const reducer = (state,{type,id,val})=> {
  switch(type){
    case "UPDATE-SKILLS":
      return [...(state.map((skill,index)=>{return (index==id)? val : skill}))]

    case "ADD":
      return [...state,""]

    case "DELETE":
      return state.filter((item,index)=>{ return index!=id})

    default:
      return state
  }
}


function KeySkills() {
  const navigate = useNavigate()
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const [state, dispatch] = useReducer(reducer,inputUpdateDataContext.stateInputs.skill_list.length === 0? ["","","",""] : inputUpdateDataContext.stateInputs.skill_list)
  
  
  
  const updateData = () => {
    inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "skill_list", val: state})
  }

  const onClickBack = () => {
    updateData()
    navigate('/homepage/input-info/education')
  }
  
  const onClickNext = () => {
    updateData()
    navigate('/homepage/preview')
  }
  return (
    <Card sx={{  display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: "5%"
    }}>
    <Typography component="h4">Key Skills</Typography>
     
      <Divider sx={{gridColumn: 'span 2'}}/>
      
        {
          state.map((item,index)=>( 
            <Box sx={{display: 'flex'}}>
              <OutlinedInput sx={{width: "100%"}} value={item} onChange={(e)=>dispatch({type: "UPDATE-SKILLS", id: index,val:  e.target.value})}/>
              <Button onClick={()=>{dispatch({type: "DELETE",id: index})}}><DeleteForeverRoundedIcon/> </Button>
            </Box>))
        }
      
      <span sx={{gridColumn: 'span 2'}} onClick={()=>{dispatch({type: "ADD"})}}>Add new</span>
      <Divider sx={{gridColumn: 'span 2'}}/>
      <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
        <Button sx={{margin: "2%"}} variant="outlined" onClick={ onClickBack }>Back</Button>
        <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext }>Preview</Button>
      </Box>
    
    </Card>
  )
}

export default KeySkills

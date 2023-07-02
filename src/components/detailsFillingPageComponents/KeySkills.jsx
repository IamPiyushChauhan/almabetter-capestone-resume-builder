import React,{useReducer,useContext,useState, useEffect} from 'react'
import { InputUpdateDataContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { LinearProgress ,  Divider ,  OutlinedInput , Typography , FormControl , FormHelperText, Box, Card, Button} from '@mui/material';
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

const textValidationReducer = (state,{type,id,val})=> {
  switch(type){
    case "UPDATE-SKILLS":
      return [...(state.map((skill,index)=>{return (index==id)? (val==="") : skill}))]

    case "ADD":
      return [...state,true]

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
  const [textValidationState, textValidationDispatch] = useReducer(textValidationReducer,inputUpdateDataContext.stateInputs.skill_list.length === 0? [true,true,true,true] : 
    inputUpdateDataContext.stateInputs.skill_list.map((skill,index)=>{return (skill==="")}))
  const [isLodingVisiable,setIsLodingVisiable ]= useState(false)
  const [userInputNotice,setUserInputNotice] = useState(0)
  console.log(textValidationState)
  
  
  const updateData = () => {
    inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "skill_list", val: state})
  }

  const notNullInKeyskillsList = () => {
    for(let i=0;i<textValidationState.length;i++){
      if(textValidationState[i]==true){
        return false
      }
    }

    return true
  } 
 

  useEffect(()=>{
    if(isLodingVisiable & notNullInKeyskillsList()){
      setIsLodingVisiable(false)
    }
  },[userInputNotice])

  const onClickBack = () => {
    updateData()
    navigate('/homepage/input-info/education')
  }

  
  const onClickNext = () => {
    setIsLodingVisiable(true)
    if(notNullInKeyskillsList()){
      updateData()
      navigate('/homepage/preview')
    }
  }

  const onChangeSkills = (e,index) =>{
    dispatch({type: "UPDATE-SKILLS", id: index,val:  e.target.value})
    textValidationDispatch({type: "UPDATE-SKILLS", id: index,val:  e.target.value})
    setUserInputNotice(userInputNotice+1)
  }

  const onDeleteSkills = (index) => {
    dispatch({type: "DELETE",id: index}); 
    textValidationDispatch({type: "DELETE",id: index})
    setUserInputNotice(userInputNotice+1)
  }

  return (
    <Card sx={{  display: 'grid', columnGap: 3, rowGap: 1, gridTemplateColumns: 'repeat(2, 1fr)', padding: "5%" }}>
    <Typography component="h4">Key Skills</Typography>
      <Divider sx={{gridColumn: 'span 2'}}/>
        {
          state.map((item,index)=>( 
            <Box sx={{display: 'flex'}}>
              <OutlinedInput error={isLodingVisiable && textValidationState[index]} sx={{width: "100%"}} value={item} onChange={(e)=>onChangeSkills(e,index)}/>
              <Button  onClick={()=>{onDeleteSkills(index)}}><DeleteForeverRoundedIcon/> </Button>
            </Box>))
        }
      
      <span sx={{gridColumn: 'span 2'}} onClick={()=>{dispatch({type: "ADD"});textValidationDispatch({type: "ADD"})}}>Add new</span>
      <Divider sx={{gridColumn: 'span 2'}}/>

        {
        (isLodingVisiable) ? 
                                <LinearProgress sx={{gridColumn: 'span 2'}} />
                              :
                              <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
                                   <Button sx={{margin: "2%"}} variant="outlined" onClick={ onClickBack }>Back</Button>
                                   <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext }>Next</Button>
                               </Box>
       }
      
    
    </Card>
  )
}

export default KeySkills

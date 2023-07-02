import React, {useReducer,useContext,useState,useEffect} from 'react'
import WorkExpreanceChild from './WorkExpreanceChild';
import { useNavigate } from 'react-router-dom';
import { InputUpdateDataContext } from '../../App';
import { Card, Divider , Box, Button, LinearProgress } from '@mui/material';


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

const textValidationReducer = (state,{type,key,id,val}) => {
  switch(type) {
    case "ONCHANGE-UPDATE":
       let obj = state[id];
       obj= {...obj, [key]: (val==="")}
      return [...(state.map((jobj,index)=>{ return (index===id)? obj: jobj}))];

    case "ADD":
      return [...state,{job_title: true,organization_name: true,start_year_of_job: true,end_year_of_job: true}];

    case "DELETE":
      return state.filter((item,index)=>{ return index!=id})

    default:
      return state;
  }
}



function WorkExpreance() {
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const [isLodingVisiable,setIsLodingVisiable ]= useState(false)
  const [userInputNotice,setUserInputNotice] = useState(0)
  const [message,setMessage] = useState("")
  const navigate = useNavigate();
  const [state,dispatch] = useReducer(reducer,inputUpdateDataContext.stateInputs.work_expreance_list);
  const [textValidationState, textValidationDispatch] = useReducer(textValidationReducer, 
    inputUpdateDataContext.stateInputs.work_expreance_list.map((workExprieance)=>{return {job_title: workExprieance.job_title==="",organization_name: workExprieance.organization_name==="",start_year_of_job: workExprieance.start_year_of_job==="",end_year_of_job: workExprieance.end_year_of_job===""}}))
  console.log(textValidationState)
  const updateData = () => {
    inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "work_expreance_list", val: state})
  }

  const isNotNullInData = () =>{
    for(let i=0;i<textValidationState.length;i++){
      let obj = textValidationState[i]
      console.log(obj.job_title || obj.organization_name || obj.start_year_of_job || obj.end_year_of_job)
      if(obj.job_title || obj.organization_name || obj.start_year_of_job || obj.end_year_of_job ){
        return false
      } 
    }
    return true
  }

  const isValidDate = () => {
    setMessage("Start year greater then end year ")
    let result = true
    for(let i=0;i<state.length;i++){
      let obj = state[i]
      if(obj.start_year_of_job > obj.end_year_of_job){
        setMessage((prev)=> {return `${prev} Work Exprieance ${i+1}`})
        result = false
      }
    }
    return result
  }

  useEffect(()=>{
    if(isLodingVisiable && isNotNullInData() && isValidDate()){
      setIsLodingVisiable(false)
    }
  },[userInputNotice])

  const onChangeExprieance = (id,val,key) => {
    dispatch({type: "ONCHANGE-UPDATE",id: id,key: key, val: val})
    textValidationDispatch({type: "ONCHANGE-UPDATE",id: id,key: key, val: val})
    if(isLodingVisiable){
      setUserInputNotice(userInputNotice+1)
    }
  }

  const onChangeDeleteExprieance = (id) => {
    dispatch({type: "DELETE",id: id})
    textValidationDispatch({type: "DELETE",id: id})
    if(isLodingVisiable){
      setUserInputNotice(userInputNotice+1)
    }
  }

  const onClickAdd = () =>{
    dispatch({type: "ADD"})
    textValidationDispatch({type: "ADD"})
  }

  const onClickBack = () => {
    updateData()
    navigate('/homepage/input-info/personal-info')
    
  }
  
  const onClickNext = () => {
    setIsLodingVisiable(true)
    if(isNotNullInData() && isValidDate()){
      updateData()
      navigate('/homepage/input-info/education')
    }
  }

  return (
    <Card sx={{padding: "5%"}}>
    
     {
      state.map((item,index)=>(<WorkExpreanceChild inputValue={item} key={index} id={index}  textValidation={textValidationState[index]}  onChangeDeleteExprieance={onChangeDeleteExprieance}   onChangeExprieance = {onChangeExprieance} showError = {isLodingVisiable} /> ))
     }

     <Box sx={{display: 'flex', justifyContent: "center" , alignItems: "center", paddingTop: "1rem"}}> 
      <Button  variant="text" onClick={()=>{onClickAdd()}}>Add New</Button>
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

export default WorkExpreance
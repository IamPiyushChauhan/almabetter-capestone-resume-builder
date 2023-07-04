import React,{useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { InputUpdateDataContext } from '../../App';
import { Button, Card , Divider, OutlinedInput, FormHelperText, FormControl,  Box, Avatar, LinearProgress } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import ImageUploadPopUpWindow from './ImageUploadPopUpWindow';

const nameRegex = /^[A-Za-z\s]+$/
const onlyOneWordRegex = /^[a-zA-Z]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;
const addressRegex = /^[a-zA-Z0-9\s,\.]+$/
const postalCodeRegex = /^\d{6}$/;
const objectiveRegex = /^.{7,}$/

// this array contains Props for OutlinedInput and the textvalidation condition and error message for icorrect validation
const inputFormatArray =
[
    { key: 'fname', label: 'First Name',multiline: false,row: 1, span: 1 , regex: nameRegex, error_message: "Please enter only letter"},
    { key: 'lname', label: 'Last Name', multiline: false, row: 1, span: 1, regex: nameRegex, error_message: "Please enter only letter"},
    { key: 'email', label: 'Email', multiline: false, row: 1, span: 1, regex: emailRegex, error_message: "Please Enter valid email"},
    { key: 'mobile', label: 'Mobile', multiline: false, row: 1, span: 1, regex: mobileRegex, error_message: "Please enter valid mobile number"},
    { key: 'address', label: 'Address', multiline: false, row: 2, span: 2, regex: addressRegex, error_message: "Please enter valid Address"},
    { key: 'city', label: 'City', multiline: false, row: 1, span: 1, regex: onlyOneWordRegex, error_message: "Please enter only letter"},
    { key: 'state', label: 'State', multiline: false, row: 1, span: 1, regex: onlyOneWordRegex, error_message: "Please enter only letter"},
    { key: 'postal_code', label: 'Postal Code', multiline: false, row: 1, span: 1, regex: postalCodeRegex,  error_message: "Please enter valid Postal Code"},
    { key: 'objective', label: 'objective', multiline: true, row: 8, span: 2,regex: objectiveRegex, error_message: "Please write more words"}
]

function PersonalInfo() {
  const [isLodingVisiable,setIsLodingVisiable ]= useState(false)
  //
  const [userInputNotice,setUserInputNotice] = useState(0)
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const isAllFilledPersonalInfo =() =>{
    if(inputUpdateDataContext.stateInputs.profile_photo!==null &&
      nameRegex.test(inputUpdateDataContext.stateInputs.fname) &&
       nameRegex.test(inputUpdateDataContext.stateInputs.lname) && 
       emailRegex.test(inputUpdateDataContext.stateInputs.email) && 
       mobileRegex.test(inputUpdateDataContext.stateInputs.mobile) &&
       onlyOneWordRegex.test(inputUpdateDataContext.stateInputs.city) &&
       onlyOneWordRegex.test(inputUpdateDataContext.stateInputs.state) && 
       postalCodeRegex.test(inputUpdateDataContext.stateInputs.postal_code) &&
       objectiveRegex.test(inputUpdateDataContext.stateInputs.objective))
       {
        return true
       }
        else {
          return false
        }
}
const onClickNext = () => {
  setIsLodingVisiable(true)
  if(isAllFilledPersonalInfo()) {
    navigate('/homepage/input-info/work-expreance')
  }
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const requiredStr = "please enter "

  useEffect(()=>{
    if(isLodingVisiable && isAllFilledPersonalInfo()){
      setIsLodingVisiable(false)
    }
  },[userInputNotice])
  

  const onChangeFuntion = (e, key)=>{
    
    inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: `${key}`, val: e.target.value})
    if(isLodingVisiable){
      setUserInputNotice(userInputNotice+1)
    }
  }

  return (
    <Card sx={{  display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: "5%"
    }}>
      <Box sx={{gridColumn: 'span 2'}}>
           <Avatar sx={{ width: 156, height: 156 }} src= {inputUpdateDataContext.stateInputs.profile_photo}/>
          <Button sx={{paddingTop: "1rem", color: (isLodingVisiable&&inputUpdateDataContext.stateInputs.profile_photo===null)}} onClick={handleClickOpen} variant="text">{inputUpdateDataContext.stateInputs.profile_photo===null? (isLodingVisiable)? "Please upload image" :"Upload Image" : "Change Image"}</Button>
          <ImageUploadPopUpWindow open= {open} handleClose= {handleClose}/>
       </Box>

       {
        inputFormatArray.map(
          (item,index)=> (
            <FormControl sx={{gridColumn: `span ${item.span}`}}>
              <FormHelperText id={`${item.key}`}>
              {
              `${(isLodingVisiable && inputUpdateDataContext.stateInputs[`${item.key}`] === "")? 
              `${requiredStr} ${item.label}`: 
              (isLodingVisiable && !(item.regex.test(inputUpdateDataContext.stateInputs[`${item.key}`])))? `${item.error_message}`:`${item.label}`}`} </FormHelperText>
              <OutlinedInput multiline={item.multiline} rows={item.row} 
              error={(isLodingVisiable && inputUpdateDataContext.stateInputs[`${item.key}`] === "")?
              true: (isLodingVisiable && !(item.regex.test(inputUpdateDataContext.stateInputs[`${item.key}`])))} 
              value={inputUpdateDataContext.stateInputs[`${item.key}`]} onChange={e => {onChangeFuntion(e,item.key)}} type="text" name="fname" placeholder= {`Enter your  ${item.label}`}/>
            </FormControl>
          )
        )
       }
       <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>
        {
          (isLodingVisiable) ? 
                                <LinearProgress sx={{gridColumn: 'span 2'}} />
                              :
                              <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
                                <Button sx={{margin: "2%"}} variant="outlined" onClick={()=>{ navigate('/homepage/resume-template')}}>Back</Button>
                                <Button sx={{margin: "2%"}} variant="contained" onClick={onClickNext}>Next</Button>
                              </Box>
        }

    </Card>
  )
}

export default PersonalInfo

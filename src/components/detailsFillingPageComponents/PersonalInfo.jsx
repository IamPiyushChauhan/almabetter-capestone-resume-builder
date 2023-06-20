import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { InputUpdateDataContext } from '../../App';
import { Button, Card , Divider, OutlinedInput, FormHelperText, FormControl,  Box, Avatar } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import ImageUploadPopUpWindow from './ImageUploadPopUpWindow';

function PersonalInfo() {
  const inputUpdateDataContext = useContext(InputUpdateDataContext)
  const navigate = useNavigate();

  console.log("--------------------Personal INFO--------------------------");
  console.log(inputUpdateDataContext.stateInputs)
  console.log("--------------------Personal INFO--------------------------");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{  display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: "5%"
    }}>
       <Box sx={{gridColumn: 'span 2'}}>
           <Avatar sx={{ width: 156, height: 156 }} src= {inputUpdateDataContext.stateInputs.profile_photo}/>
          <Button sx={{paddingTop: "1rem"}} onClick={handleClickOpen} variant="text">{inputUpdateDataContext.stateInputs.profile_photo===null? "Upload Image" : "Change Image"}</Button>
          <ImageUploadPopUpWindow open= {open} handleClose= {handleClose}/>
       </Box>
        <FormControl>
            <FormHelperText id="fname">Name</FormHelperText>
            <OutlinedInput value={inputUpdateDataContext.stateInputs.fname} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "fname", val: e.target.value})}} type="text" name="fname" placeholder="Enter your name" />
         </FormControl>

         <FormControl>
            <FormHelperText id="lname">Last Name</FormHelperText>
            
            <OutlinedInput value={inputUpdateDataContext.stateInputs.lname} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "lname", val: e.target.value})}} type="text" name="lname" placeholder="Enter your name" />
         </FormControl>     
      
          <FormControl>
            <FormHelperText id="email">Email:</FormHelperText>
            <OutlinedInput value={inputUpdateDataContext.stateInputs.email} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "email", val: e.target.value})}}  type="email" id="email" name="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl>
                <FormHelperText id="mobile">Mobile</FormHelperText>
                <OutlinedInput value={inputUpdateDataContext.stateInputs.mobile} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "mobile", val: e.target.value})}} type="tel" id="mobile" name="mobile" placeholder="Enter your mobile number" />
          </FormControl>
        
          <FormControl sx={{gridColumn: 'span 2'}}>
              <FormHelperText id="address">Address</FormHelperText>
              <OutlinedInput value={inputUpdateDataContext.stateInputs.address} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "address", val: e.target.value})}} type="text" className='input-full-width' name="address" placeholder="Enter your Address" />
          </FormControl>
          
          
         <FormControl>
            <FormHelperText id="city">City</FormHelperText>
            <OutlinedInput value={inputUpdateDataContext.stateInputs.city} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "city", val: e.target.value})}} type="text" name="city" placeholder="City" />
         </FormControl>

         <FormControl>
            <FormHelperText id="state">State</FormHelperText>
            
            <OutlinedInput value={inputUpdateDataContext.stateInputs.state} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "state", val: e.target.value})}} type="text" name="state" placeholder="State" />
         </FormControl>
       

        <FormControl>
            <FormHelperText id="postalcode">Postalcode</FormHelperText>
            
            <OutlinedInput value={inputUpdateDataContext.stateInputs.postal_code} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "postal_code", val: e.target.value})}} type="text" name="postalcode" placeholder="Postalcode" />
        </FormControl>
    
            <FormControl sx={{gridColumn: 'span 2'}}>
              <FormHelperText id="objective">Objective</FormHelperText>
              <TextareaAutosize  value={inputUpdateDataContext.stateInputs.objective} onChange={e => {inputUpdateDataContext.updateDispatch({type: "ONCHANGE", key: "objective", val: e.target.value})}} className='input-full-width'  name="objective" minRows="8" />
            </FormControl>
            
        <Divider sx={{height: "3rem" , gridColumn: 'span 2'}}/>

        <Box sx={{gridColumn: 'span 2', display: "flex" , justifyContent: "flex-end" }}>
            <Button sx={{margin: "2%"}} variant="outlined" onClick={()=>{ navigate('/homepage/resume-template')}}>Back</Button>
            <Button sx={{margin: "2%"}} variant="contained" onClick={()=>{ navigate('/homepage/input-info/work-expreance')}}>Next</Button>
        </Box>
   
    </Card>
  )
}

export default PersonalInfo

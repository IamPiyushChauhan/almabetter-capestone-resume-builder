import { Padding } from '@mui/icons-material'
import React, { useContext } from 'react'
import { NavLink , Outlet, useLocation} from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery';
import { Divider } from '@mui/material';


function InputSession() {
  const isMidScreen = useMediaQuery('(max-width: 900px)')
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  return (
      <div className='input-session'>
        <div className='input-session-child-one' style={{paddingRight: isSmallScreen? "2.5rem":isMidScreen? "5rem":"" , paddingTop: isSmallScreen? "0.5rem":isMidScreen? "5rem":"", position:isSmallScreen? "sticky":""}}>
            <ul className='input-session-nevigation-link' style={{margin: isSmallScreen? "1.5rem" : ""}}>
              <li>
                <div style={{display: isSmallScreen? "flex": "" , justifyContent: isSmallScreen? "center": "" , alignItems: "center" }}> 
                  <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , borderBottom: isActive&isMidScreen? "2px solid #1965F5":"" ,borderLeft: isActive&(!isMidScreen)? "2px solid #1965F5":"" , paddingLeft: "2%" , width: isSmallScreen? "22vw" : isMidScreen? "12vw" : "25vw" } }} to="/homepage/input-info/personal-info"><p>{"Personal Info"}</p></NavLink> 
                  <Divider sx={{display: isSmallScreen? "block": isMidScreen? "none":"block"}} orientation= {isSmallScreen? "vertical": "horizontal"}/>
                </div>
              </li>
              <li>
                <div style={{display: isSmallScreen? "flex": "" , justifyContent: isSmallScreen? "center": "" , alignItems: "center" }}> 
                  <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , borderBottom: isActive&isMidScreen? "2px solid #1965F5":"" ,borderLeft: isActive&(!isMidScreen)? "2px solid #1965F5":"" , paddingLeft: "2%", width: isSmallScreen? "22vw" : isMidScreen? "12vw" : "25vw"} }} to="/homepage/input-info/work-expreance"><p>{"Work Expreance"}</p></NavLink> 
                  <Divider sx={{display: isSmallScreen? "block": isMidScreen? "none":"block"}} orientation= {isSmallScreen? "vertical": "horizontal"}/>
                </div>
              </li>
              <li>
                <div style={{display: isSmallScreen? "flex": "" , justifyContent: isSmallScreen? "center": "" , alignItems: "center" }}> 
                  <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , borderBottom: isActive&isMidScreen? "2px solid #1965F5":"" ,borderLeft: isActive&(!isMidScreen)? "2px solid #1965F5":"" , paddingLeft: "2%", width: isSmallScreen? "22vw" : isMidScreen? "12vw" : "25vw"} }} to="/homepage/input-info/education"><p>Education</p></NavLink> 
                  <Divider sx={{display: isSmallScreen? "block": isMidScreen? "none":"block"}} orientation= {isSmallScreen? "vertical": "horizontal"}/>
                </div>
              </li>
              <li>
              <div style={{display: isSmallScreen? "flex": "" , justifyContent: isSmallScreen? "center": "" , alignItems: "center" }}> 
                <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , borderBottom: isActive&isMidScreen? "2px solid #1965F5":"" ,borderLeft: isActive&(!isMidScreen)? "2px solid #1965F5":"" , paddingLeft: "2%", width: isSmallScreen? "22vw" : isMidScreen? "12vw" : "25vw"} }} to="/homepage/input-info/key-skills"><p>Key Skills</p></NavLink> 
              </div>
              </li>
            </ul>
        </div>

        <div className='input-session-child-two' style={{paddingTop: "2.5rem" , width: isSmallScreen? "90%": isMidScreen? "80%"  :"60%"}}>
            <Outlet />    
        </div>
      </div>
  )
}

export default InputSession

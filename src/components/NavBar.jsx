import React, {useRef,useState} from 'react'
import { BrowserRouter, Routes, Route, NavLink , Outlet} from 'react-router-dom'
import ResumeTemplate from './ResumeTemplateOptions'
import AboutAs from './AboutAs'
import MyResume from './MyResume'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import useMediaQuery from '@mui/material/useMediaQuery';
import { Card, Divider, List, ListItem } from '@mui/material'



function NavBar() {
 const midScreen = useMediaQuery('(max-width: 900px)')
 const smallScreen = useMediaQuery('(max-width: 600px)')

 const [isMenuClicked,setIsMenuClicked] = useState(false)
  return (
    <AppBar component="nav" sx={{backgroundColor: "white"}}>
      <Toolbar sx={{justifyContent: "space-between", position: "static", top: 0}}>
          <img src="/almabetterlogo.png" style={{width: smallScreen? "25vw" : "10vw", padding: "0.5rem"}} />
          
          <Box sx={{ display: midScreen? "none": "block" }}>
            <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem" } }} to="/homepage/resume-template">Resume Templates </NavLink>
            <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem"} }} to="/homepage/my-resume">My Templates</NavLink>
            <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem"} }} to="/homepage/about-us">About Us</NavLink>
          </Box>

          <Button onClick={()=>{setIsMenuClicked(!isMenuClicked)}} sx={{display: midScreen? "block": "none"}}><MenuIcon sx={{color: "rgb(197, 20, 20)"}} /></Button>

        </Toolbar>
        <Toolbar sx={{display: isMenuClicked && midScreen? "flex": "none" , justifyContent: "center" , alignItems: "center"}}>
        
        <List sx={{width: '100%', display: "flex" , flexDirection: smallScreen? "column":"row"}} component="nav">
            <ListItem  sx={{display: "flex",alignItems: "center" ,justifyContent: "center"}}>
              <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem" } }} to="/homepage/resume-template">Resume Templates </NavLink>
            </ListItem>
            <Divider orientation= {smallScreen? "horizontal":"vertical"} flexItem />
            <ListItem sx={{display: "flex",alignItems: "center" ,justifyContent: "center"}}>
            <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem"} }} to="/homepage/my-resume">My Templates</NavLink>
            </ListItem>
            <Divider orientation= {smallScreen? "horizontal":"vertical"} flexItem />
            <ListItem sx={{display: "flex",alignItems: "center" ,justifyContent: "center"}}>
            <NavLink style={({isActive})=> {return{color: isActive? "#1965F5": "black" , textDecoration: 'none' , marginRight: "1rem"} }} to="/homepage/about-us">About Us</NavLink>
            </ListItem>

        </List>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar

import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <React.Fragment>
        <NavBar/>
        <div style={{marginTop: "2.5rem"}}>
          <Outlet/>
        </div>
    </React.Fragment>
  )
}

export default HomePage
import React,{useContext} from 'react'
import { InputUpdateDataContext } from '../../App'


function Read() {
    const inputUpdateDataContext = useContext(InputUpdateDataContext)
    console.log("Read inputUpdateDataContext")
    console.log(inputUpdateDataContext)
    console.log("_____________________________________________________")
    console.log(inputUpdateDataContext.stateInputs)
  return (
    <div>Read</div>
  )
}

export default Read
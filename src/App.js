import React, {useReducer, useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import ResumeTemplateOptions from './components/ResumeTemplateOptions';
import MyResume from './components/MyResume';
import AboutAs from './components/AboutAs';
import HomePage from './components/HomePage';
import InputSession from './components/InputSession';
import PersonalInfo from './components/detailsFillingPageComponents/PersonalInfo'
import WorkExpreance from './components/detailsFillingPageComponents/WorkExpreance'
import Education from './components/detailsFillingPageComponents/Education'
import KeySkill from './components/detailsFillingPageComponents/KeySkills'
import Read from './components/detailsFillingPageComponents/Read';
import Preview from './components/Preview';

export const InputUpdateDataContext = React.createContext() 

const initalState = {
  profile_photo: null,
  fname: "",
lname: "",
email: "",
mobile: "",
address: "",
city: "",
state: "",
postal_code: "",
objective: "",
work_expreance_list: [{job_title: "",organization_name: "",start_year_of_job: "",end_year_of_job: ""}],
type: "",
university: "",
degree: "",
start_year_of_education: "",
end_year_of_education: "",
skill_list: [],
is_edit: false,
file_name: "",
my_resume_id: ""
}

const initalMYStateResumeState = []

const reducer =(state,{type,key,val,editData})=>{
  switch(type) {
    case "ONCHANGE":
      return {...state,[key]: val}
    case "EDIT-DATA":
      return editData
    case "RESET":
      return initalState
    default:
      return state
  }
}


const myResumeReducer = (state, {type,data, id}) => {
  switch(type) {
    case "ADD":
      return [...state,data]
    case "DELETE":
      return state.filter((item,index)=>{ return index!=id})
    
    case "UPDATE-DATA":
      const arr = state
      arr[ Number(id)] = data
      return [...(arr.map((resume,index)=>{return (index==id)? data : resume}))]
  }

}

function App() {
  // use to send and update data given by user in data filling session
  const [state,dispatch] = useReducer(reducer,initalState)
  // use to save resume data, resume name in list 
  const [myResumeList, myResumeListDiapatch] = useReducer(myResumeReducer,initalMYStateResumeState)
  //use to save resume name 
  const [resumeState, setResumeState] = useState("")
  // set resume name
  const updateDataResumeState=(val)=>{
    setResumeState(val)
  }


  return (
    <InputUpdateDataContext.Provider value={
      {stateInputs: state , updateDispatch: dispatch, 
      updateDataResumeState: updateDataResumeState, 
      resumeState: resumeState, updateDataResumeState: updateDataResumeState,
      myResumeList: myResumeList, myResumeDiapatch: myResumeListDiapatch
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to="/homepage/resume-template" />}/>
          
          <Route path='/homepage/input-info' element={<Navigate replace to="/homepage/input-info/personal-info" />}/>
          <Route path='/homepage' element={<HomePage />}>
              <Route path='resume-template' element={<ResumeTemplateOptions />}/>
              <Route path='my-resume' element={<MyResume />}/>
              <Route path='about-us' element={<AboutAs />}/>

              <Route path='input-info' element={<InputSession />} >
                <Route path='personal-info' element={<PersonalInfo />} />
                <Route path='work-expreance' element={<WorkExpreance />} />
                <Route path='education' element={<Education />} />
                <Route path='key-skills' element={<KeySkill />} />
                <Route path='read' element={<Read />}/>
              </Route>

              <Route path='preview' element={<Preview/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </InputUpdateDataContext.Provider>
  );
}

export default App;

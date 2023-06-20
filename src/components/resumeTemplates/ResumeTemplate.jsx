import React from 'react'
import ResumeTemplateOne from './ResumeTemplateOne';
import ResumeTemplateTwo from './ResumeTemplateTwo';
import ResumeTemplateThree from './ResumeTemplateThree';
import ResumeTemplateFour from './ResumeTemplateFour';
function ResumeTemplate({data, resumeNumber}) {
    switch(resumeNumber){
        case "one":
            return <ResumeTemplateOne data={data}/>
        case "two":
            return <ResumeTemplateTwo data={data}/>
        case "three":
            return <ResumeTemplateThree data={data}/>
        case "four":
            return <ResumeTemplateFour data={data}/>
    }
}

export default ResumeTemplate
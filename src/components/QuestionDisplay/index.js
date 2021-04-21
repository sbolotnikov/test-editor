import React,{ useEffect, useState } from 'react';
import LayoutBox from '../../components/LayoutBox';
import LayoutSimple from '../../components/LayoutSimple';
const QuestionDisplay = props => {
    const [backgroundVal,setBackgroundVal]= useState('')
    useEffect(() => {
        // setting up background
        let backgroundValue= (props.background.length>0)? `url(${props.background})`:''
        let gradientValue= (props.gradient.length>0)? ` ${props.gradient}`:'';
        let comma= ((props.background.length>0) && (props.gradient.length>0))?',':''
        setBackgroundVal(gradientValue+comma+backgroundValue);
    }, []);
    return (
        // displaying specific layout based on question 
            <div id='questionDisplayContainer' className={`${(props.status==='test') ? "noScroll" : ""}`} style={{backgroundImage:backgroundVal}}>
                {props.info.layout === 'box' ? <LayoutBox type={props.info.correct} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}
                {props.info.layout === 'simple' ? <LayoutSimple info={props.info} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}    
            </div>
    );
}
export default QuestionDisplay;
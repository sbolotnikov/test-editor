import React from 'react';
import LayoutBox from '../../components/LayoutBox';
import LayoutSimple from '../../components/LayoutSimple';
import "./style.css";
const QuestionDisplay = props => {

    return (
            <div style={{height:'100%',width:'100%',backgroundImage: `url(${props.background})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover'}}>
                {props.info.layout === 'box' ? <LayoutBox type={props.info.correct} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}
                {props.info.layout === 'simple' ? <LayoutSimple info={props.info} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}    
            </div>
    );
}
export default QuestionDisplay;
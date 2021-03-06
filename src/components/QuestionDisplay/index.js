import React, { Fragment, useEffect } from 'react';
import LayoutBox from '../../components/LayoutBox';
import LayoutSimple from '../../components/LayoutSimple';
import "./style.css";
const QuestionDisplay = props => {

    return (
        <Fragment>
            <div style={{backgroundImage: `url(${props.background})`, backgroundSize: '100% 100%' }}>
                {props.info.layout === 'box' ? <LayoutBox type={props.info.correct} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}
                {props.info.layout === 'simple' ? <LayoutSimple info={props.info} vis={props.vis} question={props.question} answers={props.answers} checkedMarks={props.checkedMarks} onChange={(ch) => { props.onChange(ch) }} />
                    : <div style={{ display: 'none' }}></div>}    
            </div>
        </Fragment>
    );
}
export default QuestionDisplay;
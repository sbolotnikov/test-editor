import React, { Fragment, useEffect } from 'react';
import "./style.css";
const LayoutSimple = props => {


    useEffect(() => {
        for (let i = 0; i < document.querySelectorAll(".checkOut").length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }

    });
    function checkingMulti(e) {
        if (props.info.correct === 1) {
            for (let i = 0; i < props.answers.length; i++) {
                document.querySelector("#answer_" + i).checked = false;

            }
            document.querySelector("#" + e.target.id).checked = true;
        }
        let choice = [];
        for (let i = 0; i < props.answers.length; i++) {
            if (document.querySelector("#answer_" + i).checked === true) {
                choice.push(i);
            }
        }
        props.onChange(choice);
    }

    return (
        <Fragment>
            <div style={{ opacity: props.vis, width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <img src={props.info.img} style={{ width: '100%' }} alt={props.info.img} />
                    <div style={{ color: "white", width: "100%", fontSize: "5em", textAlign: 'center' }} >{props.question}</div>
                </div>
                {/* <div className="con"> */}
                    {props.answers.map((answerOption, j) => {
                        return (
                            <label className="option_simple" for={"answer_" + j}>
                                <input type="checkbox" className="checkOut" id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                                <div className="option_inner" >
                                    <span className="name">{answerOption.text}</span>
                                </div>
                            </label>
                        )
                    })}
            </div>
        </Fragment>
    );
}
export default LayoutSimple;
import React, { Fragment, useEffect } from 'react';
// import Switch from '../../components/Switch';
import "./style.css";
const LayoutBox = props => {


    useEffect(() => {
        for (let i = 0; i < document.querySelectorAll(".checkOut").length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }

    });
    function checkingMulti(e) {
        if (props.type === 1) {
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
            <div className='container' style={{ opacity: props.vis }}>
                <h2 style={{ color: "white", width: "100%" }} >{props.question}</h2>

                {props.answers.map((answerOption, j) => {
                    return (
                        <label className="option_item">
                            <input type="checkbox" className="checkOut" id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                            <div className="option_inner" style={{ backgroundImage: `url(${answerOption.img})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
                                <div className="tickmark"> </div>
                                <div className="name">{answerOption.text}</div>
                            </div>
                        </label>
                    )
                })}
            </div>
        </Fragment>
    );
}
export default LayoutBox;
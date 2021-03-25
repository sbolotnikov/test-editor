import React, {useEffect } from 'react';
import Textfit  from 'react-textfit';
import "./style.css";
function LayoutSimple(props) {

    useEffect(() => {
        for (let i = 0; i < document.querySelectorAll(".checkOut").length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }

    }, []);
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
        <div style={{ opacity: props.vis, width: '100%', height: '100%', flexWrap: 'wrap', maxWidth: "1300px" }}>
            <div className="d-flex align-middle justify-content-center" style={{ width: '100%' }}>
                <img src={props.info.img} style={{ width: "100%", maxWidth: '350px' }} alt={props.info.img} />
            </div>
            <div className="d-flex align-middle justify-content-center" style={{ color: "white", width: "100%", height: "10vh", }} >
            <Textfit mode="multi">{props.question}</Textfit>
            </div>
            <div  className="d-flex align-middle justify-content-center">
                {props.answers.map((answerOption, j) => {
                    return (
                        <label className="option_simple" key={"labelSimple"+j}>
                            <input type="checkbox" className="checkOut" key={"inputSimple"+j} id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                            <div className="option_inner" key={"divSimple"+j}>
                                <span className="name" key={"spanSimple"+j} >{answerOption.text}</span>
                            </div>
                        </label>
                    )
                })}
            </div>
        </div>
    );
}
export default LayoutSimple;
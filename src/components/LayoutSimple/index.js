import React, { useEffect } from 'react';
import Textfit from 'react-textfit';
import "./style.css";
function LayoutSimple(props) {

    useEffect(() => {
        for (let i = 0; i < document.querySelectorAll(".checkOut").length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }
        console.log(props.answers)
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
            <div className="d-flex align-middle justify-content-center" style={{ width: '100%', height: window.innerWidth < 700 ? '20%' : '40%' }}>
                <img src={props.info.img} style={{ width: "auto", maxWidth: '350px',marginTop:"5px" }} alt={props.info.img} />
            </div>
            <div className="d-flex align-middle justify-content-center " style={{ position: "relative", color: "white", width: "100%", height: "20%" }} >
                <Textfit max={256}
                    min={24}
                    style={{
                        minHeight: "80%",
                        maxHeight: "80%",
                        minWidth: "80%",
                        maxWidth: "80%",
                        lineHeight: 1,
                        textShadow: '1px 1px 2px black'
                    }}>{props.question}</Textfit>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', width: '100%', overflow: 'hidden', height: window.innerWidth < 700 ? '60%' : '40%', }}>
                {props.answers.map((answerOption, j) => {
                    return (
                        <label className="option_simple" key={"labelSimple" + j} style={{ height: `${93 / props.answers.length}%` }}>
                            <input type="checkbox" className="checkOut" key={"inputSimple" + j} id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                            <div className="option_inner" key={"divSimple" + j}>
                                <Textfit className="name" key={"spanSimple" + j} max={256}
                                    min={24}
                                    style={{
                                        minHeight: "80%",
                                        maxHeight: "80%",
                                        minWidth: "80%",
                                        maxWidth: "80%",
                                        lineHeight: 1,
                                        textShadow: '1px 1px 2px black'
                                    }}>{answerOption.text}</Textfit>
                            </div>
                        </label>
                    )
                })}
            </div>
        </div>
    );
}
export default LayoutSimple;
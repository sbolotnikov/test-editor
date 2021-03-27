import React, { Fragment, useEffect } from 'react';
import Textfit from 'react-textfit';
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
                <div className="d-flex align-middle justify-content-center " style={{ position: "relative", color: "white", width: "100%", marginTop: '7%', height: window.innerWidth < 700 ? '8vh' : '30vh', }} >
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
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', width: '100%', overflow:'visible', height: window.innerWidth < 700 ? '87vh' : '40vh', }}>
                    {props.answers.map((answerOption, j) => {
                        return (
                            <label className="option_item" key={"labelBox" + j} style={{ width: '44%',height: 'auto',margin: '1px', maxWidth:'200px'}}>
                                <input type="checkbox" className="checkOut" key={"inputBox" + j} id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                                <div className="option_inner" style={{ backgroundImage: `url(${answerOption.img})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
                                    <div className="tickmark" key={"divBox" + j}> </div>
                                    <div className="name" key={"div2Box" + j}>{answerOption.text}</div>
                                </div>
                            </label>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    );
}
export default LayoutBox;
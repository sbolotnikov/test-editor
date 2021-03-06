import React, { Fragment, useEffect } from 'react';
import Textfit from 'react-textfit';
import "./style.css";
const LayoutBox = props => {
// component creates layout called Box and display current question in style of this layout

    useEffect(() => {
        // drawing the selected options of anwers inputed by user
        for (let i = 0; i < props.answers.length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }
    },[props.answers]);
    function checkingMulti(e) {
        // on Change sending the new result back to parent
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
            <div id='questionContainerBox' style={{ opacity: props.vis}}>
                <section className="questionSection">
                    {/* using the Textfit to make entered text fit into the provided space */}
                    <Textfit max={256} mode='multi'
                        min={12}
                        style={{
                            color:'white',
                            minHeight: "90%",
                            maxHeight: "90%",
                            minWidth: "90%",
                            maxWidth: "90%",
                            lineHeight: 1,
                            margin:'auto',
                            textAlign:"center",
                            textShadow: '1px 1px 2px black'
                        }}>{props.question}</Textfit>
              
                </section>
                <section className="answerSection" style={{ display: 'flex', justifyContent: 'space-between',alignContent:'center', flexWrap: 'wrap', width: '99%', overflow:'visible' }}>
                    {props.answers.map((answerOption, j) => {
                        return (
                            <label className="option_item" key={"labelBox" + j} style={{width:'49%',minHeight:'22%', maxHeight: '200px', maxWidth:'200px'}}>
                                <input type="checkbox" className="checkOut" key={"inputBox" + j} id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                                <div className="option_inner" style={{ backgroundImage: `url(${answerOption.img})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
                                    <div className="tickmark" key={"divBox" + j}> </div>
                                    <div className="name" key={"div2Box" + j} style={{width:"13ch"}}>{answerOption.text}</div>
                                </div>
                            </label>
                        )
                    })}
                </section>
            </div>
        </Fragment>
    );
}
export default LayoutBox;
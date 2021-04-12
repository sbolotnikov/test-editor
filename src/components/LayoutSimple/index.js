import React, { useEffect, useState } from 'react';
import Textfit from 'react-textfit';
import ZoomImage from '../ZoomImage';
import "./style.css";
function LayoutSimple(props) {
    const [revealModal, setRevealModal] = useState(false);
    useEffect(() => {
        for (let i = 0; i < props.answers.length; i++) {
            document.querySelector("#answer_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#answer_" + i).checked = true;
        }
        
    }, [props.answers]);
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
        <div id='questionContainerSimple' style={{ opacity: props.vis}}>



            {revealModal && <ZoomImage img={props.info.img} closeModal={(e)=>{setRevealModal(false)}} />}
            <section className="questionSection" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', width: '98%', overflow: 'hidden' }}>
                <div style={{width:'100%',display: 'flex',justifyContent:'center', alignItems: 'center', height: window.innerWidth < 700 ? '30%' : '70%' }}>
                    <img src={props.info.img} style={{ height:'100%', alignSelf:'center'}} alt={props.info.img} onClick={(e)=>{setRevealModal(true)}} />
                </div>
                <div style={{width:'100%', height: window.innerWidth < 700 ? '70%' : '30%' }}>
                    <Textfit max={256} mode='multi'
                        min={12}
                        style={{
                            color: 'white',
                            minHeight: "90%",
                            maxHeight: "90%",
                            minWidth: "90%",
                            maxWidth: "90%",
                            lineHeight: 1,
                            margin: 'auto',
                            textAlign: "center",
                            textShadow: '1px 1px 2px black'
                        }}>{props.question}</Textfit>
                </div>
            </section>
            <section className="answerSection" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', width: '98%', overflow: 'visible' }}>
                {props.answers.map((answerOption, j) => {
                    return (
                        <label className="option_simple" key={"labelSimple" + j} style={{ height: `${93 / props.answers.length}%` }}>
                            <input type="checkbox" className="checkOut" key={"inputSimple" + j} id={"answer_" + j} value={j} onChange={e => checkingMulti(e)} />
                            <div className="option_inner" key={"divSimple" + j}>
                                <Textfit className="name" key={"spanSimple" + j} max={256} mode='multi'
                                    min={10}
                                    style={{
                                        minHeight: "90%",
                                        maxHeight: "90%",
                                        minWidth: "90%",
                                        maxWidth: "90%",
                                        lineHeight: 1,
                                        textAlign: "center",
                                        textShadow: '1px 1px 2px black'
                                    }}>{answerOption.text}</Textfit>
                            </div>
                        </label>
                    )
                })}
            </section>
        </div>
    );
}
export default LayoutSimple;
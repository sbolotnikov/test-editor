import React, { Fragment, useState, useEffect } from 'react';
import GetAnswers from './GetAnswers.js';
import Cloudinary from './Cloudinary';
function GetQuestion(props) {
    var questionObj = {}

    const [rights, setRights] = useState([]);
    const [wrongs, setWrongs] = useState([]);
    const getImgUrl = (url) => {
        document.querySelector("#mainImg").value = url;
        props.onChange({ "mainImg": url })
    }
    // list available layouts
    var layouts = ["simple", "box"];
    useEffect(() => {
        document.querySelector("#question").value = props.q.question;
        document.querySelector("#mainImg").value = props.q.info.img;
        document.querySelector("#positionsCount").value = props.q.info.positions;
        document.querySelector("#correctCount").value = props.q.info.correct;
        document.querySelector("#layout1").value = props.q.info.layout;
        setRights(props.q.rights);
        setWrongs(props.q.wrongs);

    }, [props.q]);
    function handleReturnData(t, corr) {
        if (corr) {
            questionObj.rights = t;
            // setRights(localChoices);
        } else {
            questionObj.wrongs = t;
            //  setWrongs(localChoices);
        }
        props.onChange(questionObj)
    }
    function handleCopyData(n, corr) {
        (corr) ? questionObj = props.q.rights[n] : questionObj = props.q.wrongs[n];
        localStorage.setItem('answerCopy', JSON.stringify(questionObj));
    }
    function newRecord(e, corr) {
        if (corr) {
            questionObj = props.q.rights;
            questionObj.push({ text: e.text, img: e.img, choice: true });
        } else {
            questionObj = props.q.wrongs;
            questionObj.push({ text: e.text, img: e.img, choice: false });
        }
        props.onChange(questionObj)
    }


    function delRecord(n, corr) {
        if (corr) {
            questionObj = props.q.rights;
            questionObj.splice(n, 1);
        } else {
            questionObj = props.q.wrongs;
            questionObj.splice(n, 1);
        }
        props.onChange(questionObj)
    }

    return (
        <Fragment>
            <label className='headerStyle'>Enter your question
            <textarea id="question" onChange={e => { props.onChange({ "question": e.target.value }) }} />
            </label>
            <br/>
            <label className='headerStyle'>Add your question main picture link (if you have one)
            <input id="mainImg" onChange={e => { props.onChange({ "mainImg": e.target.value }) }} />
            </label>
            <Cloudinary getImgUrl={getImgUrl} />
            <label className='headerStyle'>Choose question layout
                <select id="layout1" onChange={e => { props.onChange({ "layout1": e.target.value }) }} >
                    {layouts.map((option, i) => {
                        return (
                            <option value={option} key={'layout_option' + i}>{option}</option>
                        )
                    }
                    )}
                </select>
             </label>
            <div className="containerGrid">
                <section className='panel1'>
                    <label>
                        <input id="positionsCount" type="number" min={0} max={rights.length + wrongs.length}  onChange={e => { props.onChange({ "positionsCount": e.target.value }) }} />            
                        How many positions would be displayed?(Maximum should be less then answers options)
                    </label>
                </section>
                <section className='panel2'>
                    <label>
                        <input id="correctCount" type="number" min={0} max={rights.length}  onChange={e => { props.onChange({ "correctCount": e.target.value }) }} />           
                        How many correct options should be selected?(Maximum should be less then correct answers options)
                    </label>
                </section>
            </div>
            <div className="containerGrid">
                <section className='panel2'>
                    <label className='headerStyle' style={{color:'green'}} ><strong>Enter text of the correct answers:</strong></label>
                    {rights && <GetAnswers answers={rights} correct={true} onDelete={(n) => delRecord(n, 1)} onNew={(e) => newRecord(e, 1)} onChange={(t) => handleReturnData(t, 1)} onCopy={(t) => handleCopyData(t, 1)} />}
                </section>
                <section className='panel1'>
                    <label className='headerStyle' style={{ color:'red'}} ><strong>Enter text of the wrong answers:</strong></label>
                    {wrongs && <GetAnswers answers={wrongs} correct={false} onDelete={(n) => delRecord(n, 0)} onNew={(e) => newRecord(e, 0)} onChange={(t) => handleReturnData(t, 0)} onCopy={(t) => handleCopyData(t, 0)} />}
                </section>
            </div>
        </Fragment >
    )
}
export default GetQuestion;
import React, { useEffect, useState } from 'react';
import GetText from './GetText.js';

function GetAnswers(props) {
    function handleNewText() {
        let emptyNew = { text: '', img: '', choice: props.correct };
        props.onNew(emptyNew);
    }
    function handlePasteText(){
        let pasteItem=JSON.parse(localStorage.getItem('answerCopy'));
        if (pasteItem===null) return
        pasteItem.choice=props.correct;
        props.onNew(pasteItem);
    }
    function handleChangeText(t) {
        let localArr = props.answers;
        if ((t.text === '') && (t.img === '')) {
            localArr.splice(t.num, 1);
        } else {
            let answerRenew = { text: t.text, img: t.img, choice: props.correct }
            localArr.splice(t.num, 1, answerRenew)
        }
        props.onChange(localArr);
    }
    function handleDelete(e) {
        props.onDelete(e.target.value)
    }
    function handleCopy(e){
        props.onCopy(e.target.value)
    }
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        setAnswers(props.answers);
    }, [props.answers]);
    return (
        <div style={{display:"flex", alignItems:"start", justifyContent:"start"}}>
            <div style={{width:'85%' }}>
                <div>
                    {answers && answers.map((answerOption, j) => {
                        return (
                            <div key={props.correct?"right"+j:"wrong"+j} style={{ position: 'relative', margin: '5px' }}>
                                <button className="testNav" style={{fontSize:'max(1.2vw,12px)', float:"right",margin:0 }} key={props.correct?"right_eraseBtn_":"wrong_eraseBtn_" + j} value={j} onClick={e => handleDelete(e)}><img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" style={{width:'max(1.2vw,12px)',height:'max(1.2vw,12px)'}}/></button>
                                <button className="testNav" style={{fontSize:'max(1.2vw,12px)', float:"right", margin:0 }}  key={props.correct?"right_copyBtn_":"wrong_copyBtn_" + j} value={j} onClick={e => handleCopy(e)}>&#128209;Copy</button>
                                <GetText key={props.correct?"right_text"+j:"wrong_text"+j} cor={props.correct?"right":"wrong"} num={j} answer={answerOption} onDelete={e => e.target.value} onNew={e => e.target.value} onChange={(t) => handleChangeText(t)} />         
                            </div>
                        )
                    }
                    )}
                    <button className="testNav" style={{fontSize:'max(1.2vw,12px)', margin:0 }} onClick={e => { handlePasteText() }}>&#128203;Paste</button>
                    <button className="testNav" style={{fontSize:'max(1.2vw,12px)', margin:0 }} onClick={e => { handleNewText() }}>New &#10133;</button>
                </div>
            </div>
        </div>
    )
}
export default GetAnswers;
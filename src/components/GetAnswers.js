import React, { useEffect, useState } from 'react';
import GetText from './GetText.js';
import { useCopy } from "../contexts/CopyContext";
import { Button } from 'react-bootstrap';

function GetAnswers(props) {
    const { pasteCopy } = useCopy();
    function handleNewText() {
        let emptyNew = { text: '', img: '', choice: props.correct };
        props.onNew(emptyNew);
    }
    function handlePasteText(){
        let pasteItem=pasteCopy();
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
        <div className="d-flex align-items-start justify-content-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div style={{ width: '100%' }}>
                    {answers && answers.map((answerOption, j) => {
                        return (
                            <div key={props.correct?"right"+j:"wrong"+j} style={{ position: 'relative', margin: '5px' }}>
                                <Button style={{ float:"right" }} variant='danger' key={props.correct?"right_eraseBtn_":"wrong_eraseBtn_" + j} value={j} onClick={e => handleDelete(e)}>x</Button>
                                <Button style={{ float:"right" }} variant='info' key={props.correct?"right_copyBtn_":"wrong_copyBtn_" + j} value={j} onClick={e => handleCopy(e)}>Copy</Button>
                                <GetText key={props.correct?"right_text"+j:"wrong_text"+j} cor={props.correct?"right":"wrong"} num={j} answer={answerOption} onDelete={e => e.target.value} onNew={e => e.target.value} onChange={(t) => handleChangeText(t)} />
                                
                            </div>
                        )
                    }
                    )}
                    <Button variant='info' onClick={e => { handlePasteText() }}>Paste</Button>
                    <Button variant='success' onClick={e => { handleNewText() }}>New</Button>
                    {/* <LayoutBox type={1} vis={1} question={'props.question'} checkedMarks={[1]} answers={[{ 'text': '6.96 miles/sec','img': '',  'choice': true }]} /> */}
                </div>
            </div>
        </div>
    )
}
export default GetAnswers;
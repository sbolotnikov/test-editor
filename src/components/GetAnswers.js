import React, { useEffect, useState } from 'react';
import GetText from './GetText.js';
import { Button, Container } from 'react-bootstrap';

function GetAnswers(props) {
    function handleNewText() {
        let emptyNew = { text: '', img: '', choice: props.correct };
        props.onNew(emptyNew);

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
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        setAnswers(props.answers);
    }, [props.answers]);
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div style={{ width: '100%' }}>
                    {answers && answers.map((answerOption, j) => {
                        return (
                            <div style={{ position: 'relative', margin: '5px' }}>
                                <GetText num={j} answer={answerOption} onDelete={e => e.target.value} onNew={e => e.target.value} onChange={(t) => handleChangeText(t)} />
                                <Button style={{ position: 'absolute', bottom: 0, right: 0 }} variant='danger' id={"eraseBtn_" + j} value={j} onClick={e => handleDelete(e)}>x</Button>
                            </div>
                        )
                    }
                    )}
                    <Button variant='success' onClick={e => { handleNewText() }}>New</Button>
                    {/* <LayoutBox type={1} vis={1} question={'props.question'} checkedMarks={[1]} answers={[{ 'text': '6.96 miles/sec','img': '',  'choice': true }]} /> */}
                </div>
            </div>
        </Container>
    )
}
export default GetAnswers;
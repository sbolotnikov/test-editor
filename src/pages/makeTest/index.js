import React, { Fragment, useState } from 'react';
import GetQuestion from '../../components/GetQuestion.js';
import TestCreateNav from '../../components/testCreateNav';
import "./style.css";
import { Row, Col, Button } from 'react-bootstrap';
var demoArr = [];
var emptyQ = {
    question: '',
    rights: [{ text: '', img: '', choice: true }],
    wrongs: [{ text: '', img: '', choice: false }],
    info: {
        positions: 2,
        correct: 1,
        layout: '',
        img: ''
    }
}
function ToRenderEverything() {
    const [testName, setTestName] = useState('');
    const [displayQ, setDisplayQ] = useState(0);
    const [testBackground, setTestBackground] = useState('');
    const [testHH, setTestHH] = useState(0);
    const [testMM, setTestMM] = useState(0);
    const [testSS, setTestSS] = useState(0);
    const [testArray, setTestArray] = useState([emptyQ]);
    function handleUpdateQuestion(q) {
        if (q > 0) { setDisplayQ(q - 1) }
        else {
            setDisplayQ(q);
            //   setVisible(1);
        }
        console.log(displayQ);
        console.log(testArray)
    }
    function handleReturnQuestion(t) {
        let arr = [...testArray];
        if (Object.getOwnPropertyNames(t)[0] === "question") arr[displayQ].question = t.question;
        if (Object.getOwnPropertyNames(t)[0] === "mainImg") arr[displayQ].info.img = t.mainImg;
        if (Object.getOwnPropertyNames(t)[0] === "layout1") arr[displayQ].info.layout = t.layout1;
        if (Object.getOwnPropertyNames(t)[0] === "positionsCount") arr[displayQ].info.positions = t.positionsCount;
        if (Object.getOwnPropertyNames(t)[0] === "correctCount") arr[displayQ].info.correct = t.correctCount;
        if (Object.getOwnPropertyNames(t)[0] === "rights") arr[displayQ].rights = t.rights;
        if (Object.getOwnPropertyNames(t)[0] === "wrongs") arr[displayQ].wrongs = t.wrongs;
        setTestArray(arr);
        console.log(arr);
    }
    function handleAdd(e) {
        // e.preventDefault()
        setTestArray(oldArray => [...oldArray, {
            question: '',
            rights: [{ text: '', img: '', choice: true }],
            wrongs: [{ text: '', img: '', choice: false }],
            info: {
                positions: 2,
                correct: 1,
                layout: '',
                img: ''
            }
        }]);

        setDisplayQ(testArray.length);
        console.log(displayQ);
    }
    function handleDelete() {
        setTestArray(testArray.filter(item => testArray.indexOf(item) !== displayQ));

    }

    function readSingleFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                let newTest = JSON.parse(e.target.result);
                setTestArray(newTest.test);
                document.querySelector("#testName").value = newTest.main.name;
                setTestName(newTest.main.name);
                document.querySelector("#background").value = newTest.main.background;
                setTestBackground(newTest.main.background);
                document.querySelector("#hh").value = newTest.main.hours;
                setTestHH(newTest.main.hours);
                document.querySelector("#mm").value = newTest.main.minutes;
                setTestMM(newTest.main.minutes);
                document.querySelector("#ss").value = newTest.main.seconds;
                setTestSS(newTest.main.seconds);
            }
            r.readAsText(f);

        } else {
            alert("Failed to load file");
        }
    }

    function download(e) {
        //   e.preventDefault();
        let text = JSON.stringify({
            main: {
                name: testName,
                background: testBackground,
                hours: testHH,
                minutes: testMM,
                seconds: testSS
            },
            test: testArray
        });
        console.log(text)
        let filename = "test.txt";
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Start file download.


    return (
        <Fragment>
            <div className="container" style={{ maxWidth: "1440px", overflow: "hidden" }}>
                <main className="container">
                    <label className='headerStyle'> Load saved locally test
                <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />
                    </label>
                    <Button id="filedownload" onClick={e => download(e)}>Save</Button>
                    <label className='headerStyle' style={{ width: '100%' }} >Enter your test Name
                    <input id="testName" style={{ width: '100%' }} onChange={e => setTestName(e.target.value)} />
                    </label>
                    <h4 className='headerStyle' style={{ width: '40%' }} >Add test background image link</h4>
                    <input id="background" style={{ width: '59%' }} onChange={e => setTestBackground(e.target.value)} />
                    <h4 className='headerStyle' style={{ width: '100%' }} >Enter Time limits (if there are no time limit enter 0 0 0) :
                    <input id="hh" type="number" min={0} max={10} size={2} style={{ width: '9%' }} onChange={e => setTestHH(e.target.value)} /> hh
                    <input id="mm" type="number" min={0} max={59} size={2} style={{ width: '9%' }} onChange={e => setTestMM(e.target.value)} /> mm
                    <input id="ss" type="number" min={0} max={59} size={2} style={{ width: '9%' }} onChange={e => setTestSS(e.target.value)} /> ss
                    </h4>
                    <TestCreateNav qNumber={testArray.length ? testArray.length : 0} onNew={(e) => handleAdd(e)} onDel={(t) => { handleDelete(t) }} onChange={(q) => { handleUpdateQuestion(q) }} />

                    {testArray[displayQ] &&
                        <GetQuestion q={testArray[displayQ]} background={testBackground} onChange={(t) => handleReturnQuestion(t)} />
                    }
                    {/* {correctAnswersArray && <GetAnswers answers={correctAnswersArray} correct={true} onDelete={(n) => delRecord(n, 1)} onNew={(e) => newRecord(e, 1)} onChange={(t) => handleReturnData(t, 1)} />} */}

                </main>

            </div>
        </Fragment >
    )
}
export default ToRenderEverything;

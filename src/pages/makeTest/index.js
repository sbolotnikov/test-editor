import React, {  useState } from 'react';
import GetQuestion from '../../components/GetQuestion.js';
import TestCreateNav from '../../components/testCreateNav';
import { useAuth } from "../../contexts/AuthContext"
import firebase from "../../firebase";
import "./style.css";
import { Button } from 'react-bootstrap';
import GetTests from '../../components/getTests.js';
import AlertMenu from '../../components/alertMenu';
import Cloudinary from '../../components/Cloudinary';
import {Redirect } from "react-router-dom"
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
    const { currentUser } = useAuth()
    const [testName, setTestName] = useState('');
    const [testAuthor, setTestAuthor] = useState({ authorId: "", name: "", testId: "" });
    const [visibility, setVisibility] = useState('');
    const [editability, setEditability] = useState('');
    const [displayQ, setDisplayQ] = useState(0);
    const [testBackground, setTestBackground] = useState('');
    const [testHH, setTestHH] = useState(0);
    const [testMM, setTestMM] = useState(0);
    const [testSS, setTestSS] = useState(0);
    // const [toCreate, setToCreate] = useState(false);
    
    const [newPressed, setNewPressed]=useState(false);
    const [recordWarning, setRecordWarning]=useState('')
    const [testArray, setTestArray] = useState([emptyQ]);
    // if (toCreate===true){return <Redirect to="/create" />};
    const db = firebase.firestore();
    const onReturn = (decision1) => {
        setNewPressed(false);
        if (decision1==="Proceed"){
            reloadNeeded()
        }
    }
    const reloadNeeded=(a)=>{
        // history.push("/test-editor/create/")
        window.location.reload();
        // setToCreate(true);
    }
    const getImgUrl = (url) => {
        document.querySelector("#background").value = url;
        setTestBackground(url);
    }
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
    function getTestfromDB(n) {
        console.log(n)
        let newTest = n[0];
        setTestArray(newTest.test);
        setTestAuthor({ authorId: newTest.main.author, name: newTest.main.authorName, testId: newTest.id })
        document.querySelector("#testName").value = newTest.main.name;
        setTestName(newTest.main.name);
        document.querySelector("#visibility").value = newTest.main.visibility;
        setVisibility(newTest.main.visibility);
        document.querySelector("#editability").value = newTest.main.editability;
        setEditability(newTest.main.editability);
        document.querySelector("#background").value = newTest.main.background;
        setTestBackground(newTest.main.background);
        document.querySelector("#hh").value = newTest.main.hours;
        setTestHH(newTest.main.hours);
        document.querySelector("#mm").value = newTest.main.minutes;
        setTestMM(newTest.main.minutes);
        document.querySelector("#ss").value = newTest.main.seconds;
        setTestSS(newTest.main.seconds);

    }
    function readSingleFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                let newTest = JSON.parse(e.target.result);
                console.log(newTest)
                setTestArray(newTest.test);
                setTestAuthor({ authorId: "", name: "", testId: "" });
                document.querySelector("#testName").value = newTest.main.name;
                setTestName(newTest.main.name);
                document.querySelector("#visibility").value = newTest.main.visibility;
                setVisibility(newTest.main.visibility);
                document.querySelector("#editability").value = newTest.main.editability;
                setEditability(newTest.main.editability);
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
    function upload(e) {
        //   e.preventDefault();
        let text = {
            main: {
                author: currentUser.uid,
                authorName: currentUser.displayName,
                name: testName,
                visibility: visibility,
                editability: editability,
                background: testBackground,
                hours: testHH,
                minutes: testMM,
                seconds: testSS
            },
            test: testArray
        };
        console.log(text)

        db.collection("tests").add(text)
        .then(result=>{
            console.log("file created in DB");
            reloadNeeded()
        })
        .catch(e=>{console.log("no connectionto DB");})
    }
    function download(e) {
        //   e.preventDefault();
        let text = JSON.stringify({
            main: {
                author: currentUser.uid,
                authorName: currentUser.displayName,
                name: testName,
                visibility: visibility,
                editability: editability,
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
    function update(e) {
        let text = {
            main: {
                author: testAuthor.authorId,
                authorName: testAuthor.name,
                name: testName,
                visibility: visibility,
                editability: editability,
                background: testBackground,
                hours: testHH,
                minutes: testMM,
                seconds: testSS
            },
            test: testArray
        };
        db.collection('tests').doc(testAuthor.testId).set(text)
        .then(result=>{
            console.log("file updated");
            reloadNeeded();
        })
        .catch(e=>{console.log("file fail to updated");})
    }
    function  startNewTest(e){
        if (testName>""){
            setNewPressed(true);
            setRecordWarning(`Did you safe your changes? Your present test ${testName} by ${(testAuthor.name>"")? testAuthor.name: "You"} will be lost. Proceed?`)
        }
    }
    return (
            <div style={{ maxWidth: "1440px", overflow: "hidden" }}>

                <label className='headerStyle'> Load locally saved tests
                <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />
                </label>
                <Button variant='success' onClick={e => startNewTest(e)}>New</Button>
                <Button id="filedownload" onClick={e => download(e)}>Download</Button>
                <Button id="fileUpload" onClick={e => upload(e)}>Upload as New</Button>
               {testAuthor.testId>"" && <Button id="fileUpload" onClick={e => update(e)}>Update test in DB</Button>}
                <GetTests user={currentUser.uid} reloadNeeded={reloadNeeded} onChange={n => getTestfromDB(n)} />
                {newPressed && <AlertMenu onReturn={onReturn} style={{zIndex:550}} styling={{ 
                left:"10vw",
                top: "10vh",
                variantHead:"warning",
                heading:"Warning",
                text:recordWarning,
                color1:"danger",
                button1:"Proceed",
                color2:"secondary",
                button2:"Cancel"
            }}/>}
                <label className='headerStyle' style={{ width: '100%' }} >Enter your test Name
                    <input id="testName" style={{ width: '100%' }} onChange={e => setTestName(e.target.value)} />
                </label>
                <label className='headerStyle' style={{ width: '43%' }} >Is this test Private or Public?
                    <select id="visibility" type="" style={{ width: '50%', float: 'right' }} onChange={e => setVisibility(e.target.value)} >
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </label>
                <label className='headerStyle' style={{ width: '55%' }} >Would you allow others to edit content of test?
                    <select id="editability" style={{ width: '30%', float: 'right' }} onChange={e => setEditability(e.target.value)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <h4 className='headerStyle' style={{ width: '40%' }} >Add test background image link</h4>
                <input id="background" style={{ width: '59%' }} onChange={e => setTestBackground(e.target.value)} />
                <Cloudinary style={{ width: "200px", objectFit: "cover", margin: "10px" }} getImgUrl={getImgUrl} />
                <h4 className='headerStyle' style={{ width: '100%' }} >Enter Time limits (if there are no time limit enter 0 0 0) :
                    <input id="hh" type="number" min={0} max={10} size={2} style={{ width: '9%' }} onChange={e => setTestHH(e.target.value)} /> hh
                    <input id="mm" type="number" min={0} max={59} size={2} style={{ width: '9%' }} onChange={e => setTestMM(e.target.value)} /> mm
                    <input id="ss" type="number" min={0} max={59} size={2} style={{ width: '9%' }} onChange={e => setTestSS(e.target.value)} /> ss
                    </h4>
                <TestCreateNav qNumber={testArray.length ? testArray.length : 0} onNew={(e) => handleAdd(e)} onDel={(t) => { handleDelete(t) }} onChange={(q) => { handleUpdateQuestion(q) }} />

                {testArray[displayQ] &&
                    <GetQuestion q={testArray[displayQ]} background={testBackground} onChange={(t) => handleReturnQuestion(t)} />
                }

            </div>
    )
}
export default ToRenderEverything;

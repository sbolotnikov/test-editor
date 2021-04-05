import React, { useState, useEffect } from 'react';
import GetQuestion from '../../components/GetQuestion.js';
import TestCreateNav from '../../components/testCreateNav';
import { useAuth } from "../../contexts/AuthContext";
import firebase from "../../firebase";
import "./style.css";
import GetTests from '../../components/getTests.js';
import GetGradient from '../../components/getGradient.js';
import AlertMenu from '../../components/alertMenu';
import Cloudinary from '../../components/Cloudinary';
import QuestionDisplay from '../../components/QuestionDisplay';
import CustomSelect from '../../components/CustomSelect';

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
    var defOptionArray = [];
    const { currentUser } = useAuth();
    const [testName, setTestName] = useState('');
    const [testAuthor, setTestAuthor] = useState({ authorId: "", name: "", testId: "" });
    const [visibility, setVisibility] = useState('');
    const [editability, setEditability] = useState('');
    const [displayQ, setDisplayQ] = useState(0);
    const [testBackground, setTestBackground] = useState('');
    const [testGradient, setTestGradient] = useState('');
    const [testHH, setTestHH] = useState(0);
    const [testMM, setTestMM] = useState(0);
    const [testSS, setTestSS] = useState(0);
    const [show, setShow] = useState(false);
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({})
    const [testArray, setTestArray] = useState([emptyQ]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addTestGradientVisible, setAddTestGradientVisible] = useState(false);
    const [addBackgroundVisible, setAddBackgroundVisible] = useState(false);
    const db = firebase.firestore();
    const fetchCategories = async () => {

        const data = await db.collection("categories").get();
        let arrTemp = data.docs.map(doc => ({ ...doc.data() }));
        arrTemp.sort(function (a, b) {
            var nameA = a.label.toUpperCase(); // ignore upper and lowercase
            var nameB = b.label.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        setCategories(arrTemp);
    };
    const onReturn = (decision1, inputValue) => {
        if (decision1 === "Proceed") {
            setRevealAlert(false);
            reloadNeeded()
        }
        if (decision1 === "Update") {
            setRevealAlert(false);
            let text = {
                main: {
                    author: testAuthor.authorId,
                    authorName: testAuthor.name,
                    categories: selectedOption,
                    name: testName,
                    visibility: visibility,
                    editability: editability,
                    background: testBackground,
                    gradient: testGradient,
                    hours: testHH,
                    minutes: testMM,
                    seconds: testSS
                },
                test: testArray
            };
            localStorage.setItem('testCopy', JSON.stringify(text));
            db.collection('tests').doc(testAuthor.testId).set(text)
                .then(result => {
                    console.log("file updated");
                    reloadNeeded();
                })
                .catch(e => { console.log("file fail to updated"); })
        }
        if (decision1 === "Add") {
            console.log(inputValue)
            if ((categories.map(function (x) { return x.value; }).indexOf(inputValue) === -1) && (inputValue.length > 5)) {
                let newItem = { label: inputValue, value: inputValue }
                db.collection('categories').add(newItem)
                    .then(result => {
                        console.log("categories updated");
                        setCategories([...categories, newItem]);
                    })
                    .catch(e => { console.log("categories fail to updated"); })
                setRevealAlert(false);
            } else {
                setAlertStyle({
                    left: "0",
                    top: "0",
                    variantHead: "danger",
                    heading: (inputValue.length > 5) ? "Already Exist" : "Enter more symbols",
                    text: `Please enter new unique Category name more then 5 symbols long and click Add`,
                    inputField: 'true',
                    inputValue: inputValue,
                    color1: "danger",
                    button1: "Add",
                    color2: "secondary",
                    button2: "Cancel"
                });
            }
        }
        if (decision1 === "Cancel") {
            setRevealAlert(false);
        }
    }
    const reloadNeeded = (a) => {
        window.location.reload();
    }
    const getImgUrl = (url) => {
        document.querySelector("#background").value = url;
        setTestBackground(url);
    }
    const getGradientCSS = (n) => {
        document.querySelector("#backgroundGradient").value = n;
        setTestGradient(n)
    }
    function handleUpdateQuestion(q) {
        if (q > 0) { setDisplayQ(q - 1) }
        else {
            setDisplayQ(q);
        }
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
    }
    function handleCopyQuestion(e) {
        localStorage.setItem('questionCopy', JSON.stringify(testArray[displayQ]));
    }
    function handleInsertQuestion(e) {
        let arr = [];
        let questCopy = JSON.parse(localStorage.getItem('questionCopy'));
        if (questCopy === null) return
        for (let i = 0; i < testArray.length; i++) {
            if (i === displayQ + 1) arr.push(questCopy)
            arr.push(testArray[i])
        }
        if (displayQ === testArray.length - 1) arr.push(questCopy)
        setTestArray(arr)
        setDisplayQ(displayQ + 1)
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
    function handleShow() {
        let arr = testArray[displayQ].rights.slice(0, testArray[displayQ].info.correct);
        demoArr = testArray[displayQ].wrongs.slice(0, testArray[displayQ].info.positions - testArray[displayQ].info.correct);
        for (let i = 0; i < arr.length; i++) {
            demoArr.push(arr[i]);
        }
        console.log(demoArr);
        show ? setShow(false) : setShow(true)
    }
    function handleDelete() {

        if (displayQ === testArray.length - 1) setDisplayQ(displayQ - 1)
        setTestArray(testArray.filter(item => testArray.indexOf(item) !== displayQ));
    }
    function handleMove(t) {
        if (t[0] !== t[1]) {
            let arr = [];
            let record1 = testArray[t[0]];
            for (let i = 0; i < testArray.length; i++) {
                if (i === t[1]) {
                    if (t[1] > t[0]) {
                        arr.push(testArray[i]);
                        arr.push(record1);
                    } else {
                        arr.push(record1);
                        arr.push(testArray[i]);
                    }
                }
                else if (i !== t[0]) arr.push(testArray[i])
            }
            setTestArray(arr);
            setDisplayQ(t[1])
            console.log(record1, arr)
        }
    }
    function getTestfromDB(n) {
        console.log(n)
        let newTest = n;
        setTestArray(newTest.test);
        setDisplayQ(0);
        document.querySelector("#questionPage").value = 1;
        setTestAuthor({ authorId: newTest.main.author, name: newTest.main.authorName, testId: newTest.id });
        defOptionArray = newTest.main.categories
        setSelectedOption(defOptionArray);
        document.querySelector("#testName").value = newTest.main.name;
        setTestName(newTest.main.name);
        document.querySelector("#visibility").value = newTest.main.visibility;
        setVisibility(newTest.main.visibility);
        document.querySelector("#editability").value = newTest.main.editability;
        setEditability(newTest.main.editability);
        document.querySelector("#background").value = newTest.main.background;
        setTestBackground(newTest.main.background);
        document.querySelector("#backgroundGradient").value = newTest.main.gradient;
        setTestGradient(newTest.main.gradient);
        document.querySelector("#hh").value = newTest.main.hours;
        setTestHH(newTest.main.hours);
        document.querySelector("#mm").value = newTest.main.minutes;
        setTestMM(newTest.main.minutes);
        document.querySelector("#ss").value = newTest.main.seconds;
        setTestSS(newTest.main.seconds);
    }
    function upload(e) {
        let text = {
            main: {
                author: currentUser.uid,
                authorName: currentUser.displayName,
                categories: selectedOption,
                name: testName,
                visibility: visibility,
                editability: editability,
                background: testBackground,
                gradient: testGradient,
                hours: testHH,
                minutes: testMM,
                seconds: testSS
            },
            test: testArray
        };
        localStorage.setItem('testCopy', JSON.stringify(text));
        db.collection("tests").add(text)
            .then(result => {
                console.log("file created in DB");
                reloadNeeded()
            })
            .catch(e => { console.log("no connectionto DB"); })
    }
    function download(e) {
        let text = JSON.stringify({
            main: {
                author: currentUser.uid,
                authorName: currentUser.displayName,
                categories: selectedOption,
                name: testName,
                visibility: visibility,
                editability: editability,
                background: testBackground,
                gradient: testGradient,
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
        setRevealAlert(true);
        setAlertStyle({
            variantHead: "warning",
            heading: "Warning",
            text: `You about to overwrite data in the test ${testName} by ${(testAuthor.name > "") ? testAuthor.name : "You"}. Update?`,
            color1: "danger",
            button1: "Update",
            color2: "secondary",
            button2: "Cancel"
        });
    }
    function handleNewCategory(e) {
        setRevealAlert(true);
        setAlertStyle({
            variantHead: "warning",
            heading: "Alert",
            text: `Please enter new unique Category name more then 5 symbols long and click Add`,
            inputField: 'true',
            inputValue: "",
            color1: "danger",
            button1: "Add",
            color2: "secondary",
            button2: "Cancel"
        });
    }
    function startNewTest(e) {
        if (testName > "") {
            setRevealAlert(true);
            setAlertStyle({
                variantHead: "info",
                heading: "Warning",
                text: `Did you safe your changes? Your present changes to the test ${testName} by ${(testAuthor.name > "") ? testAuthor.name : "You"} will be lost. Proceed?`,
                color1: "danger",
                button1: "Proceed",
                color2: "secondary",
                button2: "Cancel"
            });
        }
    }
    const saveReload = (a) => {
        if (a) {
            let text = {
                main: {
                    author: currentUser.uid,
                    authorName: currentUser.displayName,
                    categories: selectedOption,
                    name: testName,
                    visibility: visibility,
                    editability: editability,
                    background: testBackground,
                    gradient: testGradient,
                    hours: testHH,
                    minutes: testMM,
                    seconds: testSS
                },
                test: testArray
            };
            localStorage.setItem('testCopy', JSON.stringify(text));
            reloadNeeded();
        }
    }
    useEffect(() => {
        fetchCategories();
        let pasteItem = JSON.parse(localStorage.getItem('testCopy'));
        if ((pasteItem !== null)) getTestfromDB([pasteItem])
        localStorage.removeItem('testCopy');
    }, []);
    return (
        <div className="makerContainer">
            <GetTests user={currentUser.uid} forPage={'create'} reloadNeeded={reloadNeeded} onLocal={n => { console.log("test loaded") }} onChange={n => getTestfromDB(n)} />
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
            <div className='navContainer' >
                <h3 style={{ width: '100%', textAlign: "center", fontSize: '4vw', color: '#f5d142' }}><strong>Test editing panel</strong></h3>

                <button className="testNav" onClick={e => startNewTest(e)}>New &#10133;</button>
                <button className="testNav" onClick={e => download(e)}>Download &#128187;</button>
                <button className="testNav" onClick={e => upload(e)}>Upload to web &#128228;</button>
                {testAuthor.testId > "" && <button className="testNav" onClick={e => update(e)}>Update on web &#128257;</button>}

            </div>
            <label className='headerStyle' >Enter your test Name
                    <input id="testName"  onChange={e => setTestName(e.target.value)} />
            </label>
            <div className="containerGrid">
                <section className='panel1'>
                    <label >
                    <select id="visibility" onChange={e => setVisibility(e.target.value)} >
                            <option value="Private">Private</option>
                            <option value="Public">Public</option>
                        </select>
                        Is this test Private or Public?
                    </label>
                </section>
                <section className='panel2'>
                    <label >
                    <select id="editability" onChange={e => setEditability(e.target.value)}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        Would you allow others to edit content of test?
                    </label>
                </section>
            </div>
            {selectedOption &&
                <CustomSelect isMulti={true} style={{ width: '300px', menuColor: 'red',marginLeft:'1.5%' }} value={selectedOption} onChange={setSelectedOption} options={categories} label="Choose a test categories" />
            }
            <button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', margin: "1% 0 0 1.5%" }} onClick={e => handleNewCategory(e)}>Add New Category</button>
            <div className="panel2 containerGrid">
            <section className='headerStyle' >Enter time (if there are no time limit enter 0 0 0):</section>
            <section className='panel1 headerStyle' style={{  float:'left' }}>
                    <input id="hh" type="number" min={0} max={10} size={2} style={{ width: '5ch' }} onChange={e => setTestHH(e.target.value)} /> hh
                    <input id="mm" type="number" min={0} max={59} size={2} style={{ width: '5ch' }} onChange={e => setTestMM(e.target.value)} /> mm
                    <input id="ss" type="number" min={0} max={59} size={2} style={{ width: '5ch' }} onChange={e => setTestSS(e.target.value)} /> ss
            </section>
            </div>
            <div className="containerGrid">
                <section className='panel1'>
                    <label >
                        <input type="checkbox" id="checkAddTestBackground" onChange={e => setAddBackgroundVisible(document.querySelector("#checkAddTestBackground").checked)} />           
                        Add/change BACKGROUND to your test
                </label>
                    <div style={{ display: addBackgroundVisible ? "block" : "none", width: '98%' }}>

                        <label className='headerStyle'>Enter test background image link or upload your image from computer
                        <input id="background"  onChange={e => setTestBackground(e.target.value)} />
                        </label>
                        <Cloudinary getImgUrl={getImgUrl} />
                    </div>
                </section>
                <section className='panel2'>
                    <label >
                        <input type="checkbox" id="checkAddTestGradient" onChange={e => setAddTestGradientVisible(document.querySelector("#checkAddTestGradient").checked)} />
                    Add/change background GRADIENT to your test
               </label>
                    <div style={{ display: addTestGradientVisible ? "block" : "none", width: '98%' }}>
                        <label className='headerStyle' >Enter test background gradient CSS here
                        <textarea id="backgroundGradient" onChange={e => setTestGradient(e.target.value)} />
                        </label>
                        <GetGradient reloadNeeded={saveReload} onChange={n => getGradientCSS(n)} />
                    </div>
                </section>
            </div>
            <TestCreateNav qNumber={testArray.length ? testArray.length : 0} onNew={(e) => handleAdd(e)} onDel={(t) => handleDelete(t)} onMove={(t) => handleMove(t)}
                onShow={(e) => handleShow(e)} onChange={(q) => { handleUpdateQuestion(q) }} onCopy={(q) => { handleCopyQuestion(q) }} onPaste={(q) => { handleInsertQuestion(q) }} />
            {show &&
                <div className="modalContainer" >
                    <div className="closeTag" onClick={(e) => setShow(false)}><img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" style={{ width: 'max(1.2vw,12px)', height: 'max(1.2vw,12px)' }} /></div>
                    <QuestionDisplay style={{ pointerEvents: 'none' }} background={testBackground} gradient={testGradient} info={{ positions: testArray[displayQ].info.positions, correct: testArray[displayQ].info.correct, layout: testArray[displayQ].info.layout, img: testArray[displayQ].info.img }} vis={1} question={testArray[displayQ].question} answers={demoArr} checkedMarks={[]} onChange={(ch) => { }} />
                </div>
            }
            {testArray[displayQ] &&
                <GetQuestion q={testArray[displayQ]} onChange={(t) => handleReturnQuestion(t)} />
            }

        </div >
    )
}
export default ToRenderEverything;

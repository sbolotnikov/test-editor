import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import AlertMenu from './alertMenu';
import { useAuth } from "../contexts/AuthContext";
import ChooseCategory from "../components/ChooseCategory";
import { Link } from "react-router-dom";
function GetTests(props) {
    const db = firebase.firestore();
    const { currentUser } = useAuth();
    const [testRecords, setTestsRecords] = useState([]);
    const [testRecordsDisplay, setTestsRecordsDisplay] = useState([]);
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    const [deleteRecId, setDeleteRecId] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesLayout, setCategoriesLayout] = useState([]);
    const [checked, setChecked] = useState([]);
    const [testFromDB, setTestFromDB] = useState({})
    const [checkEditLocalTestVisible, setCheckEditLocalTestVisible] = useState(false);
    const onReturn = (decision1) => {
        setRevealAlert(false);
        if (decision1 === "Delete") {
            db.collection('tests').doc(deleteRecId).delete()
                .then(res => {
                    console.log('deleted');
                    props.reloadNeeded(true);
                })
                .catch(error => {
                    console.log("can not delete a record");
                })
        }
        if (decision1 === "Proceed") {
            props.onChange(testFromDB);
            props.onLocal(false);
        }
    }
    function handleLink(e) {
        let recId = e.target.getAttribute("value");
        console.log(recId)
        setAlertStyle({
            variantHead: "success",
            heading: "Direct link to Test",
            text: `https://sbolotnikov.github.io/test-editor/#/taketest/${recId}`,
            color1: "",
            button1: "",
            color2: "secondary",
            button2: "Cancel"
        });
        setRevealAlert(true)
    }
    function handleDelete(e) {
        let recId = e.target.getAttribute("value")
        setDeleteRecId(recId)
        let elementPos = testRecords.map(function (x) { return x.id; }).indexOf(recId);
        let objFound = testRecords[elementPos];
        setAlertStyle({
            variantHead: "danger",
            heading: "Warning",
            text: `Do you really want to delete \n ${objFound.main.name} \n by  \n ${objFound.main.authorName}`,
            color1: "danger",
            button1: "Delete",
            color2: "secondary",
            button2: "Cancel"
        });
        setRevealAlert(true)
    }
    function handleClick(test) {
        console.log(test.target.getAttribute("value"))
        if (props.forPage === 'create') {
            setAlertStyle({
                variantHead: "danger",
                heading: "Warning",
                text: `Did you safe your changes? Your current changes will be lost. Proceed?`,
                color1: "danger",
                button1: "Proceed",
                color2: "secondary",
                button2: "Cancel"
            });
            setRevealAlert(true);
            setTestFromDB(testRecords.filter(item => item.id === test.target.getAttribute("value"))[0])
        } else { props.onChange(testRecords.filter(item => item.id === test.target.getAttribute("value"))[0]) }
    }
    const fetchData = async () => {
        let arrTemp = [];
        const data = await db.collection("tests").get();
        if (props.forPage === 'create')
            arrTemp = data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => (doc.main.author === props.user) || (doc.main.editability === 'Yes'));
        else
            arrTemp = data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => (doc.main.author === props.user) || (doc.main.visibility === 'Public'));
        arrTemp.sort(function (a, b) {
            var nameA = a.main.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.main.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;

        });
        console.log(arrTemp)
        setTestsRecords(arrTemp);
        setTestsRecordsDisplay(arrTemp);
    };
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
        arrTemp = arrTemp.map(option => { return ({ 'text': option.value, img: process.env.PUBLIC_URL + "/icons/QuizLogo.svg" }) });
        console.log(arrTemp)
        setCategoriesLayout(arrTemp);
    };
    function getChoosenTests(ch) {
        setChecked(ch);
        (ch.length > 0) ? setSelectedOption(categories.filter((n, j) => ch.indexOf(j) > -1)) : setSelectedOption(categories)
    }
    function readSingleFile(evt) {
        var f = evt.target.files[0];
        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                setTestFromDB(JSON.parse(e.target.result));
                if (props.forPage === 'create') {
                    setAlertStyle({
                        variantHead: "danger",
                        heading: "Warning",
                        text: `Did you safe your changes? Your current changes will be lost. Proceed?`,
                        color1: "danger",
                        button1: "Proceed",
                        color2: "secondary",
                        button2: "Cancel"
                    });
                    setRevealAlert(true);
                } else {
                    props.onChange(JSON.parse(e.target.result));
                    props.onLocal(true);
                }
                // setLocalTest(true)
            }
            r.readAsText(f);

        } else {
            alert("Failed to load file");
        }
    }
    useEffect(() => {
        fetchCategories();
        fetchData();
    }, []);
    useEffect(() => {
        let recordSet = testRecords;
        let chosenRec = [];
        console.log(selectedOption);
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                let tempArr = [];
                for (let j = 0; j < recordSet.length; j++) {
                    if (recordSet[j].main.categories.findIndex(function (n) { return n.value === selectedOption[i].value; }) > -1) tempArr.push(recordSet[j])
                }
                chosenRec = chosenRec.concat(tempArr);
            }
        }
        setTestsRecordsDisplay(chosenRec);
    }, [selectedOption])
    return (
        <div style={{ width: '100%', maxWidth: "600px", height: "40vh",
        background: 'radial-gradient(50% 50% at 50% 50%, #EEA2CD 0%, rgba(238, 162, 205, 0.286458) 91.15%, rgba(238, 162, 205, 0) 100%)', margin: '10% 0%' }}>
            {categoriesLayout &&
                <ChooseCategory type={categoriesLayout.length} answers={categoriesLayout} checkedMarks={checked} onChange={(ch) => { getChoosenTests(ch) }} />
            }
            {testRecordsDisplay &&<div style={{ width: '97%', height: '45%', overflow: 'auto', margin: '0' }}>
                 <table style={{width:'100%' }} > 
                    <tr>
                        <th></th>
                        <th style={{ backgroundColor: 'white',borderRadius:'5px'}} >DISCOVER TESTS</th>

                    </tr>

                 {testRecordsDisplay.map((test, j) => {
                    return (
                        <tr key={"divTests" + j} >
                            <td><button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', padding: '4%', margin: '4%' }} key={"linkBtnTests" + j} value={test.id} onClick={e => handleLink(e)}>Link&#128279;</button>
                            {(props.forPage === 'create') &&
                                <button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', padding: '4%', backgroundColor:'#721c24', margin:'4%' }} key={"eraseBtnTests" + j} value={test.id} onClick={e => handleDelete(e)}>Del<img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" style={{ width: 'max(.9vw,10px)', height: 'max(.9vw,10px)' }} /></button>
                            }  
                             </td>
                            <td style={{ backgroundColor: 'white',borderRadius:'5px'}}><div key={"textTests" + j} className='testText' style={{cursor: "pointer", whiteSpace: 'wrap',textAlign:'center',border:0, width: "100%" }} value={test.id} onClick={e => handleClick(e)} >{test.main.name} <span style={{fontStyle: 'oblique', color:'#554FA7'}}>@{test.main.authorName}</span></div></td>
                            <td><div style={{ width:'4%',height:'4vw' }} key={"playBtnTests" + j} value={test.id} onClick={e => handleClick(e)}><img src={ (props.forPage === 'create') ?process.env.PUBLIC_URL +"/icons/EditIcon.svg":process.env.PUBLIC_URL +"/icons/Play.svg"} alt={(props.forPage === 'create') ?"edit":"play"} style={{ width: 'max(4vw,25px)', height: 'max(4vw,25px)' }} /></div></td>                 
                        </tr>
                    )
                }
                )}
            </table>
            </div>}
            {currentUser && <label >
                <input type="checkbox" id="checkEditLocalTest" style={{ margin: '5% 2%' }} onChange={e => setCheckEditLocalTestVisible(document.querySelector("#checkEditLocalTest").checked)} />
              Load local test from your disk
              </label>}
            {currentUser && checkEditLocalTestVisible && <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />}
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
            {/* {(props.forPage === 'test') && <Link to="/taketest/RtqxyubO57LToxbaOzpj">
                <button className="btnNav">
                    Take Demo Test
              </button>
            </Link>} */}
        </div>
    );
}
export default GetTests;
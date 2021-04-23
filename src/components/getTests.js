import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import AlertMenu from './alertMenu';
import { useAuth } from "../contexts/AuthContext";
import ChooseCategory from "../components/ChooseCategory";
import TestPopupInfo from "../components/TestPopupInfo"
import { Link} from "react-router-dom"
function GetTests(props) {
    // get test information, display it, and send it to parent (makeTest or testPage)
    const db = firebase.firestore();
    const { currentUser } = useAuth();
    const [testRecords, setTestsRecords] = useState([]);
    const [testRecordsDisplay, setTestsRecordsDisplay] = useState([]);
    const [revealAlert, setRevealAlert] = useState(false);
    const [revealInfo, setRevealInfo] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    const [deleteRecId, setDeleteRecId] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoriesLayout, setCategoriesLayout] = useState([]);
    const [checked, setChecked] = useState([]);
    const [testFromDB, setTestFromDB] = useState({});
    const [checkEditLocalTestVisible, setCheckEditLocalTestVisible] = useState(false);
    const [testInfo, setTestInfo] = useState({});
    const onReturn = (decision1) => {
        // if Delete button is clicked in makeTest it delete test. If Proceed button clicked it send test to apropreate parent 
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
    function handleDelete(e) {
        // handles delete button click and confirm by revealing the AlertMenu
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
    function handleHover(t) {
        // on hover over test name it gather info about the test and reveal modal like panel with test info 
        let test = testRecords.filter(item => item.id === t.target.getAttribute("value"))[0];
        setTestInfo({
            author: test.main.authorName,
            description: test.main.description,
            name: test.main.name,
            questionsTotal: test.test.length,
            positionY: t.clientY + 5
        })
        setRevealInfo(true);

    }
    function handleClick(test) {
        // on clicking Edit test button it reveals the AlertMenu to confirm that information was saved and set test object 
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
        // gather test information from db, sort it, set state to display it
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
        setTestsRecords(arrTemp);
        setTestsRecordsDisplay(arrTemp);
    };
    const fetchCategories = async () => {
// getting categories information, sorting it and setting it in the state to show it
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
        arrTemp = arrTemp.map(option => { return ({ 'text': option.value, img: "" }) });
        console.log(arrTemp)
        setCategoriesLayout(arrTemp);
    };
    function getChoosenTests(ch) {   
        // set selected categories state to filter test results accordingly to choosen categories                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        setChecked(ch);
        (ch.length > 0) ? setSelectedOption(categories.filter((n, j) => ch.indexOf(j) > -1)) : setSelectedOption(categories)
    }
    function readSingleFile(evt) {
        // getting test information for Editing from local file and confirming that previous info is saved by displaying AlertMenu 
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
        // fetching original data
        fetchCategories();
        fetchData();
    }, []);
    useEffect(() => {
        // fetching data and displaying tests accordingly selected categories
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
        // exclude duplicates in Array  
        chosenRec = chosenRec.filter((c, index) => {
            return chosenRec.map(x => x.id).indexOf(c.id) === index;
        });
        setTestsRecordsDisplay(chosenRec);
    }, [selectedOption])
    return (
        <div style={{ width: '100%', maxWidth: "600px", height: "80%", overflow:'auto', margin: '6em 0 2em 0' }}>
            {revealInfo && <TestPopupInfo test={testInfo} onRes={e => {
                setRevealInfo(false); console.log('close')
            }
            } />}
            {(props.forPage === 'test') && (currentUser) && <button className="testNav" style={{ width: '100%', margin:0}} onClick={e=>{ window.location.assign(process.env.PUBLIC_URL + '/#/create'); }}>
                Create New test
            </button>}
            <p className="testHeaders" > CHOOSE TEST TO {(props.forPage === 'test')? 'TAKE':'MANAGE'}</p>
            {categoriesLayout &&
                <ChooseCategory type={categoriesLayout.length} answers={categoriesLayout} checkedMarks={checked} onChange={(ch) => { getChoosenTests(ch) }} />
            }
            <p className="testHeaders" >DISCOVER TESTS</p>
            {testRecordsDisplay && <div style={{ height: "52%", overflow:'auto', margin: '0' }}>
            
                <table style={{ width: '100%' }} >
                   
                    <tbody>
                        {testRecordsDisplay.map((test, j) => {
                            return (
                                <tr key={"divTests" + j} > 
                                        {(props.forPage === 'create') &&
                                           <td><button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', padding: '0% 4%', backgroundColor: '#721c24', margin: '0 9% 0 0', display: 'flex', flexDirection: "column", alignItems: 'center', width:'100%' }} key={"eraseBtnTests" + j} value={test.id} onClick={e => handleDelete(e)}>Del <img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" style={{ width: 'max(3.5vw,20px)', height: 'max(3.5vw,20px)' }}  /></button></td>
                                        }                                  
                                    <td style={{ backgroundColor: 'white', borderRadius: '5px' }}><div key={"textTests" + j} className='testText' value={test.id} onClick={e => handleHover(e)} style={{ cursor: "pointer", whiteSpace: 'wrap', textAlign: 'center', border: 0, width: "100%" }}>{test.main.name} <span value={test.id} style={{ fontStyle: 'oblique', color: '#554FA7' }}>@{test.main.authorName}</span></div></td>
                                    <td><button className="testNav" style={{ padding: '15% 4%',margin:'0', backgroundColor: 'white', color: '#554FA7', height:'100%', display: 'flex', alignItems: 'center',}} key={"playBtnTests" + j} value={test.id} onClick={e => handleClick(e)}><img src={(props.forPage === 'create') ? process.env.PUBLIC_URL + "/icons/EditIcon.svg" : process.env.PUBLIC_URL + "/icons/Play.svg"} value={test.id} alt={(props.forPage === 'create') ? "Edit" : "Play"} style={{ width: 'max(3.5vw,25px)', height: 'max(3.5vw,25px)' }} /></button></td>
                                    {/* button text if needed <strong>{(props.forPage === 'create') ? 'Edit' : 'Play'}</strong> */}
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>}
            {(props.forPage === 'create') && <label >
                <input type="checkbox" id="checkEditLocalTest" style={{ margin: '5% 2% 0 2%' }} onChange={e => setCheckEditLocalTestVisible(document.querySelector("#checkEditLocalTest").checked)} />
              Load local test from your disk
              
            { checkEditLocalTestVisible && <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />}
            </label>}
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
            {(props.forPage === 'test') && <div className="divStyle">
            Want a demo? <Link className="links" to="/taketest/RtqxyubO57LToxbaOzpj">Take Demo Test</Link>
          </div>}
        </div>
    );
}
export default GetTests;
import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import AlertMenu from './alertMenu';
import CustomSelect from './CustomSelect';
import { useAuth } from "../contexts/AuthContext"
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
        setTestsRecords(arrTemp)
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
    };
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
        console.log(selectedOption);
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                let tempArr = [];
                for (let j = 0; j < recordSet.length; j++) {
                    if (recordSet[j].main.categories.findIndex(function (n) { return n.value === selectedOption[i].value; }) > -1) tempArr.push(recordSet[j])
                }
                recordSet = tempArr;
            }
        }
        setTestsRecordsDisplay(recordSet);
    }, [selectedOption])
    return (
        <div style={{ width: '100%', maxWidth:"600px", height:"100%", maxHeight:"400px", margin:'15% 1%' }}>
            {categories &&
                <CustomSelect isMulti={true} style={{ width: '100%', menuColor: 'red' }} value={selectedOption} onChange={setSelectedOption} options={categories} label="Choose categories" />
            }
            {testRecordsDisplay && testRecordsDisplay.map((test, j) => {
                return (
                    <div key={"divTests" + j} style={{ display: "flex", margin: '5px' }} >
                        <button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', margin: 0, whiteSpace: 'nowrap' }} key={"linkBtnTests" + j} value={test.id} onClick={e => handleLink(e)}>Link &#128279;</button>
                        {(props.forPage === 'create') &&
                            <button className="testNav" style={{ fontSize: 'max(1.2vw,12px)', margin: 0, whiteSpace: 'nowrap' }} key={"eraseBtnTests" + j} value={test.id} onClick={e => handleDelete(e)}>Del <img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" style={{ width: 'max(.9vw,10px)', height: 'max(.9vw,10px)' }} /></button>
                        }
                        <div key={"textTests" + j} style={{ cursor: "pointer", whiteSpace: 'nowrap', width: "auto", overflow: 'hidden', textOverflow: 'ellipsis' }} value={test.id} onClick={e => handleClick(e)} >{test.main.name} by {test.main.authorName} </div>
                    </div>
                )
            }
            )}
            {currentUser && <label >
                <input type="checkbox" id="checkEditLocalTest" style={{marginRight:'1em'}} onChange={e => setCheckEditLocalTestVisible(document.querySelector("#checkEditLocalTest").checked)} />
              Load local test from your disk
              </label>}
            {currentUser && checkEditLocalTestVisible && <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />}
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
        </div>
    );
}
export default GetTests;
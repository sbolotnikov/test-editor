import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { Button } from 'react-bootstrap';
import AlertMenu from './alertMenu';
import CustomSelect from './CustomSelect';
function GetTests(props) {
    const db = firebase.firestore();
    const [testRecords, setTestsRecords] = useState([]);
    const [testRecordsDisplay, setTestsRecordsDisplay] = useState([]);
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    const [deleteRecId, setDeleteRecId] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categories, setCategories] = useState([]);
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
    }
    function handleLink(e) {
        let recId = e.target.getAttribute("value");
        console.log(recId)
        setAlertStyle({
            left: "0",
            top: "0",
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
            left: "0",
            top: "0",
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
        props.onChange(testRecords.filter(item => item.id === test.target.getAttribute("value")));
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
        let arrTemp=data.docs.map(doc => ({ ...doc.data() }));
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
        <div style={{ width: '100%' }}>
            {categories &&
                <CustomSelect isMulti={true} style={{ width: '300px', menuColor: 'red' }} value={selectedOption} onChange={setSelectedOption} options={categories} label="Choose categories" />
            }
            {testRecordsDisplay && testRecordsDisplay.map((test, j) => {
                return (
                    <div key={"divTests"+j} style={{ display: "flex", margin: '5px' }} >
                        <Button key={"linkBtnTests"+j} style={{ fontSize: '12px', whiteSpace: 'nowrap' }} variant='success' value={test.id} onClick={e => handleLink(e)}>Link &#128279;</Button>
                        {(props.forPage === 'create') &&
                            <Button key={"eraseBtnTests"+j} style={{ fontSize: '12px', whiteSpace: 'nowrap' }} variant='danger' value={test.id} onClick={e => handleDelete(e)}>Del &#10008;</Button>
                        }
                        <div key={"textTests"+j} style={{ cursor: "pointer", whiteSpace: 'nowrap', width: "auto", overflow: 'hidden', textOverflow: 'ellipsis' }} value={test.id} onClick={e => handleClick(e)} >{test.main.name} by {test.main.authorName} </div>
                    </div>
                )
            }
            )}
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
        </div>
    );
}
export default GetTests;
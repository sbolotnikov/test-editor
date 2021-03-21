import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { Button, Container } from 'react-bootstrap';
import AlertMenu from './alertMenu';
import CustomSelect from './CustomSelect';
function GetTests(props) {
    const db = firebase.firestore();
    const [testRecords, setTestsRecords] = useState([]);
    const [testRecordsDisplay, setTestsRecordsDisplay] = useState([]);
    const [deletePressed, setDeletePressed] = useState(false);
    const [recordWarning, setRecordWarning] = useState('');
    const [deleteRecId, setDeleteRecId] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categories, setCategories] = useState([]);
    const onReturn = (decision1) => {
        setDeletePressed(false);
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
    function handleLink(e){
        let recId = e.target.previousSibling.getAttribute("value");
        recId=`https://sbolotnikov.github.io/test-editor/#/taketest/${recId}`;
        console.log(recId)
    }
    function handleDelete(e) {
        let recId = e.target.previousSibling.getAttribute("value")
        setDeleteRecId(recId)
        let elementPos = testRecords.map(function (x) { return x.id; }).indexOf(recId);
        let objFound = testRecords[elementPos];
        setRecordWarning(`Do you really want to delete ${objFound.main.name} by ${objFound.main.authorName}?`)
        setDeletePressed(true)
    }
    function handleClick(test) {
        console.log(test.target.getAttribute("value"))
        props.onChange(testRecords.filter(item => item.id === test.target.getAttribute("value")));
    }
    const fetchData = async () => {

        const data = await db.collection("tests").get();
        setTestsRecords(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => (doc.main.author === props.user) || (doc.main.editability === 'Yes')));
    };
    const fetchCategories = async () => {

        const data = await db.collection("categories").get();
        setCategories(data.docs.map(doc => ({ ...doc.data() })));
    };
    useEffect(() => {
        // setCategories([{ value: 'Astronomy', label:"Astronomy" },{ value: "Sergeys' test", label:"Sergeys' test" }])
        fetchCategories();
        fetchData();
        console.log(testRecords);

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
        <Container>
            <div style={{ width: '100%' }}>
                {categories &&
                    <CustomSelect isMulti={true} style={{ width: '300px', menuColor: 'red' }} value={selectedOption} onChange={setSelectedOption} options={categories} label="Choose categories" />
                }
                {/* {newPressed && <AlertMenu onReturn={onReturn} style={{ zIndex: 550 }} styling={{
                left: "10vw",
                top: "10vh",
                variantHead: "success",
                heading: "Your direct link to Test",
                text: recordWarning,
                color1: "success",
                button1: "",
                color2: "secondary",
                button2: "Cancel"
            }} />} */}
                {testRecordsDisplay && testRecordsDisplay.map((test, j) => {
                    return (
                        <div style={{ position: 'relative', margin: '5px' }} >
                            <div style={{ cursor: "pointer" }} value={test.id} onClick={e => handleClick(e)} >{test.main.name} by {test.main.authorName} </div>
                            <Button style={{ position: 'absolute', bottom: 0, right: 0 }} variant='success' id={"linkBtn_" + j} value={j} onClick={e => handleLink(e)}>link</Button>
                            <Button style={{ position: 'absolute', bottom: 0, right: '-40px'}} variant='danger' id={"eraseBtn_" + j} value={j} onClick={e => handleDelete(e)}>x</Button>

                        </div>
                    )
                }
                )}

            </div>
            {deletePressed && <AlertMenu onReturn={onReturn} styling={{
                left: "10vw",
                top: "10vh",
                variantHead: "danger",
                heading: "Warning",
                text: recordWarning,
                color1: "danger",
                button1: "Delete",
                color2: "secondary",
                button2: "Cancel"
            }} />}
        </Container>
    );
}
export default GetTests;
import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { Button, Container } from 'react-bootstrap';
import AlertMenu from './alertMenu'
function GetTests(props) {
    const db = firebase.firestore();
    const [testRecords, setTestsRecords] = useState([]);
    const [deletePressed, setDeletePressed] = useState(false);
    const [recordWarning, setRecordWarning] = useState('');
    const [deleteRecId, setDeleteRecId] = useState(false);
    const onReturn = (decision1) => {
        setDeletePressed(false);
        if (decision1==="Delete"){
        db.collection('tests').doc(deleteRecId).delete()
        .then(res=>{
            console.log('deleted');
            props.reloadNeeded(true);
        })
        .catch(error=>{
            console.log("can not delete a record");
        })
        }
    }
    function handleDelete(e) {
        let recId=e.target.previousSibling.getAttribute("value")
        setDeleteRecId(recId)
        let elementPos = testRecords.map(function(x) {return x.id; }).indexOf(recId);
        let objFound = testRecords[elementPos];
        setRecordWarning(`Do you really want to delete ${objFound.main.name} by ${objFound.main.authorName}?`)
        setDeletePressed(true)
    }
    function handleClick(test) {
        console.log(test.target.getAttribute("value"))
        props.onChange(testRecords.filter(item => item.id === test.target.getAttribute("value")));
    }
    useEffect(() => {
        const fetchData = async () => {

            const data = await db.collection("tests").get();
            setTestsRecords(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => (doc.main.author === props.user) || (doc.main.editability === 'Yes')));
        };
        fetchData();
        console.log(testRecords);

    }, [])

    return (
        <Container>
            <div style={{ width: '100%' }}>
                {testRecords && testRecords.map((test, j) => {
                    return (
                        <div style={{ position: 'relative', margin: '5px' }} >
                            <div style={{cursor: "pointer"}} value={test.id} onClick={e => handleClick(e)} >{test.main.name} by {test.main.authorName} </div>
                            <Button style={{ position: 'absolute', bottom: 0, right: 0 }} variant='danger' id={"eraseBtn_" + j} value={j} onClick={e => handleDelete(e)}>x</Button>
                        </div>
                    )
                }
                )}

            </div>
           {deletePressed && <AlertMenu onReturn={onReturn} styling={{ 
                left:"10vw",
                top: "10vh",
                variantHead:"danger",
                heading:"Warning",
                text:recordWarning,
                color1:"danger",
                button1:"Delete",
                color2:"secondary",
                button2:"Cancel"
            }}/>}
        </Container>
    );
}
export default GetTests;
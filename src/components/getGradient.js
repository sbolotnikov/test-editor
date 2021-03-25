import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { Button } from 'react-bootstrap';
import AlertMenu from './alertMenu';
function GetGradient(props) {
    const db = firebase.firestore();
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    const [deleteRecId, setDeleteRecId] = useState(false);
    const [gradients, setGradients] = useState([]);
    const [newGradient, setNewGradient] = useState('');
    const [newGradientName, setNewGradientName] = useState('');
    const [addNewGradientVisible, setAddNewGradientVisible] = useState(false);

    const onReturn = (decision1) => {
        setRevealAlert(false);
        if (decision1 === "Delete") {
            db.collection('gradients').doc(deleteRecId).delete()
                .then(res => {
                    console.log('deleted');
                    setGradients(gradients.filter(item => item.id !== deleteRecId))
                })
                .catch(error => {
                    console.log("can not delete a record");
                })
        }
    }
    function handleAdd(e) {
        db.collection('gradients').add({ name: newGradientName, value: newGradient })
            .then(res => {
                console.log('added');
                props.reloadNeeded(true);
                // setGradients(gradients.push({name:newGradientName,value:newGradient}))
            })
            .catch(error => {
                console.log("can not delete a record");
            })
    }
    function handleDelete(e) {
        let recId = e.target.getAttribute("value")
        setDeleteRecId(recId)
        let elementPos = gradients.map(function (x) { return x.id; }).indexOf(recId);
        setAlertStyle({
            left: "0",
            top: "0",
            variantHead: "danger",
            heading: "Warning",
            text: `Do you really want to delete ${gradients[elementPos].name}?`,
            color1: "danger",
            button1: "Delete",
            color2: "secondary",
            button2: "Cancel"
        });

        setRevealAlert(true)
    }
    function handleClick(grad) {
        let gr = gradients.filter(item => item.id === grad.target.getAttribute("value"));
        props.onChange(gr[0].value);
    }
    const fetchGradients = async () => {

        const data = await db.collection("gradients").get();
        let arrTemp = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setGradients(arrTemp);
    };
    useEffect(() => {
        fetchGradients();
    }, []);

    return (
        <div style={{ width: '100%', paddingLeft:'10px' }}> Pre-set gradients: for more visit <a className="btn" href="https://www.gradientmagic.com/" target="_blank" rel="noopener noreferrer">Gradient Magic</a>  
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
            {gradients && gradients.map((item, j) => {
                return (
                    <div style={{ display: "flex", margin: '5px' }} key={"gradient_"+j} >
                        <div key={"gradient_name"+j}  style={{ cursor: "pointer", width: '50%', height: '50px', textShadow: "4px 4px 16px white", backgroundImage: item.value, backgroundSize: 'cover' }}
                         value={item.id} onClick={e => handleClick(e)} >{item.name} </div>
                        <Button key={"gradient_del_button"+j}  style={{ fontSize: '12px', whiteSpace: 'nowrap' }} variant='danger' value={item.id} onClick={e => handleDelete(e)}>Del &#10008;</Button>
                    </div>
                )
            }
            )}
            <label className='headerStyle'>
                <input type="checkbox" id="checkNewGradientAdd" onChange={e => setAddNewGradientVisible(document.querySelector("#checkNewGradientAdd").checked)} /> 
                Add new background gradient CSS to our database of pre-set styles
            </label>
            <div style={{ display: addNewGradientVisible ? "block" : "none", width: '48%' }}>
                <label className='headerStyle'>Enter gradient CSS</label>
                <textarea id="newBackgroundGradient" style={{ width: '100%' }} onChange={e => setNewGradient(e.target.value)} />
                <label className='headerStyle'>Enter gradient name</label>
                <input id="newBackgroundGradient" style={{ width: '100%' }} onChange={e => setNewGradientName(e.target.value)} />
                <Button style={{ fontSize: '12px', whiteSpace: 'nowrap' }} variant='success' onClick={e => handleAdd(e)}>Add &#128504;</Button>
            </div>
        </div>
    );
}
export default GetGradient;
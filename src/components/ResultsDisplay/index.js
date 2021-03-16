import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import GetResults from "../getResults";
// import { Redirect, Link } from "react-router-dom"
const ResultsDisplay = props => {
    const { currentUser } = useAuth()
    const [testeeName, setTesteeName] = useState(currentUser ? currentUser.displayName : "");
    const testeeId = useRef(currentUser ? currentUser.uid : "");
    // const [toTest, setToTest] = useState([false]);


    // useEffect(() => {
    // if (toTest[0]===true){
    //     return <Redirect to="/update-profile" />;}
    // },[toTest]);
    function handleSave() {
        const db = firebase.firestore();
        db.collection("results").add({
            testId: props.testId,
            displayName: testeeName,
            userId: testeeId.current,
            result: props.rate,
            time: timeInSeconds(props.time)
        }).then(result=>{handleDont()})
        .catch(e=>{console.log('fail to record result')})
        
    }
    function handleDont() {
        // history.push("/test-editor/test")
        window.location.reload();
        console.log("redirect to /test")
        // setToTest([true]);
    }
    function timeInSeconds(t) {
        let time = t.split(':');
        return parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])
    }
    return (

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', alignContent: 'center', justifyContent: 'center', color: 'black', textShadow: '2px 2px #ff0000', backgroundImage: `url(${props.background})`, backgroundSize: '100% 100%' }}>
           {props.testId.length > 0 &&  <h3 style={{ width: '100%', textAlign: 'center' }}>Top results</h3>}
           {props.testId.length > 0 && <GetResults testId={props.testId} />}

            <h3 style={{ width: '100%', textAlign: 'center' }}>You have {props.rate}% {timeInSeconds(props.time)}sec left</h3>
             <div style={{ width: '60vw', maxHeight: '30vh', overflow: 'auto', textAlign: 'center', justifyContent: 'center' }}>
             <table style={{ margin: 'auto' }} >
                    <tr>
                        <th>Question</th>
                        <th>Result</th>
                    </tr>

                    {props.res.map((res, j) => {
                        return (
                            <tr>
                                <td>{j + 1}</td>
                                <td>{res ? <span>&#9989;</span> : <span>&#10060;</span>}</td>
                            </tr>

                        )
                    })}
                </table>
            </div>
            {props.testId.length > 0 && <h3 style={{ width: '100%', textAlign: 'center' }}>Would you like to save results?</h3>}

            {testeeId.current.length <= 0 && <label className='headerStyle' style={{ width: '100%', textAlign: 'center' }}  >Enter your display Name. You are not in our database
                    <input id="testName" style={{ marginLeft: '10px' }} onChange={e => setTesteeName(e.target.value)} />
            </label>}
            {props.testId.length > 0 && <Button variant='success' style={{ margin: "5px" }} onClick={e => handleSave(e)}>Yes, Please do!</Button>}
            {props.testId.length > 0 && <Button variant='danger' style={{ margin: "5px" }} onClick={e => handleDont(e)}>No, Thank you!</Button>}
            <div style={{display: 'flex', width: '100%',justifyContent: 'center'}}>
            {props.testId.length <= 0 && <Button variant='success' style={{ margin: "5px" }} onClick={e => handleDont(e)}>Come Back!</Button>}
            </div> 
        </div>
    );
}
export default ResultsDisplay;
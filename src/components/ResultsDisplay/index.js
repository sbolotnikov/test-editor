import React, { useState, useRef } from 'react';
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

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', alignContent: 'center', justifyContent: 'center', color: 'black', textShadow: '1px 1px #f5d142',
         backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 8%,rgba(90, 90, 90,0.05) 8%, rgba(90, 90, 90,0.05) 21%,transparent 21%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 37%,transparent 37%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 37%,rgba(90, 90, 90,0.05) 37%, rgba(90, 90, 90,0.05) 49%,transparent 49%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))' , backgroundSize: '100% 100%' }}>
           {props.testId.length > 0 &&  <h3 style={{ width: '100%', textAlign: 'center' }}>Top results</h3>}
           {props.testId.length > 0 && <GetResults testId={props.testId} />}
           <button className="testNav" style={{position:"absolute", top:0,right:0,width:"4vh",height:"4vh", background:"transparent",borderWidth:'0px', zIndex:1500}}
                    onClick={e => handleDont(e)}> <svg viewBox="0 0 23 23"  stroke="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.06069 1.06066C1.64647 0.474877 2.59622 0.474877 3.18201 1.06066L21.5668 19.4454C22.1526 20.0312 22.1526 20.981 21.5668 21.5668C20.981 22.1525 20.0312 22.1525 19.4455 21.5668L1.06069 3.18198C0.474901 2.5962 0.474901 1.64645 1.06069 1.06066Z" fill="#f5d142" />
                    <path d="M1.06062 21.5668C0.47483 20.981 0.47483 20.0312 1.06062 19.4454L19.4454 1.06066C20.0312 0.474876 20.9809 0.474876 21.5667 1.06066C22.1525 1.64645 22.1525 2.5962 21.5667 3.18198L3.18194 21.5668C2.59615 22.1525 1.6464 22.1525 1.06062 21.5668Z" fill="#f5d142" />
                </svg></button>  
            <h3 style={{ width: '100%', textAlign: 'center' }}>You have {props.rate}% {timeInSeconds(props.time)}sec left</h3>
             <div style={{ width: '60vw', maxHeight: '30vh', overflow: 'auto', textAlign: 'center', justifyContent: 'center',borderRadius:"10px"}}>
             <table style={{ margin: 'auto' }} >
                    <tr>
                        <th>Question</th>
                        <th>Result</th>
                    </tr>

                    {props.res.map((res, j) => {
                        return (
                            <tr key={"n"+j}>
                                <td key={"num"+j} >{j + 1}</td>
                                <td key={"correct"+j}>{res ? <span>&#9989;</span> : <span>&#10060;</span>}</td>
                            </tr>

                        )
                    })}
                </table>
            </div>
            {props.testId.length > 0 && <h3 style={{ width: '100%', textAlign: 'center' }}>Would you like to save results?</h3>}

            {testeeId.current.length <= 0 && <label className='headerStyle' style={{ width: '100%', textAlign: 'center' }}  >Enter your display Name. You are not in our database
                    <input id="testName" style={{ marginLeft: '10px' }} onChange={e => setTesteeName(e.target.value)} />
            </label>}
            {props.testId.length > 0 && <button className="testNav" style={{ margin: "5px" }} onClick={e => handleSave(e)}>Yes, Please do!</button>}
            {props.testId.length > 0 && <button className="testNav" style={{ margin: "5px" }} onClick={e => handleDont(e)}>No, Thank you!</button>}
            <div style={{display: 'flex', width: '100%',justifyContent: 'center'}}>
            {props.testId.length <= 0 && <button className="testNav" style={{ margin: "5px" }} onClick={e => handleDont(e)}>Come Back!</button>}
            </div> 
        </div>
    );
}
export default ResultsDisplay;
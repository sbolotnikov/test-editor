import React, { useState, useRef } from 'react';
import firebase from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import GetResults from "../getResults";
const ResultsDisplay = props => {
    const { currentUser } = useAuth()
    const [testeeName, setTesteeName] = useState(currentUser ? currentUser.displayName : "");
    const testeeId = useRef(currentUser ? currentUser.uid : "");
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
        window.location.assign(process.env.PUBLIC_URL + '/#/test');
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
           <button className="testNav" style={{position:"absolute", top:0,right:0, background:"transparent",borderWidth:'0px', zIndex:1500}}
                    onClick={e => handleDont(e)}>
                        <img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" style={{width:"4vh",height:"4vh"}}/>
                        </button>  
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
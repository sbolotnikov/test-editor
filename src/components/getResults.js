import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
function GetResults(props) {
    const db = firebase.firestore();
    const [testRecords, setTestsRecords] = useState([]);
    useEffect(() => {
        let resultsData = []
        const fetchData = async () => {

            db.collection("results").where("testId", "==", props.testId).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    resultsData.push(doc.data());
                });
                resultsData.sort(function (a, b) {
                    if (b.result === a.result) { return b.time - a.time } else { return b.result - a.result }
                });
                setTestsRecords(resultsData);
            });

            // setTestsRecords(data.docs.map(doc => ({ ...data()})).filter(doc => (doc.testId=== props.testId)));
        };
        fetchData();
        console.log(testRecords);

    }, [])

    return (
        <div style={{ width: '60vw', maxHeight: '20vh', overflow: 'auto', textAlign: 'center', justifyContent: 'center',borderRadius:"10px", backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 8%,rgba(90, 90, 90,0.05) 8%, rgba(90, 90, 90,0.05) 21%,transparent 21%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 37%,transparent 37%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 37%,rgba(90, 90, 90,0.05) 37%, rgba(90, 90, 90,0.05) 49%,transparent 49%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))' }}>
            <table style={{ margin:'auto' }} >
                <tr>
                    <th>Name</th>
                    <th>Result</th>
                    <th>Time Left</th>
                </tr>
                <tbody>
                {testRecords && testRecords.map((test, j) => {
                    return (
                        <tr key={j}>
                            <td key={"name"+j}>{test.displayName}</td>
                            <td key={"result"+j}>{test.result}</td>
                            <td key={"time"+j}>{test.time}</td>
                        </tr>

                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
export default GetResults;
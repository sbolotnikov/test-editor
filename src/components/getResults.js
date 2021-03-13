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
                console.log(testRecords)
            });

            // setTestsRecords(data.docs.map(doc => ({ ...data()})).filter(doc => (doc.testId=== props.testId)));
        };
        fetchData();
        console.log(testRecords);

    }, [])

    return (
        <div style={{ width: '60vw', maxHeight: '30vh', overflow: 'auto', textAlign: 'center', justifyContent: 'center' }}>
            <table style={{ margin:'auto' }} >
                <tr>
                    <th>Name</th>
                    <th>Result</th>
                    <th>Time Lest</th>
                </tr>
                {testRecords && testRecords.map((test, j) => {
                    return (
                        <tr>
                            <td>{test.displayName}</td>
                            <td>{test.result}</td>
                            <td>{test.time}</td>
                        </tr>

                    )
                })}
            </table>
        </div>
    )
}
export default GetResults;
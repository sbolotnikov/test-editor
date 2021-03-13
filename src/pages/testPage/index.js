import React, { Fragment, useEffect, useState } from 'react';
import firebase from "../../firebase";
import TestRun from '../../components/TestRun';
import { useAuth } from "../../contexts/AuthContext"
import "./style.css";


function ToRenderEverything() {
  const db = firebase.firestore();
  const [testRecords, setTestsRecords] = useState([]);
  const [testLoad, setTestLoad] = useState(false);
  const [localTest, setLocalTest]=useState(false);
  const { currentUser } = useAuth()

  function handleClick(test) {
    console.log(test.target.getAttribute("value"))
    setTestLoad(testRecords.filter(item => item.id === test.target.getAttribute("value"))[0]);

  }
  useEffect(() => {
    let resultsData=[];
    const fetchData = async () => {
      let currentUserId=currentUser? currentUser.uid : ""
      const data = await db.collection("tests").get();
       // other way to do it
      // db.collection("tests").get()
      // .then((querySnapshot) => {
      //   querySnapshot.docs.forEach((doc) => {
      //       if ((doc.data().main.author=== currentUserId) || (doc.data().main.visibility === 'Public')) resultsData.push({...doc.data(),id: doc.id});
      //   });
     
        console.log(resultsData)
      setTestsRecords(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => (doc.main.author === currentUserId) || (doc.main.visibility === 'Public')));
    // })
    };
    fetchData();
    console.log(testRecords);

  }, [])


  function readSingleFile(evt) {
    var f = evt.target.files[0];
    if (f) {
      var r = new FileReader();
      r.onload = function (e) {
        setTestLoad(JSON.parse(e.target.result));
        setLocalTest(true)
      }
      r.readAsText(f);

    } else {
      alert("Failed to load file");
    }
  }


  return (
    <>
      {!testLoad && <div style={{ width: '100%' }}>
        {testRecords && testRecords.map((test, j) => {
          return (
            <div style={{ position: 'relative', margin: '5px' }} >
              <div value={test.id} onClick={e => handleClick(e)} >{test.main.name} by {test.main.authorName} </div>
            </div>
          )
        }
        )}
       {currentUser && <label className='headerStyle'> Load saved locally test
                <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />
        </label>}
      </div>}
      {testLoad && <TestRun test={testLoad} local={localTest} />}

    </>
  )
}

export default ToRenderEverything;
import React, { Fragment, useState } from 'react';
import TestRun from '../../components/TestRun';
import GetTests from '../../components/getTests';
import { useAuth } from "../../contexts/AuthContext"
import "./style.css";


function ToRenderEverything() {

  const [testLoad, setTestLoad] = useState(false);
  const [localTest, setLocalTest] = useState(false);
  const { currentUser } = useAuth()

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
  function getTestfromDB(n) {
    console.log(n)
    setTestLoad(n[0]);
  }
  return (
    <>
      {!testLoad && <GetTests user={currentUser ? currentUser.uid : ""} forPage={'test'} onChange={n => getTestfromDB(n)} />}
      {currentUser && !testLoad && <label className='headerStyle'> Load saved locally test
                <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />
      </label>}
      {testLoad && <TestRun test={testLoad} local={localTest} />}

    </>
  )
}

export default ToRenderEverything;
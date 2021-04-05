import React, { useState } from 'react';
import TestRun from '../../components/TestRun';
import GetTests from '../../components/getTests';
import { useAuth } from "../../contexts/AuthContext"
import "./style.css";


function ToRenderEverything() {

  const [testLoad, setTestLoad] = useState(false);
  const [localTest, setLocalTest] = useState(false);
  const { currentUser } = useAuth()
 
  function getTestfromDB(n) {
    console.log(n)
    setTestLoad(n);
  }
  return (
    <div className="testContainer">
        {!testLoad && <GetTests user={currentUser ? currentUser.uid : ""} forPage={'test'} onLocal={l => setLocalTest(l)} onChange={n => getTestfromDB(n)} />}
        {testLoad && <TestRun test={testLoad} local={localTest} />}
    </div>
  )
}

export default ToRenderEverything;
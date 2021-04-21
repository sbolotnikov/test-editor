import React, { useState } from 'react';
import TestRun from '../../components/TestRun';
import GetTests from '../../components/getTests';
import { useAuth } from "../../contexts/AuthContext";
import Footer from "../../components/Footer";
import "./style.css";


function ToRenderEverything() {
// main page that runs tests 
  const [testLoad, setTestLoad] = useState(false);
  const [localTest, setLocalTest] = useState(false);
  const { currentUser } = useAuth()

  function getTestfromDB(n) {
    // sets test to run taken from the GetTests component. Test run by the TestRun component
    console.log(n)
    setTestLoad(n);
  }
  return (
    <>
    <div className="testContainer">
      {!testLoad && <GetTests user={currentUser ? currentUser.uid : ""} forPage={'test'} onLocal={l => setLocalTest(l)} onChange={n => getTestfromDB(n)} /> }
      {testLoad && <TestRun test={testLoad} local={localTest} />}
      {!testLoad && <Footer />}
    </div>
    </>
  )
}

export default ToRenderEverything;
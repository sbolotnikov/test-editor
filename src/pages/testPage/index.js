import React, { Fragment, useEffect, useState } from 'react';
import TestRun from '../../components/TestRun';
import "./style.css";

var quizObj

function ToRenderEverything() {

  const [testLoad, setTestLoad] = useState(false);
  function readSingleFile(evt) {
    var f = evt.target.files[0]; 
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
        quizObj=JSON.parse(e.target.result);
        setTestLoad(true);
      }
      r.readAsText(f);

    } else { 
      alert("Failed to load file");
    }
  }
  
  useEffect(() => {

    
  }, []);



  return (
    <Fragment>
      <div className="container" style={{ maxWidth: "1440px", overflow: "hidden" }}>
        <main className="container">
       {!testLoad && <label className='headerStyle'> Load saved locally test
                <input type="file" id="fileinput" onChange={e => readSingleFile(e)} />
                    </label>}
          {testLoad && <TestRun test={quizObj}/>}
        </main>

      </div>
    </Fragment >
  )
}

export default ToRenderEverything;
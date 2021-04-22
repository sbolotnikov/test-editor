import React, { useState } from "react"
import ReactPlayer from 'react-player/lazy'
import "./Login.scss";
export default function About() {
  var selectOptions = [
    {
      name: "Test Taking", value: "0m13s", vis: false,
      sub: [
        { name: "Selecting Quiz to Take", value: "0m15s" },
        { name: "Log In, Sign Up, Demo Test", value: "0m39s" },
        { name: "Get Test Information", value: "0m59s" },
        { name: "Start Test", value: "1m19s" },
        { name: "Test Navigation", value: "1m33s" },
        { name: "Ending Test", value: "2m14s" },
        { name: "Saving & Sharing results", value: "2m35s" }
      ]
    },
    {
      name: "Dashboard", value: "4m11s", vis: false,
      sub: [
        { name: "Update Profile", value: "4m34s" },
        { name: "Update Avatar", value: "4m50s" }
      ]
    },
    {
      name: "Managing Test", value: "5m48s", vis: false,
      sub: [
        { name: "Part 1: Choose Test to Edit", value: "6m07s" },
        { name: "Load Test from HardDrive", value: "6m29s" },
        { name: "Part 2: Test properties", value: "7m00s" },
        { name: "Create category for your test", value: "7m37s" },
        { name: "Setting Background", value: "8m05s" },
        { name: "Setting background Gradient", value: "8m26s" },
        { name: "Upload to Web button", value: "8m56s" },
        { name: "Update on Web, Download, New buttons", value: "9m24s" },
      ]
    },
    {
      name: "Question Editing Tool", value: "9m58s", vis: false,
      sub: [
        { name: "Question design Form", value: "10m11s" },
        { name: "Navigation", value: "10m53s" },
        { name: "Different Layouts", value: "11m05s" },
        { name: "Add, Delete Question", value: "11m42s" },
        { name: "Move Question", value: "11m56s" },
        { name: "Copy/Paste question", value: "12m14s" },
        { name: "Copy/Paste answering options", value: "13m01s" },
        { name: "Add, Erase answering options", value: "13m24s" },
        { name: "Preview Question", value: "13m30s" },
      ]
    },
  ]
  const [link, setLink] = useState('');
  const [playState, setPlayState] = useState(false);
  const [visible, setVisible] = useState(-1);
  function handleVisible(e) {
    let n = parseInt(e.currentTarget.id)
    n!==visible?setVisible(n):setVisible(-1)
  }


  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "800px", marginTop:'4em', marginBottom:'2%' }}>
        <div className='registeCard'>
          <h4 className="header1">Click on text to start video
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' />
            </h4>
          <div style={{margin:'3vh 0', minHeight:'50vh',overflow:'auto'}}>
          <ReactPlayer url={link} playing={playState} controls width="100%" />
          </div>
          {selectOptions.map((item, j) => {
            return (
              <div style={{ margin: '5px' }} key={"option" + j} >
                <div key={"option_name" + j} style={{ width: '100%', height: '50px', borderRadius: '10px', display: 'flex', backgroundColor: '#554FA7' }}>
                  <h5 style={{ cursor: "pointer", color: 'white', textAlign: "center", margin: 'auto' }} onClick={e => { setLink(`https://youtu.be/x116B9S0tX4#t=${item.value}`); setPlayState(true) }} >{item.name}</h5>
                  <div style={{ fontSize: 'max(1.2vw,12px)', border: '1px solid transparent',cursor:'pointer', outlineColor: 'transparent',display:"flex",alignItems:"center", marginRight:'5px'}} key={"right_eraseBtn_" + j} id={j+'.links'} onClick={e => handleVisible(e)}>
                    <img src={process.env.PUBLIC_URL +((j!==visible)?"/icons/plus.svg":"/icons/close.svg")} alt="open" style={{ width: 'max(1.2vw,12px)', height: 'max(1.2vw,12px)' }} />
                  </div>
                </div>
                {(j===visible) && item.sub.map((subItem, i) => {
                  return (
                    <div key={"subOption_name" + i} style={{ cursor: "pointer" }}
                      onClick={e => { setLink(`https://youtu.be/x116B9S0tX4#t=${subItem.value}`); setPlayState(true) }} >{subItem.name}
                    </div>
                  )
                })

                }
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}
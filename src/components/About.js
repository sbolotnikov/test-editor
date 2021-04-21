import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import ReactPlayer from 'react-player/lazy'
import Footer from "./Footer";
import "./Login.scss";
export default function About() {
  var selectOptions = [
    {
      name: "Test Taking", value: "0m13s", vis:false,
      sub: [
        { name: "Selecting Quiz to Take", value: "0m15s" },
        { name: "Log In, Sign Up, Demo Test", value: "0m39s" },
        { name: "Get Test Information", value: "0m59s" },
        { name: "Start Test", value: "1m19s" },
        { name: "Test Navigation", value: "1m33s" },
        { name: "Ending Test", value: "2m14s" },
        { name: "Results Panel: Saving & Sharing results", value: "2m35s" }
      ]
    },
    {
      name: "Dashboard", value: "4m11s", vis:false,
      sub: [
        { name: "Update Profile", value: "4m34s" },
        { name: "Update Avatar", value: "4m50s" }
      ]
    },
    {
      name: "Managing Test", value: "5m48s", vis:false,
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
      name: "Question Editing Tool", value: "9m58s",vis:false, 
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
  const [visible, setVisible] = useState([false, false, false, false]);
  return (
    <div className='mainContainer'>
      <div style={{ width: '100%', maxWidth: "800px" }}>
        <div className='registeCard'>
          <h2 className="header1">About
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /> </h2>
          <ReactPlayer url={`https://youtu.be/x116B9S0tX4${link}`} playing={playState} controls width="100%" />
          {selectOptions.map((item, j) => {
            return (
              <div style={{ margin: '5px' }} key={"option" + j} >
                <div key={"option_name" + j} style={{ cursor: "pointer", width: '50%', height: '50px', borderRadius: '10px', textShadow: "4px 4px 16px white", backgroundColor: '#554FA7' }}
                  value={item.value} onClick={e => { setLink(`#t=${item.value}`); setPlayState(true) }} >{item.name}
                   <button className="testNav" style={{fontSize:'max(1.2vw,12px)', float:"right",margin:0 }} key={"right_eraseBtn_" + j} value={j} onClick={e =>{let vis=visible; vis[j]=!vis[j]; console.log(vis); setVisible(vis)}}><img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" style={{width:'max(1.2vw,12px)',height:'max(1.2vw,12px)'}}/></button>
                </div>
                {visible[j] && item.sub.map((subItem, i) => {
                  return (
                    <div key={"subOption_name" + i} style={{ cursor: "pointer"}}
                      value={subItem.value} onClick={e => { setLink(`#t=${subItem.value}`); setPlayState(true) }} >{subItem.name}
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
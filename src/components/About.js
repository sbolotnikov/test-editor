import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link} from "react-router-dom"
import Footer from "./Footer";
import "./Login.scss";
export default function About() {

  return (
      <div className='mainContainer'>
        <div style={{ width: '98%', maxWidth: "400px" }}>
          <div className='registeCard'>
            <h2 className="header1">About
            <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /> </h2>
          </div>  
        </div>
      </div>
  )
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import  "./Nav.scss";


function Nav(props) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { currentUser } = useAuth();
    const [imgDisplay, setImgDisplay] = useState('');
    
    function handleNavCollapse() {
        setIsNavCollapsed(!isNavCollapsed)
    }
    useEffect(() => {
        let imgLink =  process.env.PUBLIC_URL + "/icons/defaultUser.svg"
        if (currentUser) {currentUser.photoURL>"" ? setImgDisplay(currentUser.photoURL) : setImgDisplay(imgLink);}
        else{
            setImgDisplay(imgLink)
        }
        
    }, [currentUser]);
    useEffect(()=>{
        if(window.innerWidth<1000){
        if (isNavCollapsed){
            document.querySelector("#navbarNav").style.display="none";
        }
        else{
            document.querySelector("#navbarNav").style.display="block";
        }
    }

    },[isNavCollapsed]);
    useEffect(()=>{
        if (window.innerWidth>=1000){
            document.querySelector("#navbarNav").style.display="flex";
            document.querySelector("#navbarNav").style.justifyContent="center";
            document.querySelector("#navbarNav").style.width="83%";
        }
        else{
            document.querySelector("#navbarNav").style.display="none";
        }
       

    },[window.innerWidth]);

    return (
        <nav className="navbar" >
            
            {window.innerWidth<1000 ? <Link to="/dashboard"><img className="member-photo" src={imgDisplay} alt="avatar"/></Link>
             :<Link to="/" className="navHeader"> <img src={ process.env.PUBLIC_URL+"/icons/logoName.svg"} alt="close" style={{width:'1.2em',height:'1.5em'}}/></Link> }
			{window.innerWidth<1000 ? <Link to="/" className="navHeader"> 
            Quiz Land</Link> : null}
            {window.innerWidth<1000 ? <span id="navbar-toggler"  onClick={handleNavCollapse}>
                <div style={{ width: '1em', height: '1em',float:'center' }}>
                   {isNavCollapsed ? 
                     <img src={ process.env.PUBLIC_URL+"/icons/burger.svg"} alt="open" /> :
                    <img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" />}
                </div>
            </span>: null}
            
                <ul id="navbarNav">


                   {!currentUser && <li className="nav-item">
                        <Link to="/login" className="nav-link" onClick={event => handleNavCollapse()}>
                            Log In
                        </Link>

                    </li>}
                    {!currentUser && <li className="nav-item">
                        <Link to="/signup" className="nav-link" onClick={event => handleNavCollapse()}>
                            Sign Up
                    </Link>

                    </li>}

                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={event => handleNavCollapse()}>
                            Take tests
                    </Link>
                    </li>
                   {  currentUser && <li className="nav-item">
                        <Link to="/create" className="nav-link" onClick={event => handleNavCollapse()}>
                            Manage tests
                    </Link>
                    </li>}
                    <li className="nav-item">
                        <Link to="/about" className="nav-link" onClick={event => handleNavCollapse()}>
                            About
                    </Link>
                    </li>
                    {  currentUser && <li className="nav-item">
                        <Link to="/logout" className="nav-link" onClick={event =>  handleNavCollapse()} >
                            Logout
                    </Link>
                    </li>}
                </ul>
            

            {window.innerWidth<1000 ? null: <Link to="/dashboard">
               <img className="member-photo"  src={imgDisplay} alt="member avatar"/>
            </Link>}
        </nav>
    );
}

export default Nav;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import  "./Nav.scss";


function Nav(props) {
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const { currentUser } = useAuth();
    const [imgDisplay, setImgDisplay] = useState('');
    
    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
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
            
            {window.innerWidth<1000 ? <Link to="/"><img className="member-photo" src={imgDisplay} alt="avatar"/></Link>
             :<Link to="/" className="navHeader"> <img src={ process.env.PUBLIC_URL+"/icons/logoName.svg"} alt="close" style={{width:'1.5em',height:'2em'}}/></Link> }
			{window.innerWidth<1000 ? <Link to="/" className="navHeader"> 
            <img src={ process.env.PUBLIC_URL+"/icons/QuizLogo.svg"} alt="logo" style={{width:'4vw',height:'4vw'}}/>Quiz Land</Link> : null}
            {window.innerWidth<1000 ? <span id="navbar-toggler"  onClick={handleNavCollpase}>
                <div style={{ width: '1em', height: '1em',float:'center' }}>
                   {isNavCollapsed ? 
                     <img src={ process.env.PUBLIC_URL+"/icons/burger.svg"} alt="open" /> :
                    <img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" />}
                </div>
            </span>: null}
            
                <ul id="navbarNav">


                   {!currentUser && <li className="nav-item">
                        <Link to="/login" className="nav-link" onClick={event => handleNavCollpase()}>
                            Login
                        </Link>

                    </li>}
                    {!currentUser && <li className="nav-item">
                        <Link to="/signup" className="nav-link" onClick={event => handleNavCollpase()}>
                            Signup
                    </Link>

                    </li>}

                    <li className="nav-item">
                        <Link to="/test" className="nav-link" onClick={event => handleNavCollpase()}>
                            Take tests
                    </Link>
                    </li>
                   {  currentUser ? <li className="nav-item">
                        <Link to="/create" className="nav-link" onClick={event => handleNavCollpase()}>
                            Create tests
                    </Link>
                    </li>:""}
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={event => handleNavCollpase()}>
                            About
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link" onClick={event =>  handleNavCollpase()} >
                            Logout
                    </Link>
                    </li>
                </ul>
            

            {window.innerWidth<1000 ? null: <Link to="/">
               <img className="member-photo"  src={imgDisplay} alt="member avatar"/>
            </Link>}
        </nav>
    );
}

export default Nav;
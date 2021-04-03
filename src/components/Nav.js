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
            document.querySelector('#imgMember').setAttribute('src',imgLink)
            setImgDisplay(imgLink)
        }
        

    }, [currentUser]);
    return (
        <nav className="navbar navbar-expand-lg" >
            
            {window.innerWidth<1000 ? <Link to="/"><img className="member-photo" id='imgMember' src={imgDisplay} alt="member avatar"/></Link>
             :<Link to="/" className="navHeader"> <img src={ process.env.PUBLIC_URL+"/icons/logoName.svg"} alt="close" style={{width:'2.67em',height:'4em'}}/></Link> }
			{window.innerWidth<1000 ? <Link to="/login" className="navHeader" style={{marginRight:0}}> 
            <img src={ process.env.PUBLIC_URL+"/icons/QuizLogo.svg"} alt="close" style={{width:'1.3em',height:'1.3em'}}/> Quiz Land</Link> : null}
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <div style={{ width: '1em', height: '1em' }}>
                   {isNavCollapsed ? 
                     <img src={ process.env.PUBLIC_URL+"/icons/burger.svg"} alt="close" style={{width:'1em',height:'1em'}}/> :
                    <img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" style={{width:'1em',height:'1em'}}/>}
                </div>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">


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
            </div>

            {window.innerWidth<1000 ? null: <Link to="/" className="nav-link">
               <img className="member-photo" id='imgMember' src={imgDisplay} alt="member avatar"/>
            </Link>}
        </nav>
    );
}

export default Nav;
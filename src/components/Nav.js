import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

function Nav(props) {
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const { currentUser } = useAuth();
    const [imgDisplay, setImgDisplay] = useState('');
    
    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }
    useEffect(() => {
        let imgLink =  "https://res.cloudinary.com/sergeyb/image/upload/v1616530982/quizzes/defaultIcon_w0obug.png";
        if (currentUser) {currentUser.photoURL>"" ? setImgDisplay(currentUser.photoURL) : setImgDisplay(imgLink);}
        else{
            document.querySelector('#imgMember').setAttribute('src',imgLink)
            setImgDisplay(imgLink)
        }
        

    }, [currentUser]);
    return (
        <nav className="navbar navbar-expand-lg" >
            <Link to="/" className="navHeader">
                Quiz Land
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <div style={{ width: '1em', height: '1em',color:"white" }}>
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

            <Link to="/" className="nav-link">
               <img className="member-photo" id='imgMember' src={imgDisplay>"" ? imgDisplay : process.env.PUBLIC_URL + "./images/defaultIcon.png"} alt="member avatar"/>
            </Link>
        </nav>
    );
}

export default Nav;
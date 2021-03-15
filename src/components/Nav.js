import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

function Nav(props) {
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const { currentUser, logout } = useAuth();
    const [imgDisplay, setImgDisplay] = useState('');
    // use history to redirect after login
    const history = useHistory();
    async function logoutHandle(e) {
        try {
            await logout();
            history.push("/test-editor/login")
        } catch {
            // setError("Failed to log out");
            console.log("Failed to log out");
        }
    }
    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }
    useEffect(() => {
        let imgLink = process.env.PUBLIC_URL + "./images/defaultIcon.png";
        if (currentUser) {currentUser.photoURL>"" ? setImgDisplay(currentUser.photoURL) : setImgDisplay(imgLink);}

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
                    <svg viewBox="0 0 29 15"  stroke="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.00012207 1.5C0.00012207 0.671573 0.671695 0 1.50012 0H27.5001C28.3285 0 29.0001 0.671573 29.0001 1.5C29.0001 2.32843 28.3285 3 27.5001 3H1.50012C0.671695 3 0.00012207 2.32843 0.00012207 1.5Z" fill="#010101" />
                        <path d="M0.00012207 7.5C0.00012207 6.67157 0.671695 6 1.50012 6H27.5001C28.3285 6 29.0001 6.67157 29.0001 7.5C29.0001 8.32843 28.3285 9 27.5001 9H1.50012C0.671695 9 0.00012207 8.32843 0.00012207 7.5Z" fill="#010101" />
                        <path d="M0.00012207 13.5C0.00012207 12.6716 0.671695 12 1.50012 12H27.5001C28.3285 12 29.0001 12.6716 29.0001 13.5C29.0001 14.3284 28.3285 15 27.5001 15H1.50012C0.671695 15 0.00012207 14.3284 0.00012207 13.5Z" fill="#010101" />
                    </svg> :
                    <svg viewBox="0 0 23 23"  stroke="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.06069 1.06066C1.64647 0.474877 2.59622 0.474877 3.18201 1.06066L21.5668 19.4454C22.1526 20.0312 22.1526 20.981 21.5668 21.5668C20.981 22.1525 20.0312 22.1525 19.4455 21.5668L1.06069 3.18198C0.474901 2.5962 0.474901 1.64645 1.06069 1.06066Z" fill="#010101" />
                        <path d="M1.06062 21.5668C0.47483 20.981 0.47483 20.0312 1.06062 19.4454L19.4454 1.06066C20.0312 0.474876 20.9809 0.474876 21.5667 1.06066C22.1525 1.64645 22.1525 2.5962 21.5667 3.18198L3.18194 21.5668C2.59615 22.1525 1.6464 22.1525 1.06062 21.5668Z" fill="#010101" />
                    </svg>}
                </div>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">


                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Signup
                    </Link>

                    </li>

                    <li className="nav-item">
                        <Link to="/test" className="nav-link">
                            Take Tests
                    </Link>
                    </li>
                   {  currentUser ? <li className="nav-item">
                        <Link to="/create" className="nav-link">
                            Create tests
                    </Link>
                    </li>:""}
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            About
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link" onClick={event => logoutHandle(event)} >
                            Logout
                    </Link>
                    </li>
                </ul>
            </div>

            <Link to="/" className="nav-link">
               <img className="member-photo" src={imgDisplay>"" ? imgDisplay : process.env.PUBLIC_URL + "./images/defaultIcon.png"} alt="profile pic"/>
            </Link>
        </nav>
    );
}

export default Nav;
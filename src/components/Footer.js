import React from "react";
import { Link } from "react-router-dom";


function Footer() {
    return (
<div id="footer" style={{position:'absolute',left:0, bottom:0,width:'100%', marginLeft:"10px",textShadow:"2px 2px white", pointerEvents:"cursor"}}
    >
&copy; 2021 <Link to="/about">Sergey Bolotnikov</Link> 
</div>
    );
}

export default Footer;
import React from "react";
import { Link } from "react-router-dom";


function Footer() {
    return (
<div style={{position:'absolute',left:0, bottom:0,zIndex: '1600',width:'100%', marginLeft:"10px",textShadow:"2px 2px white"}}
    // display:flex;
    // justify-content: space-between;
    // align-content: center;}}
    >
&copy; 2021 Sergey Bolotnikov
</div>
    );
}

export default Footer;
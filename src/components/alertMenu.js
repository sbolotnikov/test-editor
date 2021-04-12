import React,{ useEffect, useState } from "react"
var variant = {
  'danger': {
    'color': '#721c24',
    'backgroundColor': '#f8d7da',
    'borderColor': '#f5c6cb'
    
  },
  'success': {
    'color': '#155724',
    'backgroundColor': '#d4edda',
    'borderColor': '#c3e6cb'
   },
   'secondary': {
    'color': '#383d41',
    'backgroundColor': '#e2e3e5',
    'borderColor': '#d6d8db'
  },
  'warning': {
    'color': '#856404',
    'backgroundColor': '#fff3cd',
    'borderColor': '#ffeeba'
  },
  'info': {
    'color': '#0c5460',
    'backgroundColor': '#d1ecf1',
    'borderColor': '#bee5eb',
  },
  '': {},
}
export default function AlertMenu(props) {
  const [button1Color, setbutton1Color]=useState('');
  const [button2Color, setbutton2Color]=useState('');
  useEffect(() => {
    setbutton1Color(Object.values(variant)[Object.keys(variant).indexOf(props.styling.color1)].color);
    setbutton2Color(Object.values(variant)[Object.keys(variant).indexOf(props.styling.color2)].color);
}, []);
  return (

    <div style={{ width: '100vw', height: '100vh',position:'absolute',top: window.pageYOffset,left:0, display:'flex', justifyContent:'center', alignItems:'center',zIndex:'1700', backgroundColor:'rgba(105,105,105, .7)' }} >
      <div className='alertContainer'>
        <label className='alertItemStyle' style={Object.values(variant)[Object.keys(variant).indexOf(props.styling.variantHead)]}>{props.styling.heading}</label>
        <h5 className="alertItemStyle">{props.styling.text}</h5>
        {props.styling.inputField && <input id="inputField" style={{ width: "100%", marginBottom: "10px" }} defaultValue={props.inputValue} />}
        {(props.styling.color1!=="") && <button className='alertItemStyle' style={{backgroundColor:button1Color, color:'white'}} onClick={e => { props.onReturn(props.styling.button1, (props.styling.inputField ? document.querySelector("#inputField").value : null)); }}>
          {props.styling.button1}
        </button>}
        {(props.styling.color2!=="") &&<button className="alertItemStyle" style={{backgroundColor:button2Color, color:'white'}} onClick={e => { props.onReturn(props.styling.button2) }}>
          {props.styling.button2}
        </button>}

      </div>

    </div>

  )
}
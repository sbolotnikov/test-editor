import React from "react"
import { Button, Card, Alert} from "react-bootstrap"

export default function AlertMenu(props) {

  return (
    
      <div style={{width:'100vw', height:'100vh', position:"absolute"}} >
        <Card style={{position:"relative",zIndex:1000,transformOrigin: '50% 50%',transform: 'translate(center, center)',margin:'auto', maxWidth: "400px" }}>
          <Card.Body>
          <Alert style={{textAlign:"center"}} variant={props.styling.variantHead}>{props.styling.heading}</Alert>
            <h5 className="text-center mb-2">{props.styling.text}</h5>
            {props.styling.inputField && <input id="inputField" style={{width:"100%", marginBottom:"10px"}} defaultValue={props.inputValue} />}
            <Button variant={props.styling.color1} block onClick={e=>{props.onReturn(props.styling.button1, (props.styling.inputField ?document.querySelector("#inputField").value : null));}}>
                {props.styling.button1}
            </Button>
            <Button variant={props.styling.color2} block onClick={e=>{props.onReturn(props.styling.button2)}}>
                 {props.styling.button2}
            </Button>

          </Card.Body>
        </Card>

      </div>
   
  )
}
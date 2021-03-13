import React from "react"
import { Button, Card, Alert} from "react-bootstrap"

export default function AlertMenu(props) {

  return (
    
      <div className="w-100" style={{position:"absolute",top:props.styling.top,left:props.styling.left, maxWidth: "400px" }}>
        <Card>
          <Card.Body>
          <Alert style={{textAlign:"center"}} variant={props.styling.variantHead}>{props.styling.heading}</Alert>
            <h5 className="text-center mb-2">{props.styling.text}</h5>
            <Button variant={props.styling.color1} block onClick={e=>{props.onReturn(props.styling.button1)}}>
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
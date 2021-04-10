import React from "react"
export default function TestPopupInfo(props) {
    return (
        // {author: "", description:"", name:"", questionsTotal: 0}
        <div style={{ width: '100vw', height: '100vh',position:'absolute',top: window.pageYOffset, left:0, display:'flex', justifyContent:'center', alignItems:'center'  }} >
            <div className='alertContainer'>
                <h3 className="alertItemStyle"><strong>{props.test.name}</strong></h3>
                <p className="alertItemStyle"><strong>Author:</strong> {props.test.author}</p>
                <p className="alertItemStyle"><strong>Description:</strong> {props.test.description}</p>
                <p className="alertItemStyle"><strong>Question amount:</strong> {props.test.questionsTotal}</p>
                <button className="alertItemStyle" style={{ backgroundColor: '#d1ecf1', color: '#0c5460' }} onClick={e=>{ 
                    console.log('click'); props.onRes('')}}>
                    Close
        </button>
            </div>
        </div>

    )
}
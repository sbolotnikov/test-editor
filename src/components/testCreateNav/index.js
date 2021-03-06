import React, { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./style.css";
function TestCreateNav(props) {
    
    useEffect(() => { 
        document.getElementById('questionPage').value = 1;
    },[]);
    function questionNumberSet(n) {
        let questionNow = document.querySelector("#questionPage");
        if (Number.isInteger(n)) {

            if (n === 1) {
                if (questionNow.value === "") { questionNow.value = 1; }
                else if (parseInt(questionNow.value) < props.qNumber) { questionNow.value = parseInt(questionNow.value) + 1 }
                else questionNow.value = 1;
            }
            if (n === -1) {
                if (questionNow.value === "") { questionNow.value = props.qNumber; }
                else if (parseInt(questionNow.value) > 1) { questionNow.value -= 1 }
                else questionNow.value = props.qNumber;
            }
        } else {
            if (n === "0") {
                let navButton=document.querySelectorAll(".testNav");
                navButton.forEach(function(userItem) {
                 userItem.classList.remove('invisible');
                });
                document.querySelector("#startNav").classList.add('invisible');             
                questionNow.value = 1;
            } else questionNow.value = n;
        }
        (n === "0") ? props.onChange(0) : props.onChange(parseInt(questionNow.value));
    }
    return (
        <Fragment>
            <div style={{display: 'flex',flexWrap: 'wrap', width: '100%', justifyContent: 'center'}}>
               {/* <Button id="startNav" style={{position:'absolute', top:'50vh', zIndex:'200', transformOrigin: 'center',margin:'10px 0 0 0'}}
                onClick={timerDraw}>Start</Button>           */}
                <Button  className="testNav"
                    onClick={e => { questionNumberSet('1') }}>&#9198;</Button>
                <Button className="testNav"
                    onClick={e => { questionNumberSet(-1) }}>&#9194;</Button>
                <input className="testNav" type="number" id="questionPage"  min="1" max={props.qNumber.toString()} onClick={e => questionNumberSet(e.target.value)}></input>
                <Button className="testNav"
                    onClick={e => { questionNumberSet(1) }}>&#9193;</Button>
                <Button className="testNav"
                    onClick={e => { questionNumberSet(props.qNumber.toString()) }}>&#9197;</Button>
                <Button className="testNav"
                    onClick={e => { props.onNew('') }}>&#10133;</Button>    
                <Button className="testNav"
                    onClick={e => { props.onDel('') }}>&#10060;</Button>    
            </div>
        </Fragment>
    );
}
export default TestCreateNav;
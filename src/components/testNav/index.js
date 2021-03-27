import React, { Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import "./style.css";
function TestNav(props) {
    var timerInterval
    const [displayTime, setDisplayTime] = useState(stringTime(props.hours, props.minutes, props.seconds));
    let secondsLeft = props.hours * 3600 + props.minutes * 60 + props.seconds;
    function timerDraw(event) {
        let seconds = props.seconds;
        let minutes = props.minutes;
        let hours = props.hours;
        questionNumberSet('0');
        event.preventDefault();
        if ((seconds!==0)||(minutes!==0)||(hours!==0)){
        timerInterval = setInterval(function () {
            secondsLeft--;
            if (seconds === 0) {
                seconds = 59;
            }
            else seconds--;
            if (seconds === 59) {
                if (minutes === 0) {
                    minutes = 59;
                    hours--;
                } else minutes--;
            }
            setDisplayTime(stringTime(hours, minutes, seconds));
            if ((secondsLeft === 0)) {
                clearInterval(timerInterval);
                document.querySelector(".testNav").classList.add('invisible');
                props.onExit("00:00:00");
            }

        }, 1000);
    }
    };
    function stringTime(h, m, s) {
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
    function stopTest() {
        clearInterval(timerInterval);
        document.querySelector(".testNav").classList.add('invisible');
        let navButton=document.querySelectorAll(".testNav");
        navButton.forEach(function(userItem) {
        userItem.classList.add('invisible');
                });
        props.onExit(displayTime);
    }
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
                navButton=document.querySelectorAll(".testNavLight");
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
            <div className="navContainer" >
               <Button id="startNav" style={{position:'absolute', top:'50vh', zIndex:'200', transformOrigin: 'center',margin:'10px 0 0 0'}}
                onClick={timerDraw}>Start</Button>          
                <button className="testNav invisible"
                    onClick={e => { questionNumberSet(-1) }}>&#9194;Back</button>
                <input  className="testNavLight text-center invisible" type="number" id="questionPage" min="1" max={props.qNumber.toString()} onClick={e => questionNumberSet(e.target.value)}></input>
                <button className="testNav invisible "
                    onClick={e => { questionNumberSet(1) }}>&#9193;Next</button>
                
                <input  className="testNavLight text-center invisible" type="text" value={displayTime} style={{width:'8ch'}} />
                <button className="testNav invisible"
                    onClick={stopTest}>&#128721;Stop</button>  
            </div>
        </Fragment>
    );
}
export default TestNav;
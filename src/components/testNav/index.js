import React, { Fragment, useState } from 'react';
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
               <button className="testNav" id="startNav" style={{position:'absolute', top:'44vh',left:"43vw", zIndex:'200'}}
                onClick={timerDraw}>Start</button>          
                <button className="testNav invisible" style={{position:"absolute", top:'48vh',left:0, background:"transparent", zIndex:1500}}
                    onClick={e => { questionNumberSet(-1) }}>&#9194;Back</button>
                <label className="testNav invisible"style={{margin:0, fontSize:'calc(10px + 1vw)' }} >
                <input  className="testNavLight text-center invisible" style={{width:'3ch',fontSize:'calc(10px + 1vw)'}} type="number" id="questionPage" min="1" max={props.qNumber.toString()} onClick={e => questionNumberSet(e.target.value)}></input>
                of {props.qNumber}</label>
                <button className="testNav invisible " style={{position:"absolute", top:'48vh',right:0, background:"transparent", zIndex:1500}}
                    onClick={e => { questionNumberSet(1) }}>&#9193;Next</button>
                
                <input  className="testNav text-right invisible" type="text" value={displayTime} style={{position:"absolute", background:"transparent", top:'5vh',right:0,padding:0,borderWidth:0, width:'8ch'}} />
                <button className="testNav invisible" style={{position:"absolute", top:0,right:0,width:"4vh",height:"4vh", background:"transparent",borderWidth:'0px', zIndex:1500}}
                    onClick={stopTest}> <svg viewBox="0 0 23 23"  stroke="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.06069 1.06066C1.64647 0.474877 2.59622 0.474877 3.18201 1.06066L21.5668 19.4454C22.1526 20.0312 22.1526 20.981 21.5668 21.5668C20.981 22.1525 20.0312 22.1525 19.4455 21.5668L1.06069 3.18198C0.474901 2.5962 0.474901 1.64645 1.06069 1.06066Z" fill="#f5d142" />
                    <path d="M1.06062 21.5668C0.47483 20.981 0.47483 20.0312 1.06062 19.4454L19.4454 1.06066C20.0312 0.474876 20.9809 0.474876 21.5667 1.06066C22.1525 1.64645 22.1525 2.5962 21.5667 3.18198L3.18194 21.5668C2.59615 22.1525 1.6464 22.1525 1.06062 21.5668Z" fill="#f5d142" />
                </svg></button>  
            
        </Fragment>
    );
}
export default TestNav;
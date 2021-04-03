import React, { Fragment, useState } from 'react';
import AlertMenu from '../alertMenu';
function TestNav(props) {
    var timerInterval
    const [displayTime, setDisplayTime] = useState(stringTime(props.hours, props.minutes, props.seconds));
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    let secondsLeft = props.hours * 3600 + props.minutes * 60 + props.seconds;
    const onReturn = (decision1) => {
        setRevealAlert(false);
        if (decision1 === "Finish") { 
           stopTest();
        }
    }
    function timerDraw(event) {
        let seconds = props.seconds;
        let minutes = props.minutes;
        let hours = props.hours;
        questionNumberSet('0');
        event.preventDefault();
        if ((seconds !== 0) || (minutes !== 0) || (hours !== 0)) {
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
        console.log('end')
        document.querySelector(".testNav").classList.add('invisible');
        let navButton = document.querySelectorAll(".testNav");
        navButton.forEach(function (userItem) {
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
                else {
                    questionNow.value = 1;
                    setAlertStyle({
                        variantHead: "danger",
                        heading: "Warning",
                        text: `Would you like to finish the test?`,
                        color1: "danger",
                        button1: "Finish",
                        color2: "secondary",
                        button2: "Cancel"
                    });
                    setRevealAlert(true);
                }
            }
            if (n === -1) {
                if (questionNow.value === "") { questionNow.value = props.qNumber; }
                else if (parseInt(questionNow.value) > 1) { questionNow.value -= 1 }
                else questionNow.value = props.qNumber;
            }
        } else {
            if (n === "0") {
                let navButton = document.querySelectorAll(".testNav");
                navButton.forEach(function (userItem) {
                    userItem.classList.remove('invisible');
                });
                navButton = document.querySelectorAll(".testNavLight");
                navButton.forEach(function (userItem) {
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
            {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
            <button className="testNav" id="startNav" style={{ position: 'absolute', top: '44vh', left: "43vw", zIndex: '200' }}
                onClick={timerDraw}>Start</button>
            <button className="testNav invisible" style={{ position: "absolute", top: '48vh', left: 0, background: "transparent", zIndex: 1500 }}
                onClick={e => { questionNumberSet(-1) }}>&#9194;Back</button>
            <label className="testNav invisible" style={{ margin:'1.25vh 1vw', fontSize: 'calc(10px + 1vw)' }} >
                <input className="testNavLight text-center invisible" style={{ width: '3ch', fontSize: 'calc(10px + 1vw)' }} type="number" id="questionPage" min="1" max={props.qNumber.toString()} onClick={e => questionNumberSet(e.target.value)}></input>
                of {props.qNumber}</label>
            <button className="testNav invisible " style={{ position: "absolute", top: '48vh', right: 0, background: "transparent", zIndex: 1500 }}
                onClick={e => { questionNumberSet(1) }}>&#9193;Next</button>

            <input className="testNav text-right invisible" type="text" value={displayTime} style={{ position: "absolute", background: "transparent", top: 0, left: '38vw', padding: 0, borderWidth: 0, width: '8ch' }} readOnly />
            <button className="testNav invisible" id="finishBtn"  style={{ position: "absolute", top: 0, right: 0,marginTop:'1.25vh', backgroundImage:`url(${process.env.PUBLIC_URL + "/icons/finish.svg"})`,width: "9vh", height: "3vh", borderWidth: '0px',borderRadius:'5px', zIndex: 1500 }}
                onClick={stopTest}></button>

        </Fragment>
    );
}
export default TestNav;
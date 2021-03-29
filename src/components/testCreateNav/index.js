import React, { useEffect, useState } from 'react';
import "./style.css";
function TestCreateNav(props) {

    const [qArr, setqArr] = useState('');
    const [moveVis, setMoveVis] = useState(false);
    useEffect(() => {
        document.getElementById('questionPage').value = 1;
    }, []);
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < props.qNumber; i++) { arr.push(i + 1) };
        setqArr(arr);
    }, [props.qNumber]);
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
                let navButton = document.querySelectorAll(".testNav");
                navButton.forEach(function (userItem) {
                    userItem.classList.remove('invisible');
                });
                document.querySelector("#startNav").classList.add('invisible');
                questionNow.value = 1;
            } else questionNow.value = n;
        }
        (n === "0") ? props.onChange(0) : props.onChange(parseInt(questionNow.value));
    }
    function deleteRec() {
        props.onDel('');
        let n = document.querySelector("#questionPage");
        let k = ""
        if (parseInt(n.value) !== props.qNumber) {
            k = n.value;
            n.value = k;
        } else {
            k = n.value;
            n.value = (parseInt(k) - 1).toString();
        }
    }
    function visibilityMoveTo() {
        moveVis ? document.querySelector("#moveSelect").classList.remove('invisible') : document.querySelector("#moveSelect").classList.add('invisible');
        setMoveVis(!moveVis)
    }
    return (

        <div className="navContainer" style={{ position: 'relative' }} >
            <h3 style={{ width: '100%', textAlign: "center", fontSize: '4vw', color: '#f5d142' }}><strong>Question editing panel</strong></h3>
            <button className="testNav"
                onClick={e => { questionNumberSet('1') }}>&#9198;</button>
            <button className="testNav"
                onClick={e => { questionNumberSet(-1) }}>&#9194;Back</button>
            <input className="testNavLight text-center" style={{width:'3ch'}} type="number" id="questionPage"  min="1" max={props.qNumber.toString()} onClick={e => questionNumberSet(e.target.value)}></input>
            <button className="testNav"
                onClick={e => { questionNumberSet(1) }}>&#9193;Next</button>
            <button className="testNav"
                onClick={e => { questionNumberSet(props.qNumber.toString()) }}>&#9197;</button>
            <button className="testNav"
                onClick={e => { props.onNew(''); document.querySelector("#questionPage").value = (props.qNumber + 1).toString() }}>&#10133;Add</button>
            <button className="testNav"
                onClick={e => { deleteRec() }}><img src={ process.env.PUBLIC_URL+"/icons/close.svg"} alt="close" style={{width:'max(1.2vw,12px)',height:'max(1.2vw,12px)'}}/>Delete</button>
            <button className="testNav"
                onClick={e => { e.preventDefault(); props.onCopy('') }}>&#128209;Copy</button>
            <button className="testNav"
                onClick={e => { e.preventDefault(); props.onPaste(''); document.querySelector("#questionPage").value = (parseInt(document.querySelector("#questionPage").value) + 1).toString() }}>&#128203;Paste</button>
            <button className="testNav"
                onClick={e => { props.onShow('') }}>&#128240;Preview</button>
            {(props.qNumber > 1) && <button className="testNav"
                onClick={e => { visibilityMoveTo() }}>&#128242;Move to</button>}
            {(props.qNumber > 1) && qArr && <select id="moveSelect" className="testNavLight text-center invisible" onChange={e => {
                props.onMove([parseInt(document.querySelector("#questionPage").value) - 1, parseInt(e.target.value)]);
                document.querySelector("#questionPage").value = (parseInt(e.target.value) + 1).toString()
            }}>
                {qArr.map((option, i) => {
                    return (<option key={i} value={i}>{qArr[i]}</option>)
                }
                )}
            </select>}
        </div>

    );
}
export default TestCreateNav;
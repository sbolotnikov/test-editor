import React, { Fragment, useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import GetAnswers from './GetAnswers.js';
import { Row, Col, Button } from 'react-bootstrap';
var demoArr=[];

function GetQuestion(props) {
    var questionObj={}
    const [question, setQuestion] = useState('');
    const [positions, setPositions] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [img, setImg] = useState('');
    const [layout, setLayout] = useState('');
    const [show, setShow] = useState(false);
    const [rights, setRights] = useState([]);
    const [wrongs, setWrongs] = useState([]);

    // list available layouts
    var layouts = ["simple", "box"];
    useEffect(() => {
        document.querySelector("#question").value=props.q.question;
        document.querySelector("#mainImg").value=props.q.info.img;
        document.querySelector("#positionsCount").value=props.q.info.positions;
        document.querySelector("#correctCount").value=props.q.info.correct;
        document.querySelector("#layout1").value=props.q.info.layout;
        setRights(props.q.rights);
        setWrongs(props.q.wrongs);
        setQuestion(props.q.question);
        setPositions(props.q.info.positions);
        setCorrect(props.q.info.correct);
        setLayout(props.q.info.layout);
        setImg(props.q.info.img);

    },[props.q]);
    function handleReturnData(t, corr) {    
        if (corr){ 
            questionObj.rights=t;
            // setRights(localChoices);
        } else{
             questionObj.wrongs=t;
            //  setWrongs(localChoices);
        }
        props.onChange(questionObj)
    }
    function newRecord(e, corr) {
        if (corr){
            questionObj=props.q.rights;
            console.log(questionObj)
            questionObj.push({ text: '', img: '', choice: true });
            // setRights(questionObj);
         }else{
            questionObj=props.q.wrongs;
            questionObj.push({ text: '', img: '', choice: false });
            // setWrongs(questionObj);
         }
        props.onChange(questionObj) 
    }
    function showLayout(e){
       let arr=rights.slice(0,correct);
       demoArr=wrongs.slice(0,positions-correct);
       for (let i=0; i<arr.length;i++){
           demoArr.push(arr[i]);
       }
       console.log(demoArr);
        (show===false)? setShow(true): setShow(false)
    }

    function delRecord(n, corr) {
        if (corr){
            questionObj=props.q.rights;
            questionObj.splice(n,1);
        } else{
            questionObj=props.q.wrongs;
            questionObj.splice(n,1);
        }
        props.onChange(questionObj)
    }

    return (
        <Fragment>
                    <h3 className='headerStyle'>Enter your question</h3>
                    <textarea id="question" style={{ width: '100%' }} onChange={e => { setQuestion(e.target.value); props.onChange({"question":e.target.value})}} />
                    <h4 className='headerStyle'>Add your question main picture link (if you have one)</h4>
                    <input id="mainImg" style={{ width: '100%' }} onChange={e =>{setImg(e.target.value); props.onChange({"mainImg":e.target.value})}} />
                    <label style={{ width: '100%', color: 'yellow' }}>
                    <select id="layout1" style={{ width: '40%', marginRight: '5px', marginTop: '5px' }} onChange={e => {setLayout(e.target.value); props.onChange({"layout1":e.target.value})}} >
                        {layouts.map((option, i) => {
                            return (           
                                    <option value={option}>{option}</option>                            
                            )
                        }
                        )}
                        </select>
                        Choose question layout
                    </label>
                    <label style={{ width: '50%', color: 'yellow' }}>
                        <input id="positionsCount" type="number" min={0} max={rights.length+wrongs.length} style={{ width: '20%', marginRight: '5px', marginTop: '5px' }} onChange={e =>{setPositions(e.target.value); props.onChange({"positionsCount":e.target.value})}} />
                        How many positions would be displayed?(Maximum should be less then answers options)
                    </label>
                    <label style={{ width: '50%', color: 'yellow' }}>
                        <input id="correctCount" type="number" min={0} max={rights.length} style={{ width: '20%', marginRight: '5px', marginTop: '5px' }} onChange={e =>{setCorrect(e.target.value); props.onChange({"correctCount":e.target.value})}} />
                        How many correct options should be selected?(Maximum should be less then correct answers options)
                    </label>
                    <Row>
                        <Col xs={12} md={6}>
                            <h3 className='headerStyle'>Enter text of the correct answers:</h3>
                           {rights && <GetAnswers answers={rights} correct={true} onDelete={(n) => delRecord(n, 1)} onNew={(e) => newRecord(e, 1)} onChange={(t) => handleReturnData(t, 1)} />}
                        </Col>
                        <Col xs={12} md={6}>
                            <h3 className='headerStyle'>Enter text of the wrong answers:</h3>
                            {wrongs && <GetAnswers answers={wrongs} correct={false} onDelete={(n) => delRecord(n, 0)} onNew={(e) => newRecord(e, 0)} onChange={(t) => handleReturnData(t, 0)} />}
                        </Col>
                        <Button onClick={e=>showLayout(e)} >Preview</Button>
                    </Row>        
                    {show && <QuestionDisplay style={{pointerEvents:'none'}} background={props.background} info={{positions: positions, correct: correct,layout: layout, img:img}}  vis={1} question={question} answers={demoArr} checkedMarks={[]} onChange={(ch) => { }}  />}
        </Fragment >
    )
}
export default GetQuestion;
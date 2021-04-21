import React, { useEffect, useState } from 'react';
import TestNav from '../testNav';
import QuestionDisplay from '../QuestionDisplay';
import ResultsDisplay from '../ResultsDisplay';
import "./style.css";

function TestRun(props) {
  // main test running component. It get the test, generate test, displays navigation(TestNav) and individual questions(QuestionDisplay), and results(ResultsDisplay) in the end, using specific components 
  var quizDuration = [parseInt(props.test.main.hours), parseInt(props.test.main.minutes), parseInt(props.test.main.seconds)];
  var testBackground = props.test.main.background;
  var quizMain = props.test.test;
  var test = [];
  var choiceSet = [];
  const [displayQ, setDisplayQ] = useState(0);
  const [resultTime, setResultTime] = useState('');
  const [choices, setChoices] = useState([]);
  const [results, setResults] = useState([]);
  const [rating, setRating] = useState(0);
  const [visible, setVisible] = useState(0);
  const [testGenerated, setTestGenerated] = useState('');
  function randomizer(arr) {
//  taking question array and randomize the order of options inside
    let testArray = [];
    let answerCount = arr.length;
    let positionN = 0;
    for (let i = 0; i < answerCount; i++) {
      positionN = Math.floor(Math.random() * arr.length)
      testArray.push(arr[positionN]);
      arr.splice(positionN, 1);

    }
    return testArray
  }

  function randomChoice(arr, n) {
    // choosing n random positions from array

    let testArray = [];
    let positionN = 0;
    for (let i = 0; i < n; i++) {
      positionN = Math.floor(Math.random() * arr.length)
      testArray.push(arr[positionN]);
      arr.splice(positionN, 1);
    }
    return testArray
  }
  function handleChoices(ch) {
    // saving user responses to specific question to answers array
    let localChoices = choices;
    localChoices.splice(displayQ, 1, ch);
    console.log(localChoices);
    setChoices(localChoices);

  }
  function handleChangeQuestion(q) {
    // setting another question
    if (q > 0) { setDisplayQ(q - 1) }
    else {
      setDisplayQ(q);
      setVisible(1);

    }
  }
  function correctAnswers() {
    // setting the array of correct answers to specific generated test
    let arr = [];
    let arrSmall = [];
    for (let i = 0; i < testGenerated.length; i++) {
      arrSmall = [];
      for (let j = 0; j < testGenerated[i].answers.length; j++) {
        if (testGenerated[i].answers[j].choice === true) arrSmall.push(j)
      }
      arr.push(arrSmall)
    }
    return arr
  }
  function handleQuizEnd(t) {
    // finishing quiz by compare user choices with array of correct answers, getting percentage of the right answers and time left and setting the state with these parameters
    let arr = [];
    let n = 0;
    console.log(t);
    let correctArr = correctAnswers();
    setVisible(0);
    for (let i = 0; i < correctArr.length; i++) {
      JSON.stringify(correctArr[i]) === JSON.stringify(choices[i]) ? arr.push(true) : arr.push(false);
      if (arr[i] === true) n += 1
    }
    console.log(((n / correctArr.length * 100).toFixed(2)).toString());
    setRating(((n / correctArr.length * 100).toFixed(2)));
    setResults(arr);
    setResultTime(t);
    console.log(results)
  }

  useEffect(() => {
    // gererating the random answers array for the test and randomize their positions. Generate test before it send to display and saving it to state
    console.log(props.test.id)
    let answersSet = [];
    for (let i = 0; i < quizMain.length; i++) {
      answersSet = randomChoice(quizMain[i].rights, quizMain[i].info.correct).concat(randomChoice(quizMain[i].wrongs, quizMain[i].info.positions - quizMain[i].info.correct));
      answersSet = randomizer(answersSet);

      test.push({
        "info": quizMain[i].info,
        "question": quizMain[i].question,
        "answers": answersSet,
      })
      choiceSet.splice(0, 0, [])

    }
    setChoices(choiceSet);
    setTestGenerated(test);
  }, []);
 useEffect(()=>{
  //  if results are finalise displays main navigation bar, otherwise hide it
  (results.length > 0) ? document.querySelector("nav.navbar").style.display = 'flex' :document.querySelector("nav.navbar").style.display = 'none';
 },[results]);


  return (
    <>
      {results.length > 0 && <ResultsDisplay res={results} rate={rating} time={resultTime} background={testBackground} testName={props.test.main.name} testId={props.local?"":props.test.id} />}
      {testGenerated && results.length <= 0 && 
      <div  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '10%' }}>
      <TestNav  qNumber={testGenerated.length} hours={quizDuration[0]} minutes={quizDuration[1]} seconds={quizDuration[2]} onExit={(t) => { handleQuizEnd(t) }} onChange={(q) => { handleChangeQuestion(q) }} />
      </div>
      }
      {testGenerated && results.length <= 0 && <QuestionDisplay background={testBackground} gradient={props.test.main.gradient} status={"test"}  info={testGenerated[displayQ].info} vis={visible} question={testGenerated[displayQ].question} answers={testGenerated[displayQ].answers} checkedMarks={choices[displayQ]} onChange={(ch) => { handleChoices(ch) }} />}
    </>
  )
}

export default TestRun;
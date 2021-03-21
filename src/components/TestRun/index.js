import React, { useEffect, useState } from 'react';
import TestNav from '../testNav';
import QuestionDisplay from '../QuestionDisplay';
import ResultsDisplay from '../ResultsDisplay';
import "./style.css";

function TestRun(props) {
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
    let localChoices = choices;
    localChoices.splice(displayQ, 1, ch)
    setChoices(localChoices);

  }
  function handleChangeQuestion(q) {
    if (q > 0) { setDisplayQ(q - 1) }
    else {
      setDisplayQ(q);
      setVisible(1);

    }
  }
  function correctAnswers() {
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
    console.log(props.test.id)
    let answersSet = [];
    for (let i = 0; i < quizMain.length; i++) {
      answersSet = randomChoice(quizMain[i].rights, quizMain[i].info.correct).concat(randomChoice(quizMain[i].wrongs, quizMain[i].info.positions - quizMain[i].info.correct));
      answersSet = randomizer(answersSet);

      test.push({
        "info": quizMain[i].info,
        "question": quizMain[i].question[0],
        "answers": answersSet,
      })
      choiceSet.splice(0, 0, [])

    }
    setChoices(choiceSet);
    setTestGenerated(test);

  }, []);



  return (
    <>
      {results.length > 0 && <ResultsDisplay res={results} rate={rating} time={resultTime} background={testBackground} testId={props.local?"":props.test.id} />}
      {testGenerated && results.length <= 0 && <TestNav qNumber={testGenerated.length} hours={quizDuration[0]} minutes={quizDuration[1]} seconds={quizDuration[2]} onExit={(t) => { handleQuizEnd(t) }} onChange={(q) => { handleChangeQuestion(q) }} />}
      {testGenerated && results.length <= 0 && <QuestionDisplay background={testBackground} info={testGenerated[displayQ].info} vis={visible} question={testGenerated[displayQ].question} answers={testGenerated[displayQ].answers} checkedMarks={choices[displayQ]} onChange={(ch) => { handleChoices(ch) }} />}
    </>
  )
}

export default TestRun;
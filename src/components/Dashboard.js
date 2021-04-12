import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import firebase from "../firebase";
import Footer from "./Footer";
import "./Login.scss";
 function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser} = useAuth();
  const [testsCreated, setTestsCreated] = useState(0);
  const [testsResultsOnRec, setTestsResultsOnRec] = useState(0); 
  const [testsAverageScore, setTestsAverageScore] = useState(0);
  const [userRating, setUserRating] = useState('BeginnerQuizer');
  const db = firebase.firestore();

  
  async function handleUpdate() {
    setError("")
    window.location.assign(process.env.PUBLIC_URL + '/#/update-profile')
  }
  function fetchTestsCreatedData()  {
     db.collection("tests").where("main.author", "==", currentUser.uid).get()
    .then(result=>{setTestsCreated(result.docs.map(doc => ({ ...doc.data() })).length)})
    .catch(e=>{console.log('fail to get tests for user')})

  }
  function fetchTestsResultsData()  {
    db.collection("results").where("userId", "==", currentUser.uid).get()
   .then(result=>{
     let resArray=result.docs.map(doc => ({ ...doc.data() }));
     let averageRes=0;
     console.log(resArray)
     for (let i=0; i<resArray.length;i++){
       averageRes+=parseFloat(resArray[i].result)  
     }
     let score=0;
     if (resArray.length>0) score=(averageRes/resArray.length).toFixed(3)
    setTestsAverageScore(score); 
    setTestsResultsOnRec(resArray.length)
    let rate='';
    if (score<=100) rate='DiamondQuizer';
    if (score<=90) rate='GoldQuizer';
    if (score<=80) rate='SilverQuizer';
    if (score<=70) rate='BronzeQuizer';
    if (score<=60) rate='BeginnerQuizer';
    setUserRating(rate)
  }).catch(e=>{console.log('fail to get user results')})

 }
  useEffect(() => {
    fetchTestsCreatedData();
    fetchTestsResultsData();
}, []);
  return (
    <div className='mainContainer'>
      <div style={{ width: '98%', maxWidth: "400px", marginTop: '6%' }}>
        <div className='registeCard' style={{ padding: '.75em' }}>
          <h2 className="header1">Welcome
          <img src={process.env.PUBLIC_URL + "/icons/QuizLogo.svg"} alt="logo simple" className='logo' /></h2>
          {error && <label className='alertStyle'>{error}</label>}
          <img style={{ width: '60%', margin: '3% 15%' }} src={currentUser.photoURL > "" ? currentUser.photoURL : process.env.PUBLIC_URL + "/icons/defaultUser.svg"} alt="profile pic" />
          <h2 className="divStyle" style={{ textAlign: 'center', width: '100%', maxWidth: '23ch', margin: 'auto' }}> <strong>@</strong>{currentUser.displayName}</h2>
          <h6 className="divStyle" style={{ textAlign: 'center', textDecoration: 'underline' }} >   {currentUser.email} </h6>
        </div>
        <table style={{ width: '97%',border:"1px solid white",backgroundColor: 'white', borderRadius: '10px', margin:"3% auto"  }} >
                   
                    <tbody >
                    {/* borderBottom: '1px solid lightgrey',   */}
                                <tr style={{backgroundColor: 'white'}}>
                                    <td ><div style={{ whiteSpace: 'wrap', textAlign: 'center', width: "100%" }}>Quiz created:</div></td>
                                    <td> <span style={{ fontStyle: 'oblique', color: '#554FA7' }}>{testsCreated}</span></td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td><div style={{ whiteSpace: 'wrap', textAlign: 'center', width: "100%" }}>Quiz results on file:</div></td>
                                    <td> <span style={{ fontStyle: 'oblique', color: '#554FA7' }}>{testsResultsOnRec}</span></td>
                                </tr>
                                <tr style={{backgroundColor: 'white'}}>
                                    <td><div style={{ whiteSpace: 'wrap', textAlign: 'center', width: "100%" }}>Average Quiz rated:</div></td>
                                    <td> <span style={{ fontStyle: 'oblique', color: '#554FA7' }}>{testsAverageScore}%</span></td>
                                </tr>
                                <tr style={{backgroundColor: 'transparent'}}>
                                 <td><div style={{ whiteSpace: 'wrap', textAlign: 'center', width: "100%", color:'transparent' }}> quiz</div></td>
                                </tr>
                                <tr style={{backgroundColor: 'lightgrey'}} >
                                    <td><div style={{ whiteSpace: 'wrap', textAlign: 'center', width: "100%" }}>Your rate:</div></td>
                                    <td> <span style={{ fontStyle: 'oblique', color: '#554FA7' }}>{userRating}</span></td>
                                </tr>
                            
                    </tbody>
                </table>
                <button className="testNav" style={{ width: '100%', margin: '4% auto' }} onClick={handleUpdate}>
                Update Profile
            </button>        
      </div>
      <Footer />
    </div>
  )
}
export default Dashboard
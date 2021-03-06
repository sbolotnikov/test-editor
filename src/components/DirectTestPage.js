import React, { useEffect, useState } from "react"
import firebase from "../firebase";
import { useParams } from 'react-router-dom'
import TestRun from './TestRun'
export default function DirectTestPage() {
  // page that run test by id. It gets test from the db and runs test
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(false)
  const db = firebase.firestore();
  let { id } = useParams();
  useEffect(() => {
    db.collection("tests").doc(id).get().then((querySnapshot) => {
      setTest({ ...querySnapshot.data(), id: id });
      setLoading(true);
    })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <>
      {loading && <TestRun test={test} local={false} />}
    </>
  )
}
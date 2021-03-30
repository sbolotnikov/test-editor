import React, { useContext, useState } from "react"

const CopyContext = React.createContext()

export function useCopy() {
  return useContext(CopyContext)
}

export function CopyProvider({ children }) {
  const [currentCopyQuestion, setCurrentCopyQuestion] = useState({})
  const [currentCopyAnswer, setCurrentCopyAnswer] = useState({})
  function getCopy(obj,objType) {
      (objType==="question")?setCurrentCopyQuestion(obj):setCurrentCopyAnswer(obj);
      return "ok"
  }
  function pasteCopy(objType) {
    return (objType==="question")?currentCopyQuestion:currentCopyAnswer;
  }

  function deleteCopy() {
    setCurrentCopyQuestion({}) 
    return "done"
  }

  const value = {
    getCopy,
    pasteCopy,
    deleteCopy
  }

  return (
    <CopyContext.Provider value={value}>
      {children}
    </CopyContext.Provider>
  )
}
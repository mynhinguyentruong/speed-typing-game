import React, {useState, useEffect, useRef} from 'react'



function App() {
  const COUNT_DOWN = 10
  const inputRef = useRef(null)

  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(COUNT_DOWN)
  const [isRunning, setIsRunning] = useState(false)
  const [endGame, setEndGame] = useState(false)

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleClick() {
    if(timeRemaining === 0) {
      setTimeRemaining(COUNT_DOWN)
      setIsRunning(false)
      setEndGame(false)
      setWordCount(0)
    }
    else {
      setIsRunning(true)
      setText('')
    } 
  }

  function calculateWords(word) {
    //the argument word passed in is a string
    console.log(word)
    const input = word.trim().split(' ').filter(word => word !== '')
    
  setWordCount(input.length)
    
  }

  useEffect(() => {
    inputRef.current.focus()
    if(isRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      },1000)
    }
    else if(timeRemaining === 0) {
      setIsRunning(false)
      calculateWords(text)
      setEndGame(true)
    }
    
    
  }, [timeRemaining,isRunning])

  return (
    <div >
      <h1>How fast do you type?</h1>
      <textarea
      // Change the text of placeholder from ready to go
        ref={inputRef}
        placeholder={isRunning? 'Go!' : 'Ready...?'}
        name={text}
        value={text}
        onChange={handleChange}
        disabled={!isRunning}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button 
        onClick={handleClick}
        
        >{endGame ? 'Restart' :'Start'}</button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;

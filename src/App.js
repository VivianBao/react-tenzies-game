import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook'
import './App.css';

export default function App() {
  const [dice, setDice] = React.useState(setAllNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: true });
  const [stopWatch, setStopWatch] = React.useState([seconds, minutes])
  const [time, setTime] = React.useState({seconds: 0, minutes: 0})

  React.useEffect(() => {
    setStopWatch([seconds, minutes])
  }, [seconds, minutes])

  React.useEffect(() => {
      const firstDie = dice[0]
      if(dice.every(die => die.isHeld === true)){
        if(dice.every(die => die.value === firstDie.value)){
          setTenzies(true)
          pause()
          console.log("You win!")
        }
      }
  }, [dice])

  function setAllNewDice() {
    const newDiceArray = []
    for (let i=0;i < 10; i++){
      newDiceArray.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    return newDiceArray
  }

  function roll() {
    if(!tenzies){
      setDice(prevDice => {
          return prevDice.map(prevDie => {
            return prevDie.isHeld ?
            {...prevDie}
            : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
            }
          })
      })
    } else {
      setDice(setAllNewDice())
      setTenzies(false)
      pause()
      setTime({
        seconds: seconds,
        minutes: minutes
      })
      reset()
    }
  }

  function holdDie(id) {
    setDice(prevDice => {
      return prevDice.map(oldDie => {
        return oldDie.id === id ? {...oldDie, isHeld: !oldDie.isHeld} : {...oldDie}
      })
    })
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={() => holdDie(die.id)}/>)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="timer">
        <span>{stopWatch[1]}</span><span className="timer-text">min</span><span>{stopWatch[0]}</span><span className="timer-text">sec</span>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={roll}>{tenzies ? "Start New Game" : "Roll"}</button>
    </main>
  );
}

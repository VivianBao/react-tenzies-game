import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import './App.css';

export default function App() {
  const [dice, setDice] = React.useState(setAllNewDice())

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

  function setNewGame() {
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
      <h1 className="title">Tenzies</h1>
      <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={setNewGame}>Roll</button>
    </main>
  );
}

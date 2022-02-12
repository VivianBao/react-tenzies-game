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
    setDice(setAllNewDice())
  }

  const diceElements = dice.map(die => <Die value={die.value} />)

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

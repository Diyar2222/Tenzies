import React, {useState,useEffect} from "react"
import Dice from "./Dice";
function App() {
  const [dices, setDices] = useState(allDices()) // dices container
  const [gameWon,setGameWon] = useState(false) //checks for game end
  const [counter,setCounter] = useState(0) // for counting number of clicks
  const [timer,setTimer] = useState(0) // counting time spent to win
  const [startTimer,setStartTimer] = useState(false)

  const minutes = Math.floor(timer/60)
  const seconds = timer % 60
  //timer 
  useEffect(()=>{
    const interval = setInterval(()=>{
      startTimer && setTimer(time=>time+1)
    },1000)
    return ()=>clearInterval(interval)
  },[startTimer])
  //establishing 10 dice values
  function allDices(){
    let newArr = []
    for(let i=0;i<10;i++){
      newArr.push(generateNewDice())
    }
    return newArr
  }
  //generating new Dice with random number and other two elements
  function generateNewDice(){
    return {
      value: Math.ceil(Math.random()*6),
      id: Math.random()*10000,
      isHeld:false
    }
  }  
  //toggles the hold values
  const holdId = (id)=>{
    setDices(dices.map(item=>{
      if(item.id===id){
        return {
          ...item,
          isHeld:!item.isHeld
        }
      }
      return item
    }))
    setStartTimer(true)
  }
  //checks for game win
  useEffect(()=>{
    let valueOfFirst = dices[0].value
    let valueOfDice = dices.every(item=>valueOfFirst===item.value)
    let valueOfIsHeld = dices.every(item=>item.isHeld)
    if(valueOfDice && valueOfIsHeld){
      setGameWon(true)
      setStartTimer(false)
    }
  },[dices])
  // new dices for those whose hold value is false
  const newDices = () => {
    if(!gameWon){
      setDices(dices.map(item=>{
        return item.isHeld===false ? generateNewDice() : item
      }))
      setCounter(prev=>prev+1)
    } else {
      setGameWon(false)
      setDices(allDices())
      setCounter(0)
      setStartTimer(false)
      setTimer(0)
    }
  }
  // ten dices with random numbers
  const tenDices = dices.map(dice=>{
    return <Dice 
    key={dice.id}
    num={dice.value}
    id={dice.id}
    holdId={holdId}
    isHeld={dice.isHeld}
    />
  })
  return (
    <div className="outer-container">
      <div className="inner-container">
        <h1 className="title">Tenzies</h1>
        <p className="description">Roll until all dice are the same. Click each die to freeze it at its current
          value between rolls
        </p>
        <div className="dices-container">
          {tenDices}
        </div>
        <button onClick={newDices} className="roll-btn">{`${gameWon ? 'New game':'Roll'}`}</button>
        {gameWon && <h2>You won!</h2>}
        <div>You clicked {counter} times</div>
        <div>Time spent to win: {`${minutes < 10 ? "0"+minutes:minutes}:${seconds < 10 ? "0"+seconds:seconds}`}</div>
      </div>
    </div>
  );
}

export default App;

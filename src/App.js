import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages= [
  {"src": "./img/carmander.png", matched: false },
  {"src": "./img/pikachu.png", matched: false },
  {"src": "./img/pokemon1.png", matched: false },
  {"src": "./img/pokemon2.png", matched: false },
  {"src": "./img/psyduck.png", matched: false },
  {"src": "./img/scarlet.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState([]);
  const [matched, setMatched] =useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle card
  const shuffleCards = () => {
    const ShuffledCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=> ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(ShuffledCards)
    setTurns(0)
  }

 // handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare two cards
  useEffect (()=> {
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched : true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
       
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start a new game automatically
  useEffect(()=> {
   
      shuffleCards()
   
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards} >New Game</button>

      <div className="card-grid">
        {cards.map(card => (
           <SingleCard 
           key={card.id}
           card={card} 
           handleChoice={handleChoice}
           flipped={card === choiceOne  || card === choiceTwo || card.matched}
           disabled={disabled} />
        ))}
      </div>
          <p>Turns: {turns}</p>
    </div>
  );
}

export default App

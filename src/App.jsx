import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/card/SingleCard'
import Win from './components/Win/win'
const cardImages = [
  { "src": "img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCard] = useState([])
  const [turn, setTurn] = useState(0) // تعداد مراحلی که پیش رفته ایم 
  const [choisOne, setChoisone] = useState(null)
  const [choistwo, setChoistwo] = useState(null)
  const [disabled, setDisabled] = useState(null)
  const [win, setWine] = useState(false)

  const shufflecard = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .map((card, index) => ({ ...card, id: index })) // اضافه کردن آی‌دی به هر کارت
      .sort(() => Math.random() - 0.5)

    setCard(shuffleCards)
    setTurn(0)

  }

  const handelChoise = (card) => {
    choisOne ? setChoistwo(card) : setChoisone(card)
  }
  useEffect(() => { shufflecard() }, [])
  useEffect(() => {
    if (choisOne && choistwo) {
      if (choisOne.src === choistwo.src) {
        setDisabled(true)
        setCard(prevcard => {
          return prevcard.map(
            card => {
              if (card.src === choisOne.src || card.src === choistwo.src) {
                return { ...card, matched: true }
              }
              else {
                return card
              }
            }
          )
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000)
      }




    }

  }, [choisOne, choistwo])
  console.log(cards);

  const resetTurn = () => {
    const winargs = cards.map((card) => {
      if (card.matched === true) {
        return true
      }
      else {
        return false
      }
    })
    if (winargs.every((val) => { return val === true })) {
      setWine(true)
    }
    else {
      console.log('no win win win')
    }
    setChoisone(null)
    setChoistwo(null)
    setTurn(prev => prev + 1)
    setDisabled(false)
  }

  return (
    <>
      {win && <Win />}
      <h1>Memory Game</h1>

      <button onClick={shufflecard} > New game </button>
      <h2>turn number : {turn}</h2>
      <div className='card_graid'>
        {
          cards.map(card => (
            <SingleCard key={card.id} card={card} handelChoise={handelChoise} disabled={disabled} flipped={card === choisOne || card === choistwo || card.matched} />
          ))
        }
      </div>
    </>
  )
}

export default App

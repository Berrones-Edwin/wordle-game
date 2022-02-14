import { useWindow } from '../hooks/useWindow'
import { useState, useEffect, KeyboardEvent } from 'react'
import { GameStatus } from '../types/type'
import RowCompleted from './RowCompleted'
import RowCurrent from './RowCurrent'
import RowEmpty from './RowEmpty'
import { keys } from '../Data/keys'
import Modal from './Modal'
import Words from '../Data/words.json'

const Wordle = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState('')
  const [turn, setTurn] = useState(1)
  const [currentWord, setCurrentWord] = useState('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState(GameStatus.Playing)

  useWindow('keydown', handleKeyDown)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Words.length)
    setWordOfTheDay(Words[randomIndex].toUpperCase())
  }, [])

  function handleKeyDown(event: KeyboardEvent) {
    const letter = event.key.toUpperCase()
    if (gameStatus !== GameStatus.Playing) return
    if (event.key === 'Backspace' && currentWord.length > 0) onDelete()

    if (event.key === 'Enter' && currentWord.length === 5 && turn <= 6)
      onEnter()

    if (currentWord.length === 5) return

    if (keys.includes(letter)) onInput(letter)
  }
  function onInput(letter: string) {
    let newWord = currentWord + letter
    setCurrentWord(newWord)
  }
  function onDelete() {
    let newWord = currentWord.slice(0, -1)
    setCurrentWord(newWord)
  }
  function onEnter() {
    if (currentWord === wordOfTheDay) {
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Won)
      alert('You win')
      return
    }
    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Lost)
      return
    }

    if (!Words.includes(currentWord.toLowerCase())) {
      alert("That's word  not exist!!❌")
      setCurrentWord('')
      return
    } else {
      setCompletedWords([...completedWords, currentWord])
      setTurn(turn + 1)
      setCurrentWord('')
    }
  }
  function resetGame() {
    window.location.reload()
  }
  return (
    <>
      <h1>Wordle React</h1>
      {gameStatus === GameStatus.Won ? (
        <Modal
          type="won"
          completedWords={completedWords}
          solution={wordOfTheDay}
          resetGame={resetGame}
        />
      ) : gameStatus === GameStatus.Lost ? (
        <Modal
          type="lost"
          completedWords={completedWords}
          solution={wordOfTheDay}
          resetGame={resetGame}
        />
      ) : null}
      {completedWords.map((word, i) => (
        <RowCompleted key={i} word={word} solution={wordOfTheDay} />
      ))}
      {gameStatus === GameStatus.Won ? null : <RowCurrent word={currentWord} />}

      {Array.from(Array(6 - turn)).map((_, i) => (
        <RowEmpty key={i} />
      ))}
    </>
  )
}

export default Wordle

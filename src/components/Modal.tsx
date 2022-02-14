import styles from '../styles/modal.module.scss'
import Square from './Square'

interface ModalProps {
  type: 'won' | 'lost'
  completedWords: string[]
  solution: string
  resetGame: () => void
}

const Modal = ({ type, completedWords, solution, resetGame }: ModalProps) => {
  const handleResetGame = () => resetGame()
  return (
    <div className={styles.modalViewContainer}>
      <div className={styles.modalContainer}>
        <h2>You {type === 'won' ? 'won!' : 'lost'}</h2>

        <div className={styles.puzzle}>
          {completedWords.map((word, i) => (
            <Square key={i} word={word} solution={solution} />
          ))}
        </div>
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
    </div>
  )
}

export default Modal

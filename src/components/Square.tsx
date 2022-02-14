import styles from '../styles/modal.module.scss'

interface SquareProps {
  word: string
  solution: string
}

const Square = ({ word, solution }: SquareProps) => {
  function checkLetter(letter: string, pos: number): string {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) return '🟩'
      else return '🟨'
    } else return '🟫'
  }

  return (
    <div className={styles.puzzleWord}>
      {word.split('').map((letter, i) => (
        <div key={i}>{checkLetter(letter, i)}</div>
      ))}
    </div>
  )
}

export default Square

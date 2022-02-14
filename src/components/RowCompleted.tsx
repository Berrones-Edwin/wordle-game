import { BoxStatus } from '../types/type'
import styles from '../styles/row.module.scss'
import Box from './Box'
interface RowCompletedProps {
  word: string
  solution: string
}
const RowCompleted = ({ word, solution }: RowCompletedProps) => {
  const arr = Array.from(Array(5))

  function checkLetter(letter: string, position: number): BoxStatus {
    if (solution.includes(letter)) {
      if (solution[position] === letter) return 'correct'
      else return 'present'
    } else return 'absent'
  }

  return (
    <div className={styles.row}>
      {arr.map((_, i) => (
        <Box key={i} value={word[i]} status={checkLetter(word[i], i)} />
      ))}
    </div>
  )
}

export default RowCompleted

import Box from './Box'
import styles from '../styles/row.module.scss'

interface RowCurrentProps {
  word: string
}

const RowCurrent = ({ word }: RowCurrentProps) => {
  const wordArray = word.split('')

  return (
    <div className={styles.row}>
      {wordArray.map((letter, i) => (
        <Box key={i} value={letter} status={'edit'} />
      ))}
      {Array.from(Array(5 - wordArray.length)).map((_, i) => (
        <Box key={i} value={''} status={'edit'} />
      ))}
    </div>
  )
}

export default RowCurrent

import classNames from 'classnames/bind'
import { BoxStatus } from '../types/type'
import styles from '../styles/box.module.scss'

interface BoxProps {
  value: string
  status: BoxStatus
}

const classes = classNames.bind(styles)
const Box = ({ value, status }: BoxProps) => {

  const boxStatus = classes({
    correct: status === 'correct',
    present: status === 'present',
    absent: status === 'absent',
    empty: status === 'empty',
    edit: status === 'edit'
  })

  return <div className={boxStatus}>{value}</div>
}

export default Box

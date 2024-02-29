import { parseISO, format, getDay } from 'date-fns'
import classNames from 'classnames/bind'
import styles from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(styles)

const DAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
]

function Heading({ date }: { date: string }) {
  const weddingDate = parseISO(date)
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}

export default Heading

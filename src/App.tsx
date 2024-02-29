import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import classNames from 'classnames/bind'

import FullScreenMessage from '@shared/FullScreenMessage'

import Heading from './components/sections/Heading'
import Video from './components/sections/Video'

import { Wedding } from '@models/wedding'
import ImageGallery from './components/sections/ImageGallery'
import Intro from './components/sections/Intro'
import Invitation from './components/sections/Invitation'
import Calendar from './components/sections/Calendar'
const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //1. 웨딩 데이터 호출
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) throw new Error('서버 응답이 실패했습니다.')
        return res.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <FullScreenMessage type="loading" />

  if (error) return <FullScreenMessage type="error" />

  if (wedding === null) return null

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      {JSON.stringify(wedding)}
    </div>
  )
}

export default App

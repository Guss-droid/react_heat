import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import io from 'socket.io-client'

import logoImg from '../../assets/logo.svg'
import styles from './styles.module.scss'

type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string
  }
}

const messageQeue: MessageProps[] = []

const socket = io('http://localhost:8080')

socket.on('new_message', (newMessage: MessageProps) => {
  messageQeue.push(newMessage)
})

export function MessageList() {

  const [message, setMessage] = useState<MessageProps[]>([])

  useEffect(() => {
    const time = setInterval(() => {
      if (messageQeue.length > 0) {
        setMessage(prevState => [
          messageQeue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))

        messageQeue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get<MessageProps[]>('/message/last').then(res => {
      setMessage(res.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="Dowhile 2021" />

      <ul className={styles.messageList}>
        {message.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>
              {message.text}
            </p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
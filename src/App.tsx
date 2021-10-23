import { useContext } from 'react'

import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessage } from './components/SendMessageForm'
import { AuthContext } from './context/auth'

import styles from './App.module.scss'
import { Perfil } from './components/Perfil'

export function App() {

  const { user, renderPerfil } = useContext(AuthContext)

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      {renderPerfil ?
        <Perfil />
        :
        <>
          <MessageList />
          {!!user ? <SendMessage /> : <LoginBox />}
        </>
      }
    </main>
  )
}
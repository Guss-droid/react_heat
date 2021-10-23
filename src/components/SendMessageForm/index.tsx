import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessage() {

  const [message, setMessage] = useState('')
  const { user, signOut, goToPerfil } = useContext(AuthContext)

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    if (!message.trim()) {
      return
    }

    await api.post('/message', { message })

    setMessage('')
  }

  return (
    <div className={styles.sendMessageWrapper}>
      <button onClick={signOut} className={styles.buttonSignOut}>
        <VscSignOut size="32" />
      </button>

      <header onClick={goToPerfil} className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>
          {user?.name}
        </strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={styles.form}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button type="submit">
          Enviar mensagem
        </button>
      </form>
    </div>
  )
}
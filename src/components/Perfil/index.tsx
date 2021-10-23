import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';
import { NavBar } from '../NavBar';
import styles from './styles.module.scss';

type GetMessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

export function Perfil() {

  const { user, backToHome } = useContext(AuthContext)
  const [getMessages, setGetMessages] = useState<GetMessageProps[]>()

  useEffect(() => {
    async function handleGetMessages() {
      const result = await api.get<GetMessageProps[]>(`/message/${user?.id}`)
      setGetMessages(result.data)
    }

    handleGetMessages()
  })

  return (
    <div>
      <NavBar />

      <ul className={styles.messageList}>
        {getMessages?.map((message) => (
          <li key={message.id} className={styles.messages}>
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
      <button onClick={backToHome}>
        Voltar
      </button>
    </div>
  );
}
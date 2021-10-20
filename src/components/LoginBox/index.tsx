import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'

export function LoginBox() {

  const {signInUrl, user} = useContext(AuthContext)

  console.log(user)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compratilhe sua menssagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="22" />
        Entrar com Github
      </a>
    </div>
  )
}
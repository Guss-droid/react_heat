import { useContext } from 'react';
import logoImg from '../../assets/logo.svg'
import { AuthContext } from '../../context/auth';
import styles from './styles.module.scss';

export function NavBar() {

  const { user } = useContext(AuthContext)

  return (
    <div className={styles.currentNavbar}>
      <header>
        <img
          className={styles.logoDowhile}
          src={logoImg}
          alt="Dowhile 2021"
        />
        <span className={styles.userName}>
          {user?.name}
          </span>
        <img
          className={styles.imgUser}
          src={user?.avatar_url}
          alt="Foto do user"
        />
      </header>
    </div>
  );
}
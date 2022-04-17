import React from 'react';
import useAuth from '../../hooks/use-auth';
import Button from './button';
import styles from './navbar.module.scss';

const LoginButton = (): JSX.Element => {
  const { authState, loginWithGoogle, logout } = useAuth();

  if (authState === null) {
    return (
      <span className={styles['navbar__login--loading']}>Cargando...</span>
    );
  }

  const handleClick = !authState ? () => loginWithGoogle() : () => logout();

  return (
    <Button onClick={handleClick}>
      {`${!!authState ? 'Cerrar' : 'Iniciar'} sesión`}
    </Button>
  );
};

const Navbar = (): JSX.Element => {
  return (
    <nav className={styles['navbar']}>
      <span className={styles['navbar__brand']}>impr3siones</span>
      <LoginButton />
    </nav>
  );
};

export default Navbar;

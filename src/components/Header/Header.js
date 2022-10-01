import React from 'react';

import logo from '../../assets/images/logo.png';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" />
    </header>
  );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { NavigationButton } from './NavigationButton';
import logo from '../../assets/img/logo2.png';

export function NavigationBar(): JSX.Element {
  return (
    <>
      <div className={styles.navbar}>
        <NavLink to="/accueil" className={styles.navBarLogo}>
          <img
            className={`${styles.logo} hvr-grow`}
            src={logo}
            width="50"
            alt="logo"
          ></img>
        </NavLink>
        <NavigationButton to="accueil" />
        <NavigationButton to="fiches techniques" />
        <NavigationButton to="mercurial" />
        <NavigationButton to="liste des allergenes" />
      </div>
    </>
  );
}

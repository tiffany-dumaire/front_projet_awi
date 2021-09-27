import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { NavigationButton } from './NavigationButton';
import logo from '../../assets/img/logo.png';

export function NavigationBar(): JSX.Element {
  return (
    <>
      <div className={styles.navbar}>
        <NavLink to="/accueil" className={styles.navBarLogo}>
          <img
            className={`${styles.logo} hvr-grow`}
            src={logo}
            width="60"
            alt="logo"
          ></img>
        </NavLink>
        <NavigationButton to="accueil" />
        <NavigationButton to="profil" />
        <NavigationButton to="activites" />
        <NavigationButton to="login" />
      </div>
    </>
  );
}

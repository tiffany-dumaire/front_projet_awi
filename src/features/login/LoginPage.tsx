import React from 'react';
import styles from './LoginPage.module.css';
import { Helmet } from 'react-helmet';
import logo from '../../assets/img/login.jpg';
import accueil from '../../assets/img/logo.png';
import { NavLink } from 'react-router-dom';

export function LoginPage(): JSX.Element {
  return(
    <>
      <Helmet>
        <title>{'AWI | Login'}</title>
      </Helmet>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />
      <div className={styles.loginContainer}>
        <div>
          <img className={styles.accueilLogo} alt="accueil" src={accueil} />
        </div>
        <div className={styles.loginForm}>
          <div className={styles.row}>
            <label className={styles.label}>Identifiant</label>
            <input type="text"></input>  
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Mot de passe</label>
            <input type="text"></input> 
          </div>
          <div className={styles.row}>
            <div className={styles.loginButton}>
              {/* <button
                className={styles.button}
                
              >
                Login
              </button> */}
              <NavLink to="/accueil" className={styles.button}>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

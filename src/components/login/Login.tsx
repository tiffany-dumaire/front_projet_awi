import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Login.module.css';

export const Login: React.FunctionComponent = () => {
    return (  
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
    );
}
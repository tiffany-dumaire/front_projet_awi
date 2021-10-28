import React from 'react';
import styles from './Register.module.css';

export type RegisterProps = {
    setChange: (change: boolean) => void;
  };

export const Register: React.FunctionComponent<RegisterProps> = (props: RegisterProps) => {
    return (
        <div className={styles.registerForm}>
          <div className={styles.row}>
            <label className={styles.label}>Pseudo</label>
            <input type="text"></input>  
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Prénom</label>
            <input type="text"></input> 
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Nom</label>
            <input type="text"></input> 
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Email</label>
            <input type="text"></input> 
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Mot de passe</label>
            <input type="text"></input> 
          </div>
          <div className={styles.row}>
            <div className={styles.registerButton}>
              {/* <button
                className={styles.button}
                
              >
                Login
              </button> */}
              <button onClick={() => props.setChange(true)} className={styles.button}>
                Register
              </button>
            </div>
          </div>
        </div>
    );
}
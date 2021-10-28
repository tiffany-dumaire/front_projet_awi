import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Helmet } from 'react-helmet';
import logo from '../../assets/img/login.jpg';
import accueil from '../../assets/img/logo.png';
import { Login } from '../../components/login/Login';
import { Register } from '../../components/register/Register';

export function LoginPage(): JSX.Element {
  const [change, setChange] = useState<boolean>(false);
  
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
        {change ? (
            <div className={styles.buttonDiv}>
              <button className={styles.setLoginButton2} onClick={() => setChange(false)}>
                Register
              </button>
              <button className={styles.setLoginButton} onClick={() => setChange(true)}>
                Login
              </button>
            </div>
          ) : (
            <div className={styles.buttonDiv}>
              <button className={styles.setLoginButton} onClick={() => setChange(false)}>
                Register
              </button>
              <button className={styles.setLoginButton2} onClick={() => setChange(true)}>
                Login
              </button>
            </div>
          )
        }
        <div className={styles.formulaire}>
            {change ? (
              <div className={styles.signUpsignIn}>
                <Login />
              </div>
            ) : (
              <div className={styles.signUpsignIn}>
                <Register setChange={(change: boolean) => setChange(change)} />
              </div>
            )}
          </div>
      </div>
    </>
  );
}

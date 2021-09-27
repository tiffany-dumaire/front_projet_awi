import React from 'react';
import styles from './ProfilePage.module.css';
import { Helmet } from 'react-helmet';

export function ProfilePage(): JSX.Element {
  return(
    <>
      <Helmet>
        <title>{'AWI | Profil'}</title>
      </Helmet>
      <div className={styles.profileContainer}>
        grr
      </div>
    </>
  );
}
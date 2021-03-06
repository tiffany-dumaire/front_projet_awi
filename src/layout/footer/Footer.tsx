import React from 'react';
import styles from './Footer.module.css';

export function Footer(): JSX.Element {
  return (
    <div className={styles.footer}>
      <div className={styles.informations}>
        <p>© 2022, AWI Project - Tiffany DUMAIRE - IG4.</p>
      </div>
      <div className={styles.links}>
        <a className={styles.link} href="/parameters">
          Paramètres de l'application
        </a>
        <div>|</div>
        <a className={styles.link} href="/about" target="_blank">
          À propos
        </a>
        <div>|</div>
        <a className={styles.link} href="https://www.lyceehoteliergeorgesfreche.fr/" target="_blank" rel="noreferrer">
          Site du lycée
        </a>
      </div>
    </div>
  );
}

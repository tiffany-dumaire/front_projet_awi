import React from 'react';
import styles from './Footer.module.css';

export function Footer(): JSX.Element {
  return (
    <div className={styles.footer}>
      <div className={styles.informations}>
        <p>© 2021, AWI Project - Tiffany DUMAIRE - IG4.</p>
      </div>
      <div className={styles.links}>
        <a className={styles.link} href="mailto:tiffany.dumaire@etu.umontpellier.fr">
          Contact
        </a>
        <div>|</div>
        <a className={styles.link} href="/about" target="_blank">
          À propos
        </a>
        <div>|</div>
        <a className={styles.link} href="/policies" target="_blank">
          Conditions d'utilisation
        </a>
      </div>
    </div>
  );
}

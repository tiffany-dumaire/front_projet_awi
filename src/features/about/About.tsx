import React from 'react';
import { Helmet } from 'react-helmet';
import { TeamCard } from '../../components/teamCard/TeamCard';
import styles from './About.module.css';
import picture from '../../assets/img/picture.jpg';

export function About(): JSX.Element {
  return (
    <>
        <Helmet>
            <title>{'AWI | A Propos'}</title>
        </Helmet>
        <div className={styles.aboutContainer}>
            <h1>A propos - Projet AWI 2021</h1>
            <h2>Equipe</h2>
            <TeamCard nom={'Dumaire'} prenom={'Tiffany'} picture={picture} class={4} groupeTD={2} fonction={'Etudiante'} />
            <h2>Objectifs du projet</h2>
            <h3>Utilisateurs :</h3>
            <ul>
            <li>U1</li>
            <li>U2</li>
            <li>U3</li>
            </ul>
            <h3>Les grandes fonctionnalités :</h3>
            <ul>
            <li>F1</li>
            <li>F2</li>
            <li>F3</li>
            <li>F4</li>
            <li>F5</li>
            </ul>
        </div>
    </>
  );
}

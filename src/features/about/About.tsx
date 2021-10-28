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
            <h2>Objectifs du projet</h2>
            <h3>Les grandes fonctionnalités :</h3>
            <ul>
            <li>
              Accéder au mercurial
              <ul>
                <li>Voir le détail des ingrédients</li>
                <li>Modifier les ingrédients</li>
                <li>Rechercher un ingrédient</li>
              </ul>
            </li>
            <li>
              Gérer la liste des allergènes
              <ul>
                <li>Voir les allergènes</li>
                <li>Ajouter un allergène</li>
              </ul>
            </li>
            <li>
              Accéder à la liste des fiches techniques
              <ul>
                <li>Créer une fiche technique</li>
                <li>Modifier une fiche technique</li>
                <li>Rechercher une fiche technique</li>
              </ul>
            </li>
            <li>
              Calcul des coûts
              <ul>
                <li>Coût matière</li>
                <li>Coût des charges (fluides + personnel)</li>
                <li>Coût de production par portion</li>
                <li>Prix de vente</li>
              </ul>
            </li>
            <li>
              Gestion des stocks
              <ul>
                <li>Réalisation ventes (plats vendus ou à emporter)</li>
              </ul>
            </li>
            <li>
              Impression pdf d'une fiche technique
              <ul>
                <li>Avec coûts</li>
                <li>Sans coûts</li>
              </ul>
            </li>
            <li>
              Créer des étiquettes
              <ul>
                <li>Correspondant à une vente</li>
                <li>Ne correspondant pas à une vente</li>
              </ul>
            </li>
          </ul>
        </div>
    </>
  );
}

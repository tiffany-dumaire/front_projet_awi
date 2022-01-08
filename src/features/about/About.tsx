import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './About.module.css';

export function About(): JSX.Element {

  /* const printDiv = () => {
    let divContents = document.getElementById("GFG")!.innerHTML;
    let a = window.open('', '', 'height=auto, width=auto')!;
    a.document.write('<html>');
    a.document.write(`<head><title>${'A Propos'}</title></head>`);
    a.document.write('<body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  } */

  return (
    <>
      <Helmet>
          <title>{'AWI | A Propos'}</title>
      </Helmet>
      <div id={'GFG'} className={styles.aboutContainer}>
        <h1>A propos - Projet AWI 2021</h1>
        <h2>Objectifs du projet</h2>
        <h3>Les grandes fonctionnalités :</h3>
        <ul>
          <li>
            Accéder au mercurial
            <ul>
              <li><s>Voir le détail des ingrédients</s></li>
              <li><s>Rechercher un ingrédient</s></li>
              <li><s>Ajouter un ingrédient</s></li>
              <li><s>Modifier les ingrédients</s></li>
              <li><s>Imprimer une fiche ingrédient</s></li>
              <li><s>Supprimer un ingrédient</s></li>
            </ul>
          </li>
          <li>
            Gérer la liste des allergènes
            <ul>
              <li><s>Voir les allergènes</s></li>
              <li>Rechercher un allergène</li>
            </ul>
          </li>
          <li>
            Accéder à la liste des fiches techniques
            <ul>
              <li><s>Voir les fiches techniques</s></li>
              <li><s>Rechercher une fiche technique</s></li>
              <li><s>Créer une fiche technique</s></li>
              <li><i>Modifier une fiche technique</i></li>
              <li><s>Supprimer une fiche technique</s></li>
            </ul>
          </li>
          <li>
            <i>Calcul des coûts</i>
            <ul>
              <li><s>Coût matière</s></li>
              <li><s>Coût des charges (fluides + personnel)</s></li>
              <li><s>Coût de production par portion</s></li>
              <li><s>Prix de vente</s></li>
              <li><s>Prix de vente par portion</s></li>
              <li><s>Bénéfices</s></li>
              <li><s>Bénéfices par portion</s></li>
              <li><i>Taux de marge sur coûts variables</i></li>
              <li><i>Seuil de rentabilité</i></li>
            </ul>
          </li>
          <li>
            <i>Gestion des stocks</i>
            <ul>
              <li><i>Réalisation ventes (plats vendus ou à emporter)</i></li>
              <li><s>Vente test (le stock ne bouge pas -- voir partie création des étiquettes)</s></li>
              <li><s>Réaliser une entrée de stock complète</s></li>
              <li><s>Réaliser une entrée de stock par catégorie</s></li>
              <li><i>Réaliser une entrée de stock par choix d'ingrédient</i></li>
            </ul>
          </li>
          <li>
            Impression pdf d'une fiche technique
            <ul>
              <li><s>Avec coûts</s></li>
              <li><s>Sans coûts</s></li>
            </ul>
          </li>
          <li>
            Créer des étiquettes
            <ul>
              <li><i>Correspondant à une vente</i></li>
              <li><s>Ne correspondant pas à une vente</s></li>
            </ul>
          </li>
          <li><s>Paramètres de l'application</s></li>
        </ul>
       {/*  <button onClick={() => window.print()}>Print</button> 
        <button onClick={() => printDiv()}>Print</button>*/}
      </div>
    </>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './About.module.css';

export function About(): JSX.Element {

  const printDiv = () => {
    let divContents = document.getElementById("GFG")!.innerHTML;
    let a = window.open('', '', 'height=auto, width=auto')!;
    a.document.write('<html>');
    a.document.write('<body > <h1>Div contents are <br>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }

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
            </ul>
          </li>
          <li>
            Gérer la liste des allergènes
            <ul>
              <li><s>Voir les allergènes</s></li>
            </ul>
          </li>
          <li>
            Accéder à la liste des fiches techniques
            <ul>
              <li><s>Voir les fiches techniques</s></li>
              <li><s>Rechercher une fiche technique</s></li>
              <li><i>Créer une fiche technique</i></li>
              <li><i>Modifier une fiche technique</i></li>
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
            <i>Gestion des stocks</i>
            <ul>
              <li>Réalisation ventes (plats vendus ou à emporter)</li>
              <li>Vente test (le stock ne bouge pas -- voir partie création des étiquettes)</li>
              <li><s>Réaliser une entrée de stock complète</s></li>
              <li><s>Réaliser une entrée de stock par catégorie</s></li>
              <li><i>Réaliser une entrée de stock par choix d'ingrédient</i></li>
            </ul>
          </li>
          <li>
            Impression pdf d'une fiche technique
            <ul>
              <li>Avec coûts</li>
              <li><i><s>Sans coûts</s>(manque juste la mise en pdf à faire en local à la fin)</i></li>
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
       {/*  <button onClick={() => window.print()}>Print</button> */}
        <button onClick={() => printDiv()}>Print</button>
      </div>
    </>
  );
}

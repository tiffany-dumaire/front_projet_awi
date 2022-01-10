import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './About.module.css';

export function About(): JSX.Element {

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
              <li>Voir le détail des ingrédients : en cliquant sur l'une des loupes dans les catégories du mercurial vous pourrez accéder au détail des ingrédients</li>
              <li>Rechercher un ingrédient : utiliser la barre de recherche dans le mercurial, si vous recherchez par catégorie, alors entrez dans la catégorie avant de lancer une recherche</li>
              <li>Ajouter un ingrédient : dans le mercurial ouvrez le menu de gauche et cliquer sur "Ajouter un ingrédient au mercurial"</li>
              <li>Modifier les ingrédients : dans le détail de l'ingrédient, cliquer sur le bouton "Editer la fiche produit"</li>
              <li>Imprimer une fiche ingrédient: dans le détail de l'ingrédient, cliquer sur le bouton "Imprimer la fiche produit"</li>
              <li>Supprimer un ingrédient : dans le détail de l'ingrédient, cliquer sur le bouton "Supprimer la fiche produit"</li>
            </ul>
          </li>
          <li>
            Gérer la liste des allergènes
            <ul>
              <li>Voir les allergènes : dans le menu en haut de votre site cliquer sur "Liste des allergènes"</li>
              <li>Rechercher un allergène: dans la liste des allergènes, lancer une recherche dans la catégorie de votre choix, en dehors des catégories cela recherche un ingrédient allergène ou non</li>
            </ul>
          </li>
          <li>
            Accéder à la liste des fiches techniques
            <ul>
              <li>Voir les fiches techniques : dans le menu en haut de votre site cliquer sur "Fiches techniques"</li>
              <li>Rechercher une fiche technique : dans la liste des fiches techniques, lancer la recherche et vous aurez un résultat par nom de fiche / nom d'ingrédient</li>
              <li>Créer une fiche technique : dans la liste des fiches techniques ouvrez le menu de gauche et cliquer sur "Créer une fiche technique"</li>
              <li>Cloner une fiche technique : dans le détail d'une fiche technique, descendez sous les coûts et indiquer un nouveau nombre de couverts avant de cliquer sur cloner</li>
              <li>Modifier une fiche technique : dans le détail d'une fiche technique, cliquer sur "Modifier la fiche technique"</li>
              <li>Supprimer une fiche technique : dans le détail d'une fiche technique, cliquer sur "Supprimer la fiche technique"</li>
            </ul>
          </li>
          <li>
            <i>Calcul des coûts (ils seront tous affichés dans le détail d'une fiche technique)</i>
            <ul>
              <li>Coût matière</li>
              <li>Coût des charges fixes (fluides + personnel)</li>
              <li>Prix de vente</li>
              <li>Prix de vente par portion</li>
              <li>Bénéfices</li>
              <li>Bénéfices par portion</li>
              <li>Taux de marge sur coûts variables</li>
              <li>Seuil de rentabilité</li>
            </ul>
          </li>
          <li>
            <i>Gestion des stocks</i>
            <ul>
              <li>Réalisation ventes (plats vendus ou à emporter) : dans le menu du haut de votre site, cliquer sur "Stocks" puis cliquer ensuite sur la carte "Editer une étiquette" lorsque vous serez dans les paramètres de l'étiquette pensez bien à checker la variable "vente"=true</li>
              <li>Vente test (le stock ne bouge pas -- voir partie création des étiquettes) : dans le menu du haut de votre site, cliquer sur "Stocks" puis cliquer ensuite sur la carte "Editer une étiquette" lorsque vous serez dans les paramètres de l'étiquette pensez bien à checker la variable "vente"=false</li>
              <li>Réaliser une entrée de stock complète : dans le menu du haut de votre site, cliquer sur "Stocks" puis cliquer ensuite sur la carte "Gestion des entrées de stock", puis la carte "Réaliser une entrée de stock complète"</li>
              <li>Réaliser une entrée de stock par catégorie : dans le menu du haut de votre site, cliquer sur "Stocks" puis cliquer ensuite sur la carte "Gestion des entrées de stock", puis la carte "Réaliser une entrée de stock par catégorie"</li>
              <li>Réaliser une entrée de stock par choix d'ingrédient : dans le menu du haut de votre site, cliquer sur "Stocks" puis cliquer ensuite sur la carte "Gestion des entrées de stock", puis la carte "Réaliser une entrée de stock pour une liste d'ingrédients"</li>
            </ul>
          </li>
          <li>
            Impression pdf d'une fiche technique
            <ul> Dans le détail de la fiche technique, cocher ou décocher "Afficher/Masquer les coûts"
              <li>Avec coûts</li>
              <li>Sans coûts</li>
            </ul>
          </li>
          <li>
            Créer des étiquettes
            <ul> Lorsque vous réaliser une vente, pensez à cocher ou décocher la variable "vente"
              <li>Correspondant à une vente</li>
              <li>Ne correspondant pas à une vente</li>
            </ul>
          </li>
          <li>Paramètres de l'application : dans le pied de page, cliquer sur le lien "Paramètres de l'application"</li>
        </ul>
      </div>
    </>
  );
}

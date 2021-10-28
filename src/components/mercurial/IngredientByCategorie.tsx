import React from 'react';
import styles from './IngredientByCategorie.module.css';

export type IngredientByCategorieProps = {
    id_categorie: number;
    categorie: string;
};

export const IngredientByCategorie: React.FunctionComponent<IngredientByCategorieProps> = (props: IngredientByCategorieProps) => {
    return (
        <div className={styles.categorie}>
            {
                //Mercurial de la catégorie avec possibilité d'accéder à la modification des ingrédients
                //- Nom de la catégorie
                //- Tableau des ingrédients avec Code | Libelle | unité | prix unitaire | stock | valeur du stock (calculé = prix_unitaire * stock) | accès fiche produit | accès modification du produit
            }
        </div>
    );
}
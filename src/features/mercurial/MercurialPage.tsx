import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCategories } from '../../api/categorie.api';
import { getIngredients } from '../../api/ingredient.api';
import { CategorieCard } from '../../components/mercurial/CategorieCard';
import { Categorie_Interface } from '../../interfaces/Categorie.interface';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import { Categorie } from '../../models/Categorie.model';
import styles from './MercurialPage.module.css';

export function MercurialPage(): JSX.Element {
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    const [categories, setCategories] = useState<Categorie_Interface[]>([]);

    useEffect(() => {
        getIngredients().then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(ingredient);
                setIngredients(ingredients.slice(0));
            }); 
        });

        getCategories().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });

        categories.push(new Categorie(0, 'TOUS','#660066'));
        setCategories(categories.slice(0));
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'Mercurial'}</title>
            </Helmet>
            <div className={styles.container}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
                <div className={styles.mercurialContainer}>
                    {
                        categories.map((categorie: Categorie_Interface) => (
                            <CategorieCard id_categorie={categorie.id_categorie} categorie={categorie.categorie} color={categorie.color} />
                        ))        
                    }
                </div>
                {/* {ingredients.length > 0 ? 
                    (<table className={styles.mercurial}>
                        <thead>
                            <th>Code</th>
                            <th>Libellé</th>
                            <th>Unité</th>
                            <th>Prix unitaire</th>
                            <th>Quantité en stock</th>
                            <th>Valeur du stock</th>
                        </thead>
                        <tbody>
                            { 
                                ingredients.map((ingredient: Ingredient_Interface) => (
                                    <tr>
                                        <td>{ingredient.code}</td>
                                        <td className={styles.alignLeft}>{ingredient.libelle}</td>
                                        <td>{ingredient.unite}</td>
                                        <td className={styles.alignRight}>{ingredient.prix_unitaire} €</td>
                                        <td className={styles.alignRight}>{ingredient.stock}</td>
                                        <td className={styles.alignRight}>{ingredient.prix_unitaire * ingredient.stock} €</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>) : null
                } */}
            </div>
        </>
    );
}
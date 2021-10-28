import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getIngredients } from '../../api/ingredient.api';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import styles from './MercurialPage.module.css';

export function MercurialPage(): JSX.Element {
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);

    useEffect(() => {
        getIngredients().then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(ingredient);
                setIngredients(ingredients.slice(0));
            }); 
        });
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'Mercurial'}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
                {ingredients.length > 0 ? 
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
                                        <td>{ingredient.libelle}</td>
                                        <td>{ingredient.unite}</td>
                                        <td>{ingredient.prix_unitaire}</td>
                                        <td>{ingredient.stock}</td>
                                        <td>{ingredient.prix_unitaire * ingredient.stock}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>) : null
                }
            </div>
        </>
    );
}
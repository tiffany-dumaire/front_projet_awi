import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getAllergenes } from '../../api/ingredient.api';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import styles from './ListeAllergenesPage.module.css';

export function ListeAllergenesPage(): JSX.Element {
    const [allergenes, setAllergenes] = useState<Ingredient_Interface[]>([]);

    useEffect(() => {
        getAllergenes().then((list) => {
            list.forEach((ingredient) => {
                allergenes.push(ingredient);
                setAllergenes(allergenes.slice(0));
            }); 
        });
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Liste des allergènes'}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
                {allergenes.length > 0 ? 
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
                                allergenes.map((ingredient: Ingredient_Interface) => (
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
                }
            </div>
        </>
    );
}
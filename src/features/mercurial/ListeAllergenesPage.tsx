import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategoriesAllergenes } from '../../api/categorie.api';
import { getAllergenes } from '../../api/ingredient.api';
import { CategorieAllergenesCard } from '../../components/mercurial/CategorieAllergenesCard';
import { Categorie_Allergenes_Interface } from '../../interfaces/Categorie_Allergenes.interface';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import { Categorie_Allergenes } from '../../models/Categorie_Allergernes.model';
import styles from './ListeAllergenesPage.module.css';

export function ListeAllergenesPage(): JSX.Element {
    const [allergenes, setAllergenes] = useState<Ingredient_Interface[]>([]);
    const [categories, setCategories] = useState<Categorie_Allergenes_Interface[]>([]);

    useEffect(() => {
        getAllergenes().then((list) => {
            list.forEach((ingredient) => {
                allergenes.push(ingredient);
                setAllergenes(allergenes.slice(0));
            }); 
        });

        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });

        categories.push(new Categorie_Allergenes(0, 'TOUS','#660066'));
        setCategories(categories.slice(0));
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Liste des allergènes'}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
                <div className={styles.mercurialContainer}>
                    {
                        categories.map((categorie: Categorie_Allergenes_Interface) => (
                            <Link className={styles.link} to={`/liste des allergenes/byCategorie/${categorie.id_categorie_allergene}`}>
                                <CategorieAllergenesCard id_categorie_allergene={categorie.id_categorie_allergene} categorie_allergene={categorie.categorie_allergene} color_allergene={categorie.color_allergene} />
                            </Link>
                        ))        
                    }
                </div>
                {/* {allergenes.length > 0 ? 
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
                } */}
            </div>
        </>
    );
}
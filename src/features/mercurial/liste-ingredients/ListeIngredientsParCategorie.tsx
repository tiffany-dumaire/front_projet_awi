import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getIngredients, getIngredientsByCategorie } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { IoIosArrowBack } from 'react-icons/io';
//import { SketchPicker, PhotoshopPicker, SwatchesPicker } from 'react-color';
import styles from './ListeIngredientsParCategorie.module.css';
import { Loading } from '../../../components/loading/Loading';


export function ListeIngredientsParCategorie(): JSX.Element {
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    const { id_categorie } = useParams<{ id_categorie: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    async function getIngredientList() {
        if (Number(id_categorie) === 0) {
            await getIngredients().then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                });
                setLoading(true);
            });
        }else {
            await getIngredientsByCategorie(Number(id_categorie)).then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                }); 
                setLoading(true);
            });
        }  
    };

    useEffect(() => {
        getIngredientList();        
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Ingrédients | '}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.mercurialContainer}>
                        <Link className={styles.link} to={`/mercurial`}>
                            <IoIosArrowBack /> Retour au mercuriale
                        </Link>
                        {/* <SwatchesPicker /> */}
                        <input placeholder="rechercher un catégorie ou un ingrédient"></input>
                        {ingredients.length > 0 ? 
                            (<table className={styles.mercurial}>
                                <thead>
                                    <th className={styles.th}>Code</th>
                                    <th className={styles.th}>Libellé</th>
                                    <th className={styles.th}>Unité</th>
                                    <th className={styles.th}>Prix unitaire</th>
                                    <th className={styles.th}>Quantité en stock</th>
                                    <th className={styles.th}>Valeur du stock</th>
                                </thead>
                                <tbody>
                                    { 
                                        ingredients.map((ingredient: Ingredient_Interface) => (
                                            <tr>
                                                <td className={styles.td}>{ingredient.code}</td>
                                                <td className={styles.alignLeft}>{ingredient.libelle}</td>
                                                <td className={styles.td}>{ingredient.unite}</td>
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
                ) : 
                (
                    <div className={styles.mercurialContainer}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
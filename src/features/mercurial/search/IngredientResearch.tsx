import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { searchIngredients, searchIngredientsByCategorie, searchIngredientsByCategorieAllergene } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import styles from './IngredientResearch.module.css';
import { Loading } from '../../../components/loading/Loading';
import { FcSearch } from "react-icons/fc";
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';

export function IngredientResearch(): JSX.Element {
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    const { word } = useParams<{ word: string }>();
    const { id_categorie } = useParams<{ id_categorie: string }>();
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    async function getIngredientList() {
        if (id_categorie !== undefined) {
            await searchIngredientsByCategorie(word, Number(id_categorie)).then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                });
                setLoading(true);
            });
        } else {
            if (id_categorie_allergene !== undefined) {
                await searchIngredientsByCategorieAllergene(word, Number(id_categorie_allergene)).then((list) => {
                    list.forEach((ingredient) => {
                        ingredients.push(ingredient);
                        setIngredients(ingredients.slice(0));
                    });
                    setLoading(true);
                });
            } else {
                await searchIngredients(word).then((list) => {
                    list.forEach((ingredient) => {
                        ingredients.push(ingredient);
                        setIngredients(ingredients.slice(0));
                    });
                    setLoading(true);
                });
            }
        }
    };

    useEffect(() => {
        getIngredientList();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'🍳 "' + word + '"| Recherche 🍳'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <SidebarMenu 
                            width={300} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/mercurial', name: 'Rechercher un ingrédient'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/mercurial`}>
                                Retour au mercurial
                            </Link>
                            <Link className={styles.link2} to={`/liste des allergenes`}>
                                Retour aux allergènes
                            </Link>
                        </div>
                        <div className={styles.ingredientContainer}>
                            <p>Vous avez obtenu {ingredients.length} résultats.</p>
                            {ingredients.length > 0 ? 
                                (<table className={styles.mercurial}>
                                    <thead>
                                        <tr>
                                            <th className={styles.th}>Code</th>
                                            <th className={styles.th}>Libellé</th>
                                            <th className={styles.th}>Unité</th>
                                            <th className={styles.th}>Prix unitaire</th>
                                            <th className={styles.th}>Quantité en stock</th>
                                            <th className={styles.th}>Valeur du stock</th>
                                            <th className={styles.th}>Voir la fiche produit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            ingredients.map((ingredient: Ingredient_Interface) => (
                                                <tr key={ingredient.code}>
                                                    <td className={styles.td}>{ingredient.code}</td>
                                                    <td className={styles.alignLeft}>{ingredient.libelle}</td>
                                                    <td className={styles.td}>{ingredient.unite}</td>
                                                    <td className={styles.alignRight}>{ingredient.prix_unitaire} €</td>
                                                    <td className={styles.alignRight}>{ingredient.stock}</td>
                                                    <td className={styles.alignRight}>{ingredient.prix_unitaire * ingredient.stock} €</td>
                                                    <td className={styles.td}>
                                                        <Link className={styles.button} to={`/mercurial/ingredient/${ingredient.code}`}>
                                                            <FcSearch className={styles.iconeSearch}/>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>) : null
                            }
                        </div>
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
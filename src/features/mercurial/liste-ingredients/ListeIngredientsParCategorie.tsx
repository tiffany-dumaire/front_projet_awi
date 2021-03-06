import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getIngredients, getIngredientsByCategorie } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import styles from './ListeIngredientsParCategorie.module.css';
import { Loading } from '../../../components/loading/Loading';
import { FcSearch } from "react-icons/fc";
import { SearchIngredient } from '../../../components/search-bar/ingredients/SearchIngredient';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { Categorie_Interface } from '../../../interfaces/Categorie.interface';
import { getCategorieById } from '../../../api/categorie.api';

export function ListeIngredientsParCategorie(): JSX.Element {
    //ingrédient de la catégorie donnée en paramètre
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    //catégorie donnée en paramètre
    const [categorie,  setCategorie] = useState<Categorie_Interface>();
    //Paramètre de l'url
    const { id_categorie } = useParams<{ id_categorie: string }>();
    //loading
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Récupération de la liste des ingrédients pour une catégorie donnée en url
     */
    async function getIngredientList() {
        if (Number(id_categorie) === 0) {
            await getIngredients().then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                });
            });
        }else {
            await getIngredientsByCategorie(Number(id_categorie)).then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                }); 
            });
        }  
    };

    useEffect(() => {
        getCategorieById(Number(id_categorie)).then((result) => setCategorie(result));
        getIngredientList();
        setTimeout(
            () => setLoading(true),
            2000
        );        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{`🍳 ${Number(id_categorie) === 0 ? 'Tous' : categorie?.categorie} | Ingrédients 🍳`}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <SidebarMenu 
                            width={320} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/mercurial', name: 'Rechercher un ingrédient'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/phases/create', name: 'Créer une étape'},
                                    {to: '/phases', name: 'Liste des phases'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/mercurial`}>
                                Retour au mercuriale
                            </Link>
                        </div>
                        <div className={styles.searchContainer}>
                            <SearchIngredient />
                        </div>
                        <div className={styles.ingredientContainer}>
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
                                            <th className={styles.th}>Allergene</th>
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
                                                    <td className={styles.alignRight}>{ingredient.prix_unitaire.toFixed(2)} €</td>
                                                    <td className={styles.alignRight}>{ingredient.stock}</td>
                                                    <td className={styles.alignRight}>{(ingredient.prix_unitaire * ingredient.stock).toFixed(2)} €</td>
                                                    <td className={styles.td}>{ingredient.allergene ? 'Oui' : 'Non'}</td>
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
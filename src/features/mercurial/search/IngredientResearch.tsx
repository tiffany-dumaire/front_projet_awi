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
    //liste des ingrédients qui résultent de la recherche
    const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    //Paramètre de l'url
    const { word } = useParams<{ word: string }>();
    const { id_categorie } = useParams<{ id_categorie: string }>();
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();
    //loading
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Récupération du résultat de la recherche
     */
    async function getIngredientList() {
        if (id_categorie !== undefined) {
            await searchIngredientsByCategorie(word, Number(id_categorie)).then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                });
            });
        } else {
            if (id_categorie_allergene !== undefined) {
                await searchIngredientsByCategorieAllergene(word, Number(id_categorie_allergene)).then((list) => {
                    list.forEach((ingredient) => {
                        ingredients.push(ingredient);
                        setIngredients(ingredients.slice(0));
                    });
                });
            } else {
                await searchIngredients(word).then((list) => {
                    list.forEach((ingredient) => {
                        ingredients.push(ingredient);
                        setIngredients(ingredients.slice(0));
                    });
                });
            }
        }
    };

    useEffect(() => {
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
                <title>{`🍳 "${word}" | Recherche 🍳`}</title>
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
                                Retour au mercurial
                            </Link>
                            <Link className={styles.link2} to={`/liste des allergenes`}>
                                Retour aux allergènes
                            </Link>
                        </div>
                        <div className={styles.ingredientContainer}>
                            <h3 className={styles.alignLeft}>Résultats obtenus par nom d'ingrédient</h3>
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
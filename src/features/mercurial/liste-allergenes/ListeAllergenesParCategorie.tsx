import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getAllergenes, getAllergenesByCategorie } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { IoIosArrowBack } from 'react-icons/io';
//import { SketchPicker, PhotoshopPicker, SwatchesPicker } from 'react-color';
import styles from './ListeAllergenesParCategorie.module.css';
import { Loading } from '../../../components/loading/Loading';
import { FcSearch } from 'react-icons/fc';
import { SearchAllergene } from '../../../components/search-bar/allergenes/SearchAllergene';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';


export function ListeAllergenesParCategorie(): JSX.Element {
    const [allergenes, setAllergenes] = useState<Ingredient_Interface[]>([]);
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    async function getAllergenesList() {
        if (Number(id_categorie_allergene) === 0) {
            await getAllergenes().then((list) => {
                list.forEach((ingredient) => {
                    allergenes.push(ingredient);
                    setAllergenes(allergenes.slice(0));
                }); 
                setLoading(true);
            });
        }else {
            await getAllergenesByCategorie(Number(id_categorie_allergene)).then((list) => {
                list.forEach((ingredient) => {
                    allergenes.push(ingredient);
                    setAllergenes(allergenes.slice(0));                    
                }); 
                setLoading(true);
            });
        }  
    };

    useEffect(() => {
        getAllergenesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Allergènes | '}</title>
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
                            <Link className={styles.link} to={`/liste des allergenes`}>
                                <IoIosArrowBack /> Retour à la liste des allergènes
                            </Link>
                        </div>
                        <div className={styles.searchContainer}>
                            <SearchAllergene />
                        </div>
                        <div className={styles.ingredientContainer}>
                            {allergenes.length > 0 ? 
                                (
                                    <table className={styles.mercurial}>
                                        <thead>
                                            <th className={styles.th}>Code</th>
                                            <th className={styles.th}>Libellé</th>
                                            <th className={styles.th}>Unité</th>
                                            <th className={styles.th}>Prix unitaire</th>
                                            <th className={styles.th}>Quantité en stock</th>
                                            <th className={styles.th}>Valeur du stock</th>
                                            <th className={styles.th}>Voir la fiche produit</th>
                                        </thead>
                                        <tbody>
                                            { 
                                                allergenes.map((allergene: Ingredient_Interface) => (
                                                    <tr>
                                                        <td className={styles.td}>{allergene.code}</td>
                                                        <td className={styles.alignLeft}>{allergene.libelle}</td>
                                                        <td className={styles.td}>{allergene.unite}</td>
                                                        <td className={styles.alignRight}>{allergene.prix_unitaire} €</td>
                                                        <td className={styles.alignRight}>{allergene.stock}</td>
                                                        <td className={styles.alignRight}>{allergene.prix_unitaire * allergene.stock} €</td>
                                                        <td className={styles.td}>
                                                            <Link className={styles.button} to={`/mercurial/ingredient/${allergene.code}`}>
                                                                <FcSearch className={styles.iconeSearch}/>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Il n'existe pas encore d'allergène répertorié appartenant à cette catégorie dans notre base de données.</p>
                                )
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
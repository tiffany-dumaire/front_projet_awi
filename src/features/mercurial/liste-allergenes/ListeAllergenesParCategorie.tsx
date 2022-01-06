import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getAllergenes, getAllergenesByCategorie } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import styles from './ListeAllergenesParCategorie.module.css';
import { Loading } from '../../../components/loading/Loading';
import { FcSearch } from 'react-icons/fc';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { Categorie_Allergenes_Interface } from '../../../interfaces/Categorie_Allergenes.interface';
import { getCategorieAllergeneById } from '../../../api/categorie.api';


export function ListeAllergenesParCategorie(): JSX.Element {
    //liste des allergenes de la catégorie donnée en url
    const [allergenes, setAllergenes] = useState<Ingredient_Interface[]>([]);
    //research
    const [research, setResearch] = useState<Ingredient_Interface[]>([]);
    //catégorie donnée dans l'url
    const [categorie, setCategorie] = useState<Categorie_Allergenes_Interface>();
    //Paramètre de l'url
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //mot de recherche
    const [word, setWord] = useState<string>('');

    /**
     * Recherche les allergènes en fonction de "word"
     */
    const searchAllergenes = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = allergenes.filter(allergene => allergene.libelle.toLowerCase().match(regex));
        setResearch(searchResult);
    }

    /**
     * Récupération de la liste des allergènes pour la catégorie donnée dans l'url
     */
    async function getAllergenesList() {
        if (Number(id_categorie_allergene) === 0) {
            await getAllergenes().then((list) => {
                setAllergenes(list);
                setResearch(list);
            });
        }else {
            await getAllergenesByCategorie(Number(id_categorie_allergene)).then((list) => {
                setAllergenes(list);
                setResearch(list);
            });
        }  
    };

    useEffect(() => {
        getCategorieAllergeneById(Number(id_categorie_allergene)).then((result) => setCategorie(result));
        getAllergenesList();
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{`☠️ ${Number(id_categorie_allergene) === 0 ? 'Tous' : categorie?.categorie_allergene} | Allergènes ☠️`}</title>
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
                            <Link className={styles.link} to={`/liste des allergenes`}>
                                Retour à la liste des allergènes
                            </Link>
                        </div>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchBar}>
                                <input
                                    placeholder="Rechercher un allergène par son libellé..."
                                    className={styles.search}
                                    type='text'
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setWord(ev.target.value)}
                                    value={word}
                                ></input>
                                <button 
                                    className={styles.button2}
                                    onClick={
                                        () => {
                                            searchAllergenes();
                                        }
                                    }
                                >
                                    <FcSearch className={styles.buttonSearch} /> Rechercher un allergène
                                </button>
                            </div>
                        </div>
                        <div className={styles.ingredientContainer}>
                            {research.length > 0 ? 
                                (
                                    <table className={styles.mercurial}>
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
                                                research.map((allergene: Ingredient_Interface) => (
                                                    <tr key={allergene.code}>
                                                        <td className={styles.td}>{allergene.code}</td>
                                                        <td className={styles.alignLeft}>{allergene.libelle}</td>
                                                        <td className={styles.td}>{allergene.unite}</td>
                                                        <td className={styles.alignRight}>{allergene.prix_unitaire.toFixed(2)} €</td>
                                                        <td className={styles.alignRight}>{allergene.stock}</td>
                                                        <td className={styles.alignRight}>{(allergene.prix_unitaire * allergene.stock).toFixed(2)} €</td>
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
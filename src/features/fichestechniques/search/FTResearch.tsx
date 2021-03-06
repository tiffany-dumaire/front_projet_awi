import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import styles from './FTResearch.module.css';
import { FcSearch } from "react-icons/fc";
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { searchFTbyIngredient, searchFTbyIngredientAndCategorie, searchFTbyLibelle, searchFTbyLibelleAndCategorie } from '../../../api/fiche_technique.api';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { LoadingFiche } from '../../../components/loading/loading-fiche/LoadingFiche';

export function FTResearch(): JSX.Element {
    //résultat de la recherche par libelle
    const [fichesTechniquesLibelle, setFichesTechniquesLibelle] = useState<Fiche_Technique_Interface[]>([]);
    //résultat de la recherche par ingrédient
    const [fichesTechniquesIngredient, setFichesTechniquesIngredient] = useState<Fiche_Technique_Interface[]>([]);
    //paramètre de l'url
    const { word } = useParams<{ word: string }>();
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    //loading
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Recherche des fiches techniques par ingrédient en fonction de "word"
     */
    async function getFTListByIngredient() {
        if (id_categorie_fiche !== undefined) {
            await searchFTbyIngredientAndCategorie(word, Number(id_categorie_fiche)).then((list) => {
                setFichesTechniquesIngredient(list);
            });
        } else {
            await searchFTbyIngredient(word).then((list) => {
                setFichesTechniquesIngredient(list);
            });
        }  
    };

    /**
     * Recherche des fiches techniques par libellé en fonction de "word"
     */
    async function getFTListByLibelle() {
        if (id_categorie_fiche !== undefined) {
            await searchFTbyLibelleAndCategorie(word, Number(id_categorie_fiche)).then((list) => {
                setFichesTechniquesLibelle(list);
            });
        } else {
            await searchFTbyLibelle(word).then((list) => {
                setFichesTechniquesLibelle(list);
            });
        }  
    };

    useEffect(() => {
        getFTListByIngredient();
        getFTListByLibelle();
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
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/phases/create', name: 'Créer une étape'},
                                    {to: '/phases', name: 'Liste des phases'},
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/mercurial', name: 'Voir le mercurial'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/fiches techniques`}>
                                Retour aux fiches techniques
                            </Link>
                        </div>
                        <div className={styles.ficheTechniqueContainer}>
                            <h3 className={styles.alignLeft}>Résultats obtenus par intitulé de recette</h3>
                            <p>Vous avez obtenu {fichesTechniquesLibelle.length} résultats.</p>
                            {fichesTechniquesLibelle.length > 0 ? 
                                (<table className={styles.fichePresentation}>
                                    <thead>
                                        <tr>
                                            <th className={styles.th}>Identifiant</th>
                                            <th className={styles.th}>Libellé</th>
                                            <th className={styles.th}>Nombre de couverts</th>
                                            <th className={styles.th}>Responsable</th>
                                            <th className={styles.th}>Aperçu de la fiche technique</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            fichesTechniquesLibelle.map((ft: Fiche_Technique_Interface) => (
                                                <tr key={ft.id_fiche_technique}>
                                                    <td className={styles.td}>{ft.id_fiche_technique}</td>
                                                    <td className={styles.alignLeft}>{ft.libelle_fiche_technique}</td>
                                                    <td className={styles.td}>{ft.nombre_couverts}</td>
                                                    <td className={styles.alignRight}>{ft.intitule_responsable}</td>
                                                    <td className={styles.td}>
                                                        <Link className={styles.button} to={`/fiches techniques/details/${ft.id_fiche_technique}`}>
                                                            <FcSearch className={styles.iconeSearch}/>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>) : <p>Il n'existe actuellement aucune fiche technique faisant partie de cette catégorie.</p>
                            }
                        </div>
                        <div className={styles.ficheTechniqueContainer}>
                            <h3 className={styles.alignLeft}>Résultats obtenus en fonction des noms d'ingrédients contenus dans la recette</h3>
                            <p>Vous avez obtenu {fichesTechniquesIngredient.length} résultats.</p>
                            {fichesTechniquesIngredient.length > 0 ? 
                                (<table className={styles.fichePresentation}>
                                    <thead>
                                        <tr>
                                            <th className={styles.th}>Identifiant</th>
                                            <th className={styles.th}>Libellé</th>
                                            <th className={styles.th}>Nombre de couverts</th>
                                            <th className={styles.th}>Responsable</th>
                                            <th className={styles.th}>Aperçu de la fiche technique</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            fichesTechniquesIngredient.map((ft: Fiche_Technique_Interface) => (
                                                <tr key={ft.id_fiche_technique}>
                                                    <td className={styles.td}>{ft.id_fiche_technique}</td>
                                                    <td className={styles.alignLeft}>{ft.libelle_fiche_technique}</td>
                                                    <td className={styles.td}>{ft.nombre_couverts}</td>
                                                    <td className={styles.alignRight}>{ft.intitule_responsable}</td>
                                                    <td className={styles.td}>
                                                        <Link className={styles.button} to={`/fiches techniques/details/${ft.id_fiche_technique}`}>
                                                            <FcSearch className={styles.iconeSearch}/>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>) : <p>Il n'existe actuellement aucune fiche technique faisant partie de cette catégorie.</p>
                            }
                        </div>
                    </div>
                ) : 
                (
                    <div className={styles.mercurialContainer}>
                        <LoadingFiche />
                    </div>
                )
            }
        </>
    );
}
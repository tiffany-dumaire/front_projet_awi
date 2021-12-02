import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import styles from './FTResearch.module.css';
import { Loading } from '../../../components/loading/Loading';
import { FcSearch } from "react-icons/fc";
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { searchFTbyIngredient, searchFTbyIngredientAndCategorie, searchFTbyLibelle, searchFTbyLibelleAndCategorie } from '../../../api/fiche_technique.api';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';

export function FTResearch(): JSX.Element {
    const [fichesTechniquesLibelle, setFichesTechniquesLibelle] = useState<Fiche_Technique_Interface[]>([]);
    const [fichesTechniquesIngredient, setFichesTechniquesIngredient] = useState<Fiche_Technique_Interface[]>([]);
    const { word } = useParams<{ word: string }>();
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    const [loading, setLoading] = useState<boolean>(false);

    async function getFTListByIngredient() {
        if (id_categorie_fiche !== undefined) {
            await searchFTbyIngredientAndCategorie(word, Number(id_categorie_fiche)).then((list) => {
                list.forEach((ft) => {
                    fichesTechniquesIngredient.push(ft);
                    setFichesTechniquesIngredient(fichesTechniquesIngredient.slice(0));
                });
            });
        } else {
            await searchFTbyIngredient(word).then((list) => {
                list.forEach((ft) => {
                    fichesTechniquesIngredient.push(ft);
                    setFichesTechniquesIngredient(fichesTechniquesIngredient.slice(0));
                });
            });
        }  
    };

    async function getFTListByLibelle() {
        if (id_categorie_fiche !== undefined) {
            await searchFTbyLibelleAndCategorie(word, Number(id_categorie_fiche)).then((list) => {
                list.forEach((ft) => {
                    fichesTechniquesLibelle.push(ft);
                    setFichesTechniquesLibelle(fichesTechniquesLibelle.slice(0));
                });
            });
        } else {
            await searchFTbyLibelle(word).then((list) => {
                list.forEach((ft) => {
                    fichesTechniquesLibelle.push(ft);
                    setFichesTechniquesLibelle(fichesTechniquesLibelle.slice(0));
                });
            });
        }  
    };

    useEffect(() => {
        getFTListByIngredient();
        getFTListByLibelle();
        setLoading(true);        
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
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '', name: 'Imprimer une fiche technique'},
                                    {to: '/phases/create', name: 'Créer une étape'},
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                ]
                            }
                        />
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/fiches techniques`}>
                                Retour aux fiches techniques
                            </Link>
                        </div>
                        <div className={styles.ficheTechniqueContainer}>
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
                                                    <td className={styles.alignRight}>{ft.id_responsable}</td>
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
                                                    <td className={styles.alignRight}>{ft.id_responsable}</td>
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
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
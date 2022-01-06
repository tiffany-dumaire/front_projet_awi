import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './FicheTechniqueCategory.module.css';
import { Loading } from '../../../components/loading/Loading';
import { SearchFiche } from '../../../components/search-bar/fiches-techniques/SearchFiche';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { deleteFicheTechnique, getFichesTechniques, getFTByCategorie } from '../../../api/fiche_technique.api';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';

export function FicheTechniqueCategory(): JSX.Element {
    const [fichesTechniques, setFichesTechniques] = useState<Fiche_Technique_Interface[]>([]);
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    //changement de vue
    const history = useHistory();

    async function getFichesTechniquesList() {
        if (Number(id_categorie_fiche) === 0) {
            await getFichesTechniques().then((list) => {
                list.forEach((ft) => {
                    fichesTechniques.push(ft);
                    setFichesTechniques(fichesTechniques.slice(0));
                });
                setLoading(true);
            });
        } else {
            await getFTByCategorie(Number(id_categorie_fiche)).then((list) => {
                list.forEach((ft) => {
                    fichesTechniques.push(ft);
                    setFichesTechniques(fichesTechniques.slice(0));
                }); 
                setLoading(true);
            }); 
        }
    };

    /**
     * Supprimer la fiche technique
     */
     const deleteFT = (id_fiche_technique: number) => {
        deleteFicheTechnique(id_fiche_technique).then(() => {
            history.push(`/fiches techniques`);
        });
    }

    useEffect(() => {
        getFichesTechniquesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'📋 <nom catégorie> | Fiches Techniques 📋'}</title>
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
                        <div className={styles.searchContainer}>
                            <SearchFiche />
                        </div>
                        <div className={styles.ficheTechniqueContainer}>
                            {fichesTechniques.length > 0 ? 
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
                                            fichesTechniques.map((ft: Fiche_Technique_Interface) => (
                                                <tr key={ft.id_fiche_technique}>
                                                    <td className={styles.td}>{ft.id_fiche_technique}</td>
                                                    <td className={styles.alignLeft}>{ft.libelle_fiche_technique}</td>
                                                    <td className={styles.td}>{ft.nombre_couverts}</td>
                                                    <td className={styles.alignRight}>{ft.intitule_responsable}</td>
                                                    <td className={styles.td2}>
                                                        <Link className={styles.button} to={`/fiches techniques/modify/${ft.id_fiche_technique}`} title={'Modifier la fiche'}>
                                                            <span className={styles.iconeSearch}>🛠️</span>
                                                        </Link>
                                                        <Link className={styles.button} to={`/fiches techniques/details/${ft.id_fiche_technique}`} title={'Afficher la fiche'}>
                                                            <span className={styles.iconeSearch}>🔍</span>
                                                        </Link>
                                                        <div className={styles.button} onClick={() => deleteFT(ft.id_fiche_technique)} title={'Supprimer la fiche'}>
                                                            <span className={styles.iconeDelete}>🗑️</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>) : <p>Il n'existe actuellement aucune fiche technique faisant partie de cette catégorie.</p>
                            }
                        </div>
                    </div>
                ) : (
                    <div className={styles.mercurialContainer}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
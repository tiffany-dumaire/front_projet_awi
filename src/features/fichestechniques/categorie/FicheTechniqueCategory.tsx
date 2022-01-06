import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './FicheTechniqueCategory.module.css';
import { SearchFiche } from '../../../components/search-bar/fiches-techniques/SearchFiche';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { deleteFicheTechnique, getFichesTechniques, getFTByCategorie } from '../../../api/fiche_technique.api';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { Categorie_Fiches_Interface } from '../../../interfaces/Categorie_Fiches.interface';
import { getCategorieFicheById } from '../../../api/categorie.api';
import { LoadingFiche } from '../../../components/loading/loading-fiche/LoadingFiche';

export function FicheTechniqueCategory(): JSX.Element {
    //liste des fiches technique de la catégorie donnée en url
    const [fichesTechniques, setFichesTechniques] = useState<Fiche_Technique_Interface[]>([]);
    //catégorie de fiche technique donnée en url
    const [categorie,  setCategorie] = useState<Categorie_Fiches_Interface>();
    //paramètre de l'url
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //changement de vue
    const history = useHistory();

    /**
     * Récupération des fiches techniques de la catégorie
     */
    const getFichesTechniquesList = async () => {
        if (Number(id_categorie_fiche) === 0) {
            await getFichesTechniques().then((list) => {
                setFichesTechniques(list);
            });
        } else {
            await getFTByCategorie(Number(id_categorie_fiche)).then((list) => {
                setFichesTechniques(list);
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
        getCategorieFicheById(Number(id_categorie_fiche)).then((result) => setCategorie(result));
        getFichesTechniquesList();
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{`📋 ${Number(id_categorie_fiche) === 0 ? 'Toutes' : categorie?.categorie_fiche} | Fiches Techniques 📋`}</title>
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
                                                            <span className={styles.iconeSearch}>⚙️</span>
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
                        <LoadingFiche />
                    </div>
                )
            }
        </>
    );
}
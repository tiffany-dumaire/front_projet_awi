import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styles from './FicheTechniqueCategory.module.css';
import { Loading } from '../../../components/loading/Loading';
import { SearchFiche } from '../../../components/search-bar/fiches-techniques/SearchFiche';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { getFichesTechniques, getFTByCategorie } from '../../../api/fiche_technique.api';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { FcSearch } from 'react-icons/fc';

export function FicheTechniqueCategory(): JSX.Element {
    const [fichesTechniques, setFichesTechniques] = useState<Fiche_Technique_Interface[]>([]);
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    const [loading, setLoading] = useState<boolean>(false);

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

    useEffect(() => {
        getFichesTechniquesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Nom catégorie | Fiches Techniques'}</title>
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
                                <IoIosArrowBack /> Retour aux fiches techniques
                            </Link>
                        </div>
                        <div className={styles.searchContainer}>
                            <SearchFiche />
                        </div>
                        <div className={styles.ficheTechniqueContainer}>
                            {fichesTechniques.length > 0 ? 
                                (<table className={styles.fichePresentation}>
                                    <thead>
                                        <th className={styles.th}>Identifiant</th>
                                        <th className={styles.th}>Libellé</th>
                                        <th className={styles.th}>Nombre de couverts</th>
                                        <th className={styles.th}>Responsable</th>
                                        <th className={styles.th}>Aperçu de la fiche technique</th>
                                    </thead>
                                    <tbody>
                                        { 
                                            fichesTechniques.map((ft: Fiche_Technique_Interface) => (
                                                <tr>
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
                                </table>) : null
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
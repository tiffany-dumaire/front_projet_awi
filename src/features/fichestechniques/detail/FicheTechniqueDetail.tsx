import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { getFicheTechniqueByID } from '../../../api/fiche_technique.api';
import { Loading } from '../../../components/loading/Loading';
import { Fiche_Technique_Infos_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import styles from './FicheTechniqueDetail.module.css';

export function FicheTechniqueDetail(): JSX.Element {
    //const [date, setDate] = useState<string>('');
    const [ficheTechnique, setFicheTechnique] = useState<Fiche_Technique_Infos_Interface>();
    const [loading, setLoading] = useState<boolean>(false);
    const { id_fiche_technique } = useParams<{ id_fiche_technique: string }>();

    async function getFT() {
        await getFicheTechniqueByID(Number(id_fiche_technique)).then((ft) => {
            setFicheTechnique(ft);
            setLoading(true);
        });
    }

    useEffect(() => {
        getFT();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
        <Helmet>
            <title>{ficheTechnique?.libelle_fiche_technique}</title>
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
                    <div className={styles.detail}>
                        <div className={styles.complete}>
                            <h3>Fiche Technique</h3>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.intitule}>
                                <div className={styles.complete2}>
                                    <div className={styles.title}><h4>Intitulé</h4></div>
                                    <div><p>{ficheTechnique?.libelle_fiche_technique}</p></div>
                                </div>
                            </div>
                            <div className={styles.row2}>
                                <div className={styles.moitie1}>
                                    <div className={styles.title}><h4>Responsable</h4></div>
                                    <div><p>{ficheTechnique?.intitule_responsable}</p></div>
                                </div>
                                <div className={styles.moitie}>
                                    <div className={styles.title}><h4>Nombre de couverts</h4></div>
                                    <div><p>{ficheTechnique?.nombre_couverts}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <table className={styles.table1}>
                                <thead>
                                    <th>Denrées</th>
                                    <th>Unités</th>
                                    <th>Quantités</th>
                                </thead>
                                <tbody>
                                    <td className={styles.colSpan3} colSpan={3}>
                                        Elément de base
                                    </td>
                                    <tr>
                                        <td className={styles.techniques}>Eau</td>
                                        <td>L</td>
                                        <td>0.25</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.techniques}>Sel fin</td>
                                        <td>kg</td>
                                        <td>0.005</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.techniques}>Sucre semoule</td>
                                        <td>kg</td>
                                        <td>0.010</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className={styles.table2}>
                                <thead>
                                    <th>N° phase</th>
                                    <th>Techniques de réalisation</th>
                                    <th>Durée</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className={styles.techniques}>Mise en place du poste de travail.</td>
                                        <td className={styles.duree}>5</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className={styles.techniques}>Réaliser les pesées.</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td className={styles.techniques}>Réaliser la base du Saint Honoré .....</td>
                                        <td>30</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <div>
                                <div className={styles.cote}>
                                    <h4>Denrée</h4>
                                    <p></p>
                                </div>
                                <div className={styles.cote}>
                                    <h4>Unité</h4>
                                    <p></p>
                                </div>
                                <div>
                                    <h4>Quantité</h4>
                                    <p></p>
                                </div>
                            </div> 
                            <div className={styles.row4}>
                                <div className={styles.cote}>
                                    <h4>N° phase</h4>
                                    <p></p>
                                </div>
                                <div className={styles.cote}>
                                    <h4>Techniques de réalisation</h4>
                                    <p></p>
                                </div>
                                <div>
                                    <h4>Durée</h4>
                                    <p></p>
                                </div>
                            </div>*/}
                        </div> 
                    </div>  
                </div>
            ) : (
                <div className={styles.container}>
                    <Loading />
                </div>
            )
        }
                 
    </>
    );
}
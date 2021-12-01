import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { getDenreesByFTByPhase, getFicheTechniqueByID, getPhasesByFT } from '../../../api/fiche_technique.api';
import { Loading } from '../../../components/loading/Loading';
import { DenreesEtape_Interface, Denree_Interface } from '../../../interfaces/Denrees.interface';
import { Fiche_Technique_Infos_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { Phase_Interface } from '../../../interfaces/Phase.interface';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { DenreesEtape } from '../../../models/Denrees.model';
import styles from './FicheTechniqueDetail.module.css';

export function FicheTechniqueDetail(): JSX.Element {
    //const [date, setDate] = useState<string>('');
    const [ficheTechnique, setFicheTechnique] = useState<Fiche_Technique_Infos_Interface>();
    const [loading, setLoading] = useState<boolean>(false);
    const { id_fiche_technique } = useParams<{ id_fiche_technique: string }>();
    const [phases, setPhases] = useState<Phase_Interface[]>([]);
    const [denreesEtape, setDenreesEtape] = useState<DenreesEtape_Interface[]>([]);

    async function getFT() {
        await getFicheTechniqueByID(Number(id_fiche_technique)).then((ft) => {
            setFicheTechnique(ft);
        });
    }

    async function getPhases() {
        await getPhasesByFT(Number(id_fiche_technique)).then((list) => {
            list.forEach((phase) => {
                getDenreesByFTByPhase(Number(id_fiche_technique), phase.ordre).then((list2) => {
                    let dList: Denree_Interface[] = [];
                    list2.forEach((denree) => {
                        dList.push(denree);
                    });
                    denreesEtape.push(new DenreesEtape(phase.ordre, phase.libelle_denrees, list2));
                    setDenreesEtape(denreesEtape.slice(0));
                });
                phases.push(phase);
                setPhases(phases.slice(0));
                setLoading(true);
            });
        });
    }

    useEffect(() => {
        getFT();
        getPhases();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
        <Helmet>
            <title>{'📋 ' + ficheTechnique?.libelle_fiche_technique}</title>
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
                                    <tr>
                                        <th>Denrées</th>
                                        <th>Unités</th>
                                        <th>Quantités</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { 
                                        denreesEtape.map((etape) => (
                                            <>
                                                <tr key={'step' + etape.ordre}>
                                                    <td className={styles.colSpan3} colSpan={3}>
                                                        <h4>{etape.libelle_denrees}</h4>
                                                    </td>
                                                </tr>
                                                {etape.denrees.map((denree) => (
                                                    <tr key={'denree' + denree.code + 'step' + etape.ordre}>
                                                        {denree.allergene ? (
                                                            <td className={styles.techniques2}>{denree.libelle}</td>
                                                        ) : (
                                                            <td className={styles.techniques}>{denree.libelle}</td>
                                                        )}
                                                        
                                                        <td>{denree.unite}</td>
                                                        <td>{denree.quantite}</td>
                                                    </tr>
                                                ))}
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <table className={styles.table2}>
                                <thead>
                                    <tr>
                                        <th className={styles.ordre}>N° phase</th>
                                        <th>Techniques de réalisation</th>
                                        <th>Durée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {phases.map((phase) => (
                                        <tr key={'phase' + phase.ordre}>
                                            <td>{phase.ordre}</td>
                                            <td className={styles.techniques}>
                                                <h4>{phase.libelle_phase}</h4>
                                                <p>{phase.description_phase}</p>
                                            </td>
                                            <td className={styles.duree}>{phase.duree_phase}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
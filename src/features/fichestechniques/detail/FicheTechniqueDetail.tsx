import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteFicheTechnique, getDenreesByFTByPhase, getFicheTechniqueByID, getPhasesByFT } from '../../../api/fiche_technique.api';
import { Loading } from '../../../components/loading/Loading';
import { DenreesEtape_Interface, Denree_Interface } from '../../../interfaces/Denrees.interface';
import { Fiche_Technique_Infos_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { Phase_Interface } from '../../../interfaces/Phase.interface';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import { DenreesEtape } from '../../../models/Denrees.model';
import styles from './FicheTechniqueDetail.module.css';
import { useReactToPrint } from 'react-to-print';
import { Parameter_Interface } from '../../../interfaces/Parameter.interface';
import { getParameter } from '../../../api/parameter.api';

export function FicheTechniqueDetail(): JSX.Element {
    const [ficheTechnique, setFicheTechnique] = useState<Fiche_Technique_Infos_Interface>();
    const [loading, setLoading] = useState<boolean>(false);
    const { id_fiche_technique } = useParams<{ id_fiche_technique: string }>();
    const [phases, setPhases] = useState<Phase_Interface[]>([]);
    const [denreesEtape, setDenreesEtape] = useState<DenreesEtape_Interface[]>([]);
    const history = useHistory();
    //coût
    const [coeff_vente, setCoeffVente] = useState<Parameter_Interface>();
    const [cout_moyen, setCoutMoyen] = useState<Parameter_Interface>();
    const [assaisonnement, setAssaisonnement] = useState<Parameter_Interface>();
    const [showCout, setShowCout] = useState<boolean>(true);
    const [coutMatierePhase, setCoutMatierePhase] = useState<number[]>([0]);
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const [dureeTotale, setDureeTotale] = useState<number>(0);
    const componentRef = useRef(null);

    async function getFT() {
        await getFicheTechniqueByID(Number(id_fiche_technique)).then((ft) => {
            setFicheTechnique(ft);
        });
    }

    async function getPhases() {
        await getPhasesByFT(Number(id_fiche_technique)).then((list) => {
            let duree = 0;
            list.forEach((phase) => {
                getDenreesByFTByPhase(Number(id_fiche_technique), phase.ordre).then((list2) => {
                    let dList: Denree_Interface[] = [];
                    let cout = 0;
                    list2.forEach((denree) => {
                        cout = cout + denree.quantite * denree.prix_unitaire;
                        dList.push(denree);
                    });
                    denreesEtape.push(new DenreesEtape(phase.ordre, phase.libelle_denrees, list2));
                    setDenreesEtape(denreesEtape.slice(0));
                    coutMatierePhase.push(cout);
                    setCoutMatierePhase(coutMatierePhase.slice(0));
                });
                duree = duree + phase.duree_phase;
                phases.push(phase);
                setPhases(phases.slice(0));
            });
            setDureeTotale(duree);
            setLoading(true);
        });
    }

    const deleteFT = () => {
        deleteFicheTechnique(Number(id_fiche_technique)).then(() => {
            history.push(`/fiches techniques/byCategorie/0`);
        });
    }
    
    const printDiv = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        getFT();
        getPhases();
        getParameter('COUT_ASSAISONNEMENT').then((parameter) => {
            setAssaisonnement(parameter);
        });
        getParameter('COUT_HORAIRE_MOYEN').then((parameter) => {
            setCoutMoyen(parameter);
        });
        getParameter('COEFF_VENTE').then((parameter) => {
            setCoeffVente(parameter);
        });
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
                        <button className={styles.link2} onClick={() => printDiv()}>
                            Imprimer la fiche technique
                        </button>
                    </div>
                    <div className={styles.linkTo}>
                        <div className={styles.containerSwitch}>
                            <div className={styles.switchContainer}>
                                <label className={styles.switch}>
                                    <input type="checkbox" checked={showCout} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setShowCout(Boolean(ev.target.checked))}/>
                                    <span className={`${styles.slider} ${styles.round}`}></span>
                                </label>
                            </div>
                            <label>Afficher/Masquer les coûts</label>
                        </div>
                        <button className={styles.deleteButton} onClick={() => deleteFT()}>
                            Supprimer la fiche technique
                        </button>
                    </div>
                    <div className={styles.detail} ref={componentRef}>
                        <div className={styles.complete}>
                            <h3>Fiche Technique</h3>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.intitule}>
                                <div className={styles.complete2}>
                                    <div className={styles.title}><h4>Intitulé</h4></div>
                                    <div><p className={styles.techniques4}>{ficheTechnique?.libelle_fiche_technique}</p></div>
                                </div>
                            </div>
                            <div className={styles.row2}>
                                <div className={styles.moitie1}>
                                    <div className={styles.title}><h4>Responsable</h4></div>
                                    <div><p className={styles.techniques4}>{ficheTechnique?.intitule_responsable}</p></div>
                                </div>
                                <div className={styles.moitie}>
                                    <div className={styles.title}><h4>Nombre de couverts</h4></div>
                                    <div><p className={styles.techniques4}>{ficheTechnique?.nombre_couverts}</p></div>
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
                                                        
                                                        <td className={styles.techniques4}>{denree.unite}</td>
                                                        <td className={styles.techniques4}>{denree.quantite}</td>
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
                                            <td className={styles.techniques4}>{phase.ordre}</td>
                                            <td className={styles.techniques3}>
                                                <h4>{phase.libelle_phase}</h4>
                                                <p>{phase.description_phase}</p>
                                            </td>
                                            <td className={styles.duree}>{phase.duree_phase}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showCout && ficheTechnique && assaisonnement && coeff_vente && cout_moyen? (
                            <>
                                <div className={styles.gridCout}>
                                    <div className={styles.title}>
                                        <h4>Coûts de production {'&'} prix de vente</h4>
                                    </div>
                                    <div className={styles.title3}>
                                        <h4>Bénéfices {'&'} seuil de rentabilité</h4>
                                    </div>
                                </div>
                                <div className={styles.gridCout}>
                                    <div className={styles.left}>
                                        <h4>Durée de la progression : </h4>
                                        <p>La durée totale de la progression est de {dureeTotale} minutes.</p>
                                        {coeff_vente?.utile ? (
                                            <>
                                                <h4>Coût des charges : </h4>
                                                <p>Charges de personnel : {(cout_moyen?.value * (dureeTotale/60)).toFixed(2)}€.</p>
                                                <p>Charges fluides :  {(cout_moyen?.value2 * (dureeTotale/60)).toFixed(2)}€.</p>
                                                <p>Le coût total des charges est de {(cout_moyen?.value * (dureeTotale/60) + cout_moyen?.value2 * (dureeTotale/60)).toFixed(2)}€.</p>
                                            </>
                                            ) : null
                                        }
                                        <h4>Coût des matières : </h4>
                                        <p>Coût des matières : {(coutMatierePhase.reduce(reducer)).toFixed(2)}€.</p>
                                        {assaisonnement.utile ? (
                                            <p>Coût assaisonnement : {((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer)).toFixed(2)}€.</p>
                                        ) : (
                                            <p>Coût assaisonnement : {(assaisonnement?.value2)?.toFixed(2)}€.</p>
                                        )}
                                        <h4>Coût de production : </h4>
                                        {coeff_vente.utile ? (
                                            <p>Coût des matières + charges : {assaisonnement.utile ? ((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2) : (assaisonnement.value2 + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2)}€</p>
                                        ) : (
                                            <p>Coût des matières (charges non calculées) : {assaisonnement.utile ? ((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer)).toFixed(2) : (assaisonnement.value2 + coutMatierePhase.reduce(reducer)).toFixed(2)}€</p>
                                        )}
                                        <h4>Prix de vente : </h4>
                                        {coeff_vente.utile ? (
                                            <>
                                                <p>Prix de vente TTC: {assaisonnement.utile ? (((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2) : ((assaisonnement.value2 + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2)}€</p>
                                                <p>Prix de vente par portion TTC: {assaisonnement.utile ? ((((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)) / ficheTechnique.nombre_couverts).toFixed(2) : (((assaisonnement.value2 + coutMatierePhase.reduce(reducer) + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)) / ficheTechnique.nombre_couverts).toFixed(2)}€</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Prix de vente TTC : {assaisonnement.utile ? (((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer)) * (coeff_vente.value2/100)).toFixed(2) : ((assaisonnement.value2 + coutMatierePhase.reduce(reducer)) * (coeff_vente.value2/100)).toFixed(2)}€</p>
                                                <p>Prix de vente par portion TTC : {assaisonnement.utile ? ((((assaisonnement.value / 100) * coutMatierePhase.reduce(reducer) + coutMatierePhase.reduce(reducer)) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts).toFixed(2) : (((assaisonnement.value2 + coutMatierePhase.reduce(reducer)) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts).toFixed(2)}€</p>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.right}>
                                        <p>{ficheTechnique?.libelle_fiche_technique}</p>
                                    </div>
                                </div>
                            </>
                        ):(
                            null
                        )}
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
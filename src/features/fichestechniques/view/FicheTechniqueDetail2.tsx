import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteFicheTechnique, getFicheTechniqueComplete } from '../../../api/fiche_technique.api';
import { Fiche_Complete_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import styles from './FicheTechniqueDetail.module.css';
import { useReactToPrint } from 'react-to-print';
import { Parameter_Interface } from '../../../interfaces/Parameter.interface';
import { getParameter } from '../../../api/parameter.api';
import { LoadingFiche } from '../../../components/loading/loading-fiche/LoadingFiche';

export function FicheTechniqueDetail2(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //fiche technique
    const [ficheTechnique, setFicheTechnique] = useState<Fiche_Complete_Interface>();
    const { id_fiche_technique } = useParams<{ id_fiche_technique: string }>();
    //changement de vue
    const history = useHistory();
    //parametre de l'application
    const [coeff_vente, setCoeffVente] = useState<Parameter_Interface>();
    const [cout_moyen, setCoutMoyen] = useState<Parameter_Interface>();
    const [assaisonnement, setAssaisonnement] = useState<Parameter_Interface>();
    //cout
    const [showCout, setShowCout] = useState<boolean>(true);
    const [coutMatiere, setCoutMatiere] = useState<number>(0);
    const [dureeTotale, setDureeTotale] = useState<number>(0);
    //pdf
    const componentRef = useRef(null);

    /**
     * Supprimer la fiche technique
     */
    const deleteFT = () => {
        deleteFicheTechnique(Number(id_fiche_technique)).then(() => {
            history.push(`/fiches techniques/byCategorie/0`);
        });
    }
    
    /**
     * Imprimer la fiche technique en pdf
     */
    const printDiv = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        getFicheTechniqueComplete(Number(id_fiche_technique)).then((ft) => {
            setFicheTechnique(ft);
            let duree = 0;
            let coutM = 0;
            ft.phases.forEach((phase) => {
                duree = duree + phase.duree_phase;
                phase.ingredients.forEach((ingredient) => {
                    coutM = coutM + ingredient.quantite * ingredient.prix_unitaire;
                });
            });
            setCoutMatiere(coutM);
            setDureeTotale(duree);

        });
        getParameter('COUT_ASSAISONNEMENT').then((parameter) => {
            setAssaisonnement(parameter);
        });
        getParameter('COUT_HORAIRE_MOYEN').then((parameter) => {
            setCoutMoyen(parameter);
        });
        getParameter('COEFF_VENTE').then((parameter) => {
            setCoeffVente(parameter);
        });
        setTimeout(
            () => setLoading(true),
            3000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <Helmet>
                <title>{'📋 ' + ficheTechnique?.libelle_fiche_technique}</title>
            </Helmet>
            {loading ? (
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
                        <Link className={styles.modifyButton} to={`/fiches techniques/modify/${id_fiche_technique}`}>
                            Modifier la fiche technique
                        </Link>
                        <button className={styles.deleteButton} onClick={() => deleteFT()}>
                            Supprimer la fiche technique
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
                        <div></div>
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
                                        ficheTechnique?.phases.map((etape) => (
                                            <>
                                                <tr key={'step' + etape.ordre}>
                                                    <td className={styles.colSpan3} colSpan={3}>
                                                        <h4>{etape.libelle_denrees}</h4>
                                                    </td>
                                                </tr>
                                                {etape.ingredients.map((denree) => (
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
                                    {ficheTechnique?.phases.map((phase) => (
                                        <tr key={'phase' + phase.ordre}>
                                            <td className={styles.techniques4}>{phase.ordre}</td>
                                            <td className={styles.techniques3}>
                                                <h4>{phase.libelle_phase}</h4>
                                                {phase.description_phase.split('\n').map((t) => (
                                                    <p>{t}</p>
                                                ))}
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
                                        {coeff_vente.utile ? (
                                            <>
                                                <h4>Coût des charges : </h4>
                                                <p>Charges de personnel : {(cout_moyen.value * (dureeTotale/60)).toFixed(2)}€.</p>
                                                <p>Charges fluides :  {(cout_moyen.value2 * (dureeTotale/60)).toFixed(2)}€.</p>
                                                <p>Le coût total des charges est de {(cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2)}€.</p>
                                            </>
                                            ) : null
                                        }
                                        <h4>Coût des matières : </h4>
                                        <p>Coût des matières : {coutMatiere.toFixed(2)}€.</p>
                                        {assaisonnement.utile ? (
                                            <p>Coût assaisonnement : {((assaisonnement.value / 100) * coutMatiere).toFixed(2)}€.</p>
                                        ) : (
                                            <p>Coût assaisonnement : {(assaisonnement.value2).toFixed(2)}€.</p>
                                        )}
                                        <h4>Coût de production : </h4>
                                        {coeff_vente.utile ? (
                                            <>
                                                <p>Coût de production par portion : {assaisonnement.utile ? ((((100 + assaisonnement.value) / 100) * coutMatiere)/ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2) : ((assaisonnement.value2 + coutMatiere)/ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2)}€</p>
                                                <p>Coût de production total : {assaisonnement.utile ? (((100 + assaisonnement.value) / 100) * coutMatiere + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2) : (assaisonnement.value2 + coutMatiere + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)).toFixed(2)}€</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Coût de production par portion : {assaisonnement.utile ? (((assaisonnement.value / 100) * coutMatiere + coutMatiere)/ficheTechnique.nombre_couverts).toFixed(2) : ((assaisonnement.value2 + coutMatiere)/ficheTechnique.nombre_couverts).toFixed(2)}€</p>
                                                <p>Coût de production total : {assaisonnement.utile ? ((assaisonnement.value / 100) * coutMatiere + coutMatiere).toFixed(2) : (assaisonnement.value2 + coutMatiere).toFixed(2)}€</p>
                                            </>
                                        )}
                                        <h4>Prix de vente : </h4>
                                        {coeff_vente.utile ? (
                                            <>
                                                <p>Prix de vente par portion TTC: {assaisonnement.utile ? (((((100 + assaisonnement.value) / 100) * coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2) : (((assaisonnement.value2 + coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2)}€</p>
                                                <p>Prix de vente TTC: {assaisonnement.utile ? ((((100 + assaisonnement.value) / 100) * coutMatiere + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2) : ((assaisonnement.value2 + coutMatiere + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)).toFixed(2)}€</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Prix de vente par portion TTC : {assaisonnement.utile ? ((((assaisonnement.value / 100) * coutMatiere + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts).toFixed(2) : (((assaisonnement.value2 + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts).toFixed(2)}€</p>
                                                <p>Prix de vente TTC : {assaisonnement.utile ? (((assaisonnement.value / 100) * coutMatiere + coutMatiere) * (coeff_vente.value2/100)).toFixed(2) : ((assaisonnement.value2 + coutMatiere) * (coeff_vente.value2/100)).toFixed(2)}€</p>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.right}>
                                        <h4>Durée de la progression : </h4>
                                        <p>La durée totale de la progression est de {dureeTotale} minutes.</p>
                                        <h4>Bénéfice : </h4>
                                        {coeff_vente.utile ? (
                                            <>
                                                <p>Bénéfice brut par portion TTC: {assaisonnement.utile ? ((((((100 + assaisonnement.value) / 100) * coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)) - ((((100 + assaisonnement.value) / 100) * coutMatiere)/ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60))).toFixed(2) : (((assaisonnement.value2 + coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100) - ((assaisonnement.value2 + coutMatiere)/ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60))).toFixed(2)}€</p>
                                                <p>Bénéfice brut TTC: {assaisonnement.utile ? ((((100 + assaisonnement.value) / 100) * coutMatiere + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100) - (((100 + assaisonnement.value) / 100) * coutMatiere + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60))).toFixed(2) : ((assaisonnement.value2 + coutMatiere + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100) - (assaisonnement.value2 + coutMatiere + cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60))).toFixed(2)}€</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Bénéfice brut par portion TTC : {assaisonnement.utile ? ((((assaisonnement.value / 100) * coutMatiere + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts - (((assaisonnement.value / 100) * coutMatiere + coutMatiere)/ficheTechnique.nombre_couverts)).toFixed(2) : (((assaisonnement.value2 + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts - ((assaisonnement.value2 + coutMatiere)/ficheTechnique.nombre_couverts)).toFixed(2)}€</p>
                                                <p>Bénéfice brut TTC : {assaisonnement.utile ? (((assaisonnement.value / 100) * coutMatiere + coutMatiere) * (coeff_vente.value2/100) - ((assaisonnement.value / 100) * coutMatiere + coutMatiere)).toFixed(2) : ((assaisonnement.value2 + coutMatiere) * (coeff_vente.value2/100) - (assaisonnement.value2 + coutMatiere)).toFixed(2)}€</p>
                                            </>
                                        )}
                                        <h4>Seuil de rentabilité :</h4>
                                        {coeff_vente.utile ?
                                            <p>Seuil de rentabilité : {assaisonnement.utile ? (cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)) / ((((((100 + assaisonnement.value) / 100) * coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)) - ((((100 + assaisonnement.value) / 100) * coutMatiere) / ficheTechnique.nombre_couverts)) : (cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)) / ( (((assaisonnement.value2 + coutMatiere) / ficheTechnique.nombre_couverts + cout_moyen.value * (dureeTotale / 60) + cout_moyen.value2 * (dureeTotale / 60)) * (coeff_vente.value / 100)) - ((assaisonnement.value2 + coutMatiere) / ficheTechnique.nombre_couverts))}</p>
                                        :
                                            <p>Seuil de rentabilité : {assaisonnement.utile ? (cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)) / (((((assaisonnement.value / 100) * coutMatiere + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts) - ((((100 + assaisonnement.value) / 100) * coutMatiere) / ficheTechnique.nombre_couverts)) : (cout_moyen.value * (dureeTotale/60) + cout_moyen.value2 * (dureeTotale/60)) / ((((assaisonnement.value2 + coutMatiere) * (coeff_vente.value2/100))/ficheTechnique.nombre_couverts) - ((assaisonnement.value2 + coutMatiere) / ficheTechnique.nombre_couverts))}</p>
                                        }
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
                    <LoadingFiche />
                </div>
            )}
                 
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getParameter } from '../../api/parameter.api';
import { Loading } from '../../components/loading/Loading';
import { Parameter_Interface } from '../../interfaces/Parameter.interface';
import styles from './Parameters.module.css';

export function Parameters(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [coeff_vente, setCoeffVente] = useState<Parameter_Interface>();
    const [cout_moyen, setCoutMoyen] = useState<Parameter_Interface>();
    const [assaisonnement, setAssaisonnement] = useState<Parameter_Interface>();


    useEffect(() => {
        getParameter('COUT_ASSAISONNEMENT').then((parameter) => {
            setAssaisonnement(parameter);
        });
        getParameter('COUT_HORAIRE_MOYEN').then((parameter) => {
            setCoutMoyen(parameter);
        });
        getParameter('COEFF_VENTE').then((parameter) => {
            setCoeffVente(parameter);
        });
        setLoading(true);
    }, []);

    return (
        <>
            <Helmet>
                <title>{'AWI | A Propos'}</title>
            </Helmet>
            <div className={styles.container}>
                {
                    loading ? (
                        <div className={styles.subcontainer}>
                            <h2>Paramètres de l'application</h2>
                            <h3>Modification des calculs de coûts</h3>
                            <div className={styles.gridContainer}>
                                <div>
                                    <h4>Coût moyen horaire</h4>
                                    <p>On peut distinguer deux coûts moyens horaires : le coût moyen horaire des fluides et le coût moyen horaire du personnel.</p>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={cout_moyen?.value}></input><label> : Coût moyen horaire du personnel</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={cout_moyen?.value2}></input><label> : Coût moyen horaire des fluides</label></div>
                                </div>
                                <div>
                                    <h4>Coefficient : calcul prix de vente</h4>
                                    <div className={styles.divTop}> 
                                        <div className={styles.switchContainer}>
                                            <label className={styles.switch}>
                                                <input type="checkbox" checked={coeff_vente?.utile} />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </div><label>Actuellement, les charges sont {coeff_vente?.utile ? 'définies' : 'ne sont pas définies'}.</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={coeff_vente?.value}></input><label> : Coefficient utilisé si le coût des charges est défini.</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={coeff_vente?.value2}></input><label> : Coefficient utilisé si le coût des charges n'est pas défini.</label></div>
                                </div>
                                <div>
                                    <h4>Calcul du coût d'assaisonnement</h4>
                                    <p>Le coût de l'assaisonnement est calculé en {assaisonnement?.utile ? 'ajoutant 5% du coût des matières' : 'ajoutant un montant en € au coût des matières.'}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.subcontainer}>
                            <Loading />
                        </div>
                    )
                }
            </div>
        </>
    );
}

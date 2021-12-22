import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { getParameter, putParameter } from '../../api/parameter.api';
import { Loading } from '../../components/loading/Loading';
import { Parameter_Interface } from '../../interfaces/Parameter.interface';
import { Parameter } from '../../models/Parameter.model';
import styles from './Parameters.module.css';

export function Parameters(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [coeff_vente, setCoeffVente] = useState<Parameter_Interface>();
    const [cout_moyen, setCoutMoyen] = useState<Parameter_Interface>();
    const [assaisonnement, setAssaisonnement] = useState<Parameter_Interface>();
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(true);

    const modifyValue = (value: number, parameter: string) => {
        if (parameter === 'COUT_ASSAISONNEMENT') {
            setAssaisonnement(new Parameter(assaisonnement!.id_parameters, assaisonnement!.libelle_parameters, value, assaisonnement!.value2, assaisonnement!.utile));
            console.log(assaisonnement);
        }
        if (parameter === 'COUT_HORAIRE_MOYEN') {
            setCoutMoyen(new Parameter(cout_moyen!.id_parameters, cout_moyen!.libelle_parameters, value, cout_moyen!.value2, cout_moyen!.utile));
            console.log(cout_moyen);
        }
        if (parameter === 'COEFF_VENTE') {
            setCoeffVente(new Parameter(coeff_vente!.id_parameters, coeff_vente!.libelle_parameters, value, coeff_vente!.value2, coeff_vente!.utile));
            console.log(coeff_vente);
        }
    };

    const modifyValue2 = (value: number, parameter: string) => {
        if (parameter === 'COUT_ASSAISONNEMENT') {
            setAssaisonnement(new Parameter(assaisonnement!.id_parameters, assaisonnement!.libelle_parameters, assaisonnement!.value, value, assaisonnement!.utile));
            console.log(assaisonnement);
        }
        if (parameter === 'COUT_HORAIRE_MOYEN') {
            setCoutMoyen(new Parameter(cout_moyen!.id_parameters, cout_moyen!.libelle_parameters, cout_moyen!.value, value, cout_moyen!.utile));
            console.log(cout_moyen);
        }
        if (parameter === 'COEFF_VENTE') {
            setCoeffVente(new Parameter(coeff_vente!.id_parameters, coeff_vente!.libelle_parameters, coeff_vente!.value, value, coeff_vente!.utile));
            console.log(coeff_vente);
        }
    };

    const modifyUtile = (utile: boolean, parameter: string) => {
        if (parameter === 'COUT_ASSAISONNEMENT') {
            setAssaisonnement(new Parameter(assaisonnement!.id_parameters, assaisonnement!.libelle_parameters, assaisonnement!.value, assaisonnement!.value2, utile));
            console.log(assaisonnement);
        }
        if (parameter === 'COUT_HORAIRE_MOYEN') {
            setCoutMoyen(new Parameter(cout_moyen!.id_parameters, cout_moyen!.libelle_parameters, cout_moyen!.value, cout_moyen!.value2, utile));
            console.log(cout_moyen);
        }
        if (parameter === 'COEFF_VENTE') {
            setCoeffVente(new Parameter(coeff_vente!.id_parameters, coeff_vente!.libelle_parameters, coeff_vente!.value, coeff_vente!.value2, utile));
            console.log(coeff_vente);
        }
    };

    const modifyParameter = (value: number, value2: number, utile: boolean, parameter: string) => {
        putParameter(parameter, value, value2, utile).then((result) => {
            toggleShowA();
            const timer = setTimeout(() => {
                setShowA(false);
            }, 3000);
            return () => clearTimeout(timer);
        });
    }

    const cancelParameter = (parameterName: string) => {
        getParameter(parameterName).then((parameter) => {
            if (parameterName === 'COUT_ASSAISONNEMENT') {
                setAssaisonnement(parameter);
            }
            if (parameterName === 'COUT_HORAIRE_MOYEN') {
                setCoutMoyen(parameter);
            }
            if (parameterName === 'COEFF_VENTE') {
                setCoeffVente(parameter);
            }
        });
    }

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
                                    <div className={styles.row}>
                                        <h4>Coût moyen horaire</h4>
                                        <button className={styles.buttonSave} onClick={() => modifyParameter(cout_moyen!.value, cout_moyen!.value2, cout_moyen!.utile, 'COUT_HORAIRE_MOYEN')}>Valider la modification</button>
                                        <button className={styles.buttonCancel} onClick={() => cancelParameter('COUT_HORAIRE_MOYEN')}>Annuler la modification</button>
                                    </div>
                                    <p>On peut distinguer deux coûts moyens horaires : le coût moyen horaire des fluides et le coût moyen horaire du personnel.</p>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={cout_moyen?.value} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue(Number(ev.target.value), 'COUT_HORAIRE_MOYEN')}></input><label> : Coût moyen horaire du personnel</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={cout_moyen?.value2} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue2(Number(ev.target.value), 'COUT_HORAIRE_MOYEN')}></input><label> : Coût moyen horaire des fluides</label></div>
                                </div>
                                <div>
                                    <div className={styles.row}>
                                        <h4>Coefficient : calcul prix de vente</h4>
                                        <button className={styles.buttonSave} onClick={() => modifyParameter(coeff_vente!.value, coeff_vente!.value2, coeff_vente!.utile, 'COEFF_VENTE')}>Valider la modification</button>
                                        <button className={styles.buttonCancel} onClick={() => cancelParameter('COEFF_VENTE')}>Annuler la modification</button>
                                    </div>
                                    <div className={styles.divTop}> 
                                        <div className={styles.switchContainer}>
                                            <label className={styles.switch}>
                                                <input type="checkbox" checked={coeff_vente?.utile} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyUtile(Boolean(ev.target.checked), 'COEFF_VENTE')} />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </div><label>Actuellement, les charges sont {coeff_vente?.utile ? 'définies' : 'ne sont pas définies'}.</label>
                                    </div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={coeff_vente?.value} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue(Number(ev.target.value), 'COEFF_VENTE')}></input><label> : Coefficient utilisé si le coût des charges est défini.</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} value={coeff_vente?.value2} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue2(Number(ev.target.value), 'COEFF_VENTE')}></input><label> : Coefficient utilisé si le coût des charges n'est pas défini.</label></div>
                                </div>
                                <div>
                                    <div className={styles.row}>
                                        <h4>Calcul du coût d'assaisonnement </h4>
                                        <button className={styles.buttonSave} onClick={() => modifyParameter(assaisonnement!.value, assaisonnement!.value2, assaisonnement!.utile, 'COUT_ASSAISONNEMENT')}>Valider la modification</button>
                                        <button className={styles.buttonCancel} onClick={() => cancelParameter('COUT_ASSAISONNEMENT')}>Annuler la modification</button>
                                    </div>
                                    <div className={styles.divTop}> 
                                        <div className={styles.switchContainer}>
                                            <label className={styles.switch}>
                                                <input type="checkbox" checked={assaisonnement?.utile} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyUtile(Boolean(ev.target.checked), 'COUT_ASSAISONNEMENT')} />
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </div><label>Le coût de l'assaisonnement est calculé en {assaisonnement?.utile ? 'ajoutant un pourcentage du coût des matières' : 'ajoutant un montant en € au coût des matières'}.</label>
                                    </div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} min={0.01} max={100} value={assaisonnement?.value} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue(Number(ev.target.value), 'COUT_ASSAISONNEMENT')}></input><label> : Coût de l'assaisonnement en % du coût des matières.</label></div>
                                    <div className={styles.divTop}><input className={styles.input2} type="number" step={0.01} min={0.01} value={assaisonnement?.value2} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyValue2(Number(ev.target.value), 'COUT_ASSAISONNEMENT')}></input><label> : Coût fixe de l'assaisonnement en €.</label></div>
                                    <p></p>
                                </div>
                            </div>
                            <Toast className={styles.toast} show={showA} onClose={toggleShowA}>
                                <Toast.Header className={styles.toastHeader} closeButton={false}>
                                    <strong>Modification des paramètres</strong>
                                </Toast.Header>
                                <Toast.Body className={styles.toastBody}>Un paramètre de l'application vient d'être modifié.</Toast.Body>
                            </Toast>
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

import React from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';
import styles from './FicheTechniqueChoice.module.css';

export type FicheTechniqueChoiceProps = {
    fiches: Fiche_Technique_Interface[];
    addedFiches: Fiche_Technique_Interface[];
    addFiche: (fiche: Fiche_Technique_Interface) => void;
    removeFiche: (fiche: Fiche_Technique_Interface) => void;
    next: () => void;
};

export const FicheTechniqueChoice: React.FunctionComponent<FicheTechniqueChoiceProps> = (props: FicheTechniqueChoiceProps) => {

    return (
        <div className={styles.debutContainer}>
            <h3>Sélectionner des fiches techniques</h3>
            <p>Sélectionner les fiches permettant de réaliser la vente. Le nombre de plat et de portion seront définies lors d'une étape ultérieure de l'étiquette de vente.</p>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Liste des fiches techniques existantes</label>
                </div> 
                <div>
                    <label className={styles.label}>Fiches techniques sélectionnés</label>
                </div>
            </div>
            <div className={styles.gridContainer2}>
                <div className={styles.list}>
                    {props.fiches.length === 0 ? 
                        'Vous ne pouvez pas ajouter d\'autres fiches' : 
                        props.fiches.map((fiche) => (
                            <div className={styles.click} key={'f' + fiche.id_fiche_technique}>
                                <div>
                                    <Link className={styles.link} to={`/fiches techniques/details/${fiche.id_fiche_technique}`} target={'_blank'}>🔎</Link>
                                </div>
                                <div onClick={() => {
                                    props.addFiche(fiche);
                                }}>
                                    <IoMdAddCircle className={styles.add} /> {fiche.libelle_fiche_technique}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list}>
                    {props.addedFiches.map((f) => (
                        <div className={styles.click} key={'fiche_' + f.id_fiche_technique} onClick={() => {
                            props.removeFiche(f);
                        }}> 
                            {f.libelle_fiche_technique} ❌
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div></div>
                <div>
                    <button 
                        className={styles.buttonNext}
                        onClick={
                            () => {
                                var r = window.confirm("Si vous continuez cela mettra fin à la sélection des fiches techniques et vous pourrez ensuite sélectionner le nombre de couverts pour chaque fiche sélectionnée. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.next();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Passer à la suite
                    </button>
                </div>
            </div>
        </div>
    );
}
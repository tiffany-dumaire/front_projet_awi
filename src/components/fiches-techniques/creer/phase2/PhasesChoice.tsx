import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import styles from './PhasesChoice.module.css';

export type PhasesChoiceProps = {
    phases: Phase_Simple_Interface[];
    addedPhases: Phase_Simple_Interface[];
    addPhase: (phase: Phase_Simple_Interface) => void;
    removePhase: (phase: Phase_Simple_Interface) => void;
    next: () => void;
};

export const PhasesChoice: React.FunctionComponent<PhasesChoiceProps> = (props: PhasesChoiceProps) => {
    const [phases, setPhases] = useState<Phase_Simple_Interface[]>(props.phases);

    const [word, setWord] = useState<string>('');
    /**
     * Rechercher des phases en fonction de "word"
     */
     const searchPhases = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = props.phases.filter(phase => phase.libelle_phase.toLowerCase().match(regex));
        setPhases(searchResult);
    }

    return (
        <div className={styles.debutContainer}>
            <h3>Sélectionner des phases</h3>
            <p>Sélectionner les phases permettant de réaliser la fiche technique. Les quantités pour chaque ingrédient seront définies lors d'une étape ultérieure de la création de fiche technique.</p>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Liste des phases existantes</label>
                </div> 
                <div>
                    <label className={styles.label}>Phases sélectionnés</label>
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.gridContainer3}>
                    <input
                        placeholder="Rechercher une fiche..."
                        className={styles.input}
                        type='text'
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setWord(ev.target.value)}
                        value={word}
                    ></input>
                    <button className={styles.button} onClick={() => searchPhases()}>
                        🔎
                    </button>
                </div>
                <div></div>
            </div>
            <div className={styles.gridContainer2}>
                <div className={styles.list}>
                    {phases.length === 0 ? 
                        'Vous ne pouvez pas ajouter d\'autres phases' : 
                        phases.map((phase) => (
                            <div className={styles.click} key={'i' + phase.id_phase}>
                                <div>
                                    <Link className={styles.link} to={`/phases/view/${phase.id_phase}`} target={'_blank'}>🔎</Link>
                                </div>
                                <div onClick={() => {
                                    props.addPhase(phase);
                                }}>
                                    <span className={styles.add}>+</span> {phase.libelle_phase}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list}>
                    {props.addedPhases.map((p) => (
                        <div className={styles.click} key={'phase_' + p.id_phase} onClick={() => {
                            props.removePhase(p);
                        }}> 
                            {p.libelle_phase} ❌
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
                                var r = window.confirm("Si vous continuez cela mettra fin à la sélection des phases. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.next();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Ordonner les phases sélectionnées
                    </button>
                </div>
            </div>
        </div>
    );
}
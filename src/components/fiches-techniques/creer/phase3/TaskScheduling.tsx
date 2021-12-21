import React from 'react';
import { Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import styles from './TaskScheduling.module.css';

export type TaskSchedulingProps = {
    idFT: number;
    addedPhases: Phase_Simple_Interface[];
    scheduling: () => void;
};

export const TaskScheduling: React.FunctionComponent<TaskSchedulingProps> = (props: TaskSchedulingProps) => {

    return (
        <div className={styles.debutContainer}>
            <h3>Ordonner les phases</h3>
            <p>Ordonnez les différentes phases avant d'ajouter les quantités d'ingrédients.</p>
            <div>
                {props.addedPhases.map((phase) => (
                    <div key={phase.id_phase + '_' + phase.libelle_phase}>
                        <input type="number" min={1} max={props.addedPhases.length} step={1}></input> {phase.libelle_phase}
                    </div>
                ))}
            </div>
            <div className={styles.gridContainer}>
                <div></div>
                <div>
                    <button 
                        className={styles.buttonNext}
                        onClick={
                            () => {
                                var r = window.confirm("Si vous continuez les phases ordonnées seront enregistrées dans l'ordre actuel donné. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.scheduling();
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
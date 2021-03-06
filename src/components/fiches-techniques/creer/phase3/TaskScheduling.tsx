import React, { useEffect, useState } from 'react';
import { addPhaseFT } from '../../../../api/phase.api';
import { Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import styles from './TaskScheduling.module.css';

export type TaskSchedulingProps = {
    idFT: number;
    addedPhases: Phase_Simple_Interface[];
    scheduling: () => void;
};

export const TaskScheduling: React.FunctionComponent<TaskSchedulingProps> = (props: TaskSchedulingProps) => {
    //ordre
    const [ordre, setOrdre] = useState<number[]>([]);

    useEffect(() => {
        const count = props.addedPhases.length;
        for( let i = 1; i <= count; i++) {
            ordre.push(i);
            setOrdre(ordre.slice(0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Ajout des phases dans l'ordre
     */
    const scheduling = () => {
        props.addedPhases.forEach((phase) => {
            addPhaseFT(phase.id_phase, props.idFT, ordre[props.addedPhases.indexOf(phase)]);
        });
        setTimeout(
            () => props.scheduling(),
            2000
        )
    };

    return (
        <div className={styles.debutContainer}>
            <h3>Ordonner les phases</h3>
            <p>Ordonnez les différentes phases avant d'ajouter les quantités d'ingrédients.</p>
            <div>
                {props.addedPhases.map((phase) => (
                    <div key={phase.id_phase + '_' + phase.libelle_phase}>
                        <input 
                            type="number" 
                            min={1} 
                            max={props.addedPhases.length} 
                            step={1} 
                            value={ordre[props.addedPhases.indexOf(phase)]} 
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                const index = props.addedPhases.indexOf(phase);
                                ordre.splice(index, 1, Number(ev.target.value));
                                setOrdre(ordre.slice(0));
                            }}
                        ></input> {phase.libelle_phase}
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
                                const isBelowThreshold = (currentValue) => currentValue <= props.addedPhases.length && currentValue >= 1;
                                if (!ordre.every(isBelowThreshold)) {
                                    alert(`L'ordre donné à chaque phase doit nécessairement être compris entre 1 et ${props.addedPhases.length}.`);
                                    return;
                                }
                                const uniqueOrdre = (currentValue) => ordre.lastIndexOf(currentValue) === ordre.indexOf(currentValue);
                                if (!ordre.every(uniqueOrdre)) {
                                    alert(`L'ordre donné à chaque phase doit être unique.`);
                                    return;
                                }
                                var r = window.confirm("Si vous continuez les phases ordonnées seront enregistrées dans l'ordre actuel donné. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    scheduling();
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
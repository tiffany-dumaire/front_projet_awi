import React, { useEffect, useState } from 'react';
import { addPhaseFT, deletePhaseFT, modifyPhaseFT } from '../../../../api/phase.api';
import { Fiche_Complete_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import styles from './ModifyTaskScheduling.module.css';

export type ModifyTaskSchedulingProps = {
    idFT: number;
    addedPhases: Phase_Simple_Interface[];
    fiche: Fiche_Complete_Interface;
    scheduling: () => void;
};

export const ModifyTaskScheduling: React.FunctionComponent<ModifyTaskSchedulingProps> = (props: ModifyTaskSchedulingProps) => {
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
     * Ajout et modification des phases dans l'ordre
     */
    const scheduling = () => {
        props.addedPhases.forEach((phase) => {
            const phaseOld = (element) => phase.id_phase === element.id_phase;
            const index = props.fiche.phases.findIndex(phaseOld);
            if (index === -1) {
                addPhaseFT(phase.id_phase, props.idFT, ordre[props.addedPhases.indexOf(phase)]);
            } else {
                modifyPhaseFT(props.fiche.phases[index].id_phase_ft, ordre[props.addedPhases.indexOf(phase)])
            }
        });    
        setTimeout(
            () => props.scheduling(),
            2000
        )
    };

    /**
     * Retirer les phases qui ne sont plus dans la fiche avant de lancer le nouvel ordre
     */
    const modifyScheduling = () => {
        props.fiche.phases.forEach((p) => {
            const phaseOld = (element) => p.id_phase === element.id_phase;
            const index = props.addedPhases.findIndex(phaseOld);
            if (index === -1) {
                deletePhaseFT(p.id_phase_ft);
            }
        });
        setTimeout(
            () => scheduling(),
            2000
        )
    }

    return (
        <div className={styles.debutContainer}>
            <h3>Ordonner les phases</h3>
            <p>Ordonnez les diff??rentes phases avant d'ajouter les quantit??s d'ingr??dients.</p>
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
                                    alert(`L'ordre donn?? ?? chaque phase doit n??cessairement ??tre compris entre 1 et ${props.addedPhases.length}.`);
                                    return;
                                }
                                const uniqueOrdre = (currentValue) => ordre.lastIndexOf(currentValue) === ordre.indexOf(currentValue);
                                if (!ordre.every(uniqueOrdre)) {
                                    alert(`L'ordre donn?? ?? chaque phase doit ??tre unique.`);
                                    return;
                                }
                                var r = window.confirm("Si vous continuez les phases ordonn??es seront enregistr??es dans l'ordre actuel donn??. \nSouhaitez-vous tout de m??me continuer ?");
                                if (r) {
                                    modifyScheduling();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Ordonner les phases s??lectionn??es
                    </button>
                </div>
            </div>
        </div>
    );
}
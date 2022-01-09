import React, { useState } from 'react';
import { putPhase } from '../../../api/phase.api';
import { Phase_Simple_Interface } from '../../../interfaces/Phase.interface';
import styles from './InitialiserEtape.module.css';

export type InitialiserEtapeProps = {
    id_phase: number;
    phase: Phase_Simple_Interface;
};

export const InitialiserEtape: React.FunctionComponent<InitialiserEtapeProps> = (props: InitialiserEtapeProps) => {
    //attribut de la phase
    const [libelle_phase, setLibellePhase] = useState<string>(props.phase.libelle_phase);
    const [libelle_denrees, setLibelleDenrees] = useState<string>(props.phase.libelle_denrees);
    const [description, setDescription] = useState<string>(props.phase.description_phase);
    const [duree, setDuree] = useState<number>(props.phase.duree_phase);

    /**
     * Modifier la phase
     * @param id_phase 
     * @param libelle_phase 
     * @param libelle_denrees 
     * @param description 
     * @param duree 
     */
    const modifyPhase = (
        id_phase: number,
        libelle_phase: string,
        libelle_denrees: string,
        description: string,
        duree: number
    ) => {
        putPhase(id_phase, libelle_phase, libelle_denrees, description, duree);
        alert('Les informations de la phase ont été modifiées en base.');
    }

    return (
        <div className={styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Créer une nouvelle phase</h3>
            <p>Vous pourrez réutiliser cette phase dans plusieurs fiches techniques en la sélectionnant parmi les différentes phases lors de la création d'une fiche technique.</p>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Intitulé de la phase</label>
                </div>
                <div>
                    <label className={styles.label}>Intitulé des denrées*</label>
                </div>
                <div>
                    <label className={styles.label}>Durée de la phase (en minutes)</label>
                </div>
                
                <div>
                    <label className={styles.label}>Description de la phase</label>
                </div>
                <div></div>
                <div>
                    <input className={styles.input} type="text" placeholder={'Saisir l\'intitulé de la phase..'} value={libelle_phase} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibellePhase(ev.target.value)}></input>
                </div>
                <div>
                    <input className={styles.input} type="text" placeholder={'Saisir l\'intitulé des denrées de la phase..'} value={libelle_denrees} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibelleDenrees(ev.target.value)}></input>
                </div>
                <div>
                    <input className={styles.input} type="number" placeholder={'Saisir la durée de la phase..'} value={duree} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setDuree(Number(ev.target.value))}></input>
                </div>
                <div>
                    <textarea
                        className={styles.fieldDescription}
                        rows={50}
                        placeholder={'Saisir la description de la phase...'}
                        value={description}
                        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(ev.target.value)}
                        required
                    />
                </div>
                <div>
                    <button 
                        className={styles.buttonNext2}
                        onClick={
                            () => {
                                modifyPhase(props.id_phase, libelle_phase, libelle_denrees, description, duree);
                            }
                        } 
                    >
                        Modifier la phase
                    </button>
                </div>
            </div>
            <legend className={styles.legend}>* l'intitulé des denrées de la phase correspond au titre que vous retrouverez dans la colonne de gauche de votre fiche technique.</legend>
        </div>
    );
};

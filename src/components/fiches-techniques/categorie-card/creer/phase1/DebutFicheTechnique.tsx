import React from 'react';
import styles from './DebutFicheTechnique.module.css';

export type DebutFicheTechniqueProps = {
    id_fiche_technique?: number;
    nextStep: () => void;
};

export const DebutFicheTechnique: React.FunctionComponent<DebutFicheTechniqueProps> = (props: DebutFicheTechniqueProps) => {

    return (
        <div className={styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Créer une nouvelle fiche technique</h3>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Intitulé de la fiche technique</label>
                </div>
                <div>
                    <label className={styles.label}>Quel sera le nombre de couverts ?</label>
                </div>
                
                <div>
                    <label className={styles.label}>Désigner le responsable de la fiche</label>
                </div>
                <div></div>
                <div>
                    <input className={styles.input} type="text" placeholder={'Saisir l\'intitulé de la nouvelle fiche technique...'}></input>
                </div>
                <div>
                    <input className={styles.input} type="number" placeholder={'Saisir le nombre de couverts..'}></input>
                </div>
                <div>
                    <select>
                        <option>Pâtissier</option>
                        <option>Rôtisseur</option>
                    </select>
                </div>
                <div><button className={styles.buttonNext} onClick={() => props.nextStep()}>Passer à l'étape suivante</button></div>
            </div>
        </div>
    );
};

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
            <div>
                <label>Intitulé de la fiche technique</label>
                <input type="text"></input>
            </div>
            <div>
                <label>Quel sera le nombre de couverts ?</label>
                <input type="number"></input>
            </div>
            <div>
                <label>Désigner le responsable de la fiche :</label>
                <select>
                    <option>Pâtissier</option>
                    <option>Rôtisseur</option>
                </select>
            </div>
            <div><button onClick={() => props.nextStep()}>Passer à l'étape suivante</button></div>
        </div>
    );
};

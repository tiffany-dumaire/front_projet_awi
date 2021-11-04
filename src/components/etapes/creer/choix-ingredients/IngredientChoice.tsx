import React from 'react';
import styles from './IngredientChoice.module.css';

export type IngredientChoiceProps = {
    id_phase?: number;
    //nextStep: () => void;
};

export const IngredientChoice: React.FunctionComponent<IngredientChoiceProps> = (props: IngredientChoiceProps) => {

    return (
        <div className={styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Sélectionner des ingrédients</h3>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Intitulé de la phase</label>
                </div>
                <div>
                    <label className={styles.label}>Nombre de couverts*</label>
                </div>
                
                <div>
                    <label className={styles.label}>Description de la phase</label>
                </div>
                <div></div>
                <div>
                    <input className={styles.input} type="text" placeholder={'Saisir l\'intitulé de la phase...'}></input>
                </div>
                <div>
                    <input className={styles.input} type="number" placeholder={'Saisir le nombre de couverts...'}></input>
                </div>
                <div>
                <input className={styles.input} type="text" placeholder={'Saisir la description de la phase...'}></input>
                </div>
                <div>
                    <button 
                        className={styles.buttonNext} 
                    >
                        Passer à l'étape suivante
                    </button>
                </div>
            </div>
            <legend className={styles.legend}>* les quantités utilisées pour chaque ingrédient devront être définies en fonction du nombre de couverts définis dans l'initialisation de la phase.</legend>
        </div>
    );
};

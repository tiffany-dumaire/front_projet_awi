import React from 'react';
import styles from './IngredientChoice.module.css';

export type IngredientChoiceProps = {
    id_phase?: number;
    disabled: boolean;
};

export const IngredientChoice: React.FunctionComponent<IngredientChoiceProps> = (props: IngredientChoiceProps) => {
    return (
        <div className={props.disabled ? styles.debutContainer2 : styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Sélectionner des ingrédients</h3>
            <p>Sélectionner les ingrédients permettant de réaliser cette étape.</p>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Intitulé de la phase</label>
                </div> 
                <div>
                    <label className={styles.label}>Description de la phase</label>
                </div>
            </div>
            <div className={styles.gridContainer2}>
                <div>

                </div>
                <div></div>
            </div>
            <div className={styles.gridContainer}>
                <div></div>
                <div>
                    <button className={styles.buttonNext}>
                        Voir le récapitulatif de la phase
                    </button>
                </div>
            </div>
        </div>
    );
};

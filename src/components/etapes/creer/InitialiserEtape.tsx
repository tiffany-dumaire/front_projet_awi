import React from 'react';
import styles from './InitialiserEtape.module.css';

export type InitialiserEtapeProps = {
    id_phase?: number;
    //nextStep: () => void;
};

export const InitialiserEtape: React.FunctionComponent<InitialiserEtapeProps> = (props: InitialiserEtapeProps) => {

    return (
        <div className={styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Créer une nouvelle fiche technique</h3>
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
                        Initialiser la phase
                    </button>
                </div>
            </div>
            <legend className={styles.legend}>* le nombre de couverts de la phase permettra de recalculer les doses d'ingrédients ultérieurement lorsque la phase sera liée à une fiche technique ayant un nombre de couverts différents.</legend>
        </div>
    );
};

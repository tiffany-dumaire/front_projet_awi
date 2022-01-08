import React, { useState } from 'react';
import styles from './IngredientChoice.module.css';
import { Stock_Interface } from '../../../interfaces/Ingredient.interface';

export type IngredientChoiceProps = {
    ingredients: Array<Stock_Interface>;
    selectedIngredients: Array<Stock_Interface>;
    addI: (ingredient: Stock_Interface) => void;
    removeI: (ingredient: Stock_Interface) => void;
    next: () => void;
};

export const IngredientChoice: React.FunctionComponent<IngredientChoiceProps> = (props: IngredientChoiceProps) => {
    const [ingredients, setIngredients] = useState<Array<Stock_Interface>>(props.ingredients);

    const [word, setWord] = useState<string>('');
    /**
     * Rechercher des phases en fonction de "word"
     */
     const searchPhases = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = props.ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
        setIngredients(searchResult);
    }

    return (
        <div className={styles.debutContainer}>
            <h3>Sélectionner des ingrédients</h3>
            <p>Sélectionner les ingrédients permettant de réaliser cette étape. Les quantités pour chaque ingrédient seront définies lors de la création de fiche technique.</p>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Liste des ingrédients</label>
                </div> 
                <div>
                    <label className={styles.label}>Ingrédients sélectionnés</label>
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.gridContainer3}>
                    <input
                        placeholder="Rechercher un ingrédient..."
                        className={styles.input2}
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
                    {ingredients.length === 0 ? 
                        'Vous ne pouvez pas ajouter d\'autres ingrédients' : 
                        ingredients.map((ingredient) => (
                            <div className={styles.click} key={'i' + ingredient.code} onClick={() => {
                                props.addI(ingredient);
                                setWord('');
                            }}>
                                <span className={styles.add}>+</span> {ingredient.libelle}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list}>
                    {props.selectedIngredients.map((i) => (
                        <div className={styles.click} key={'a' + i.code} onClick={() => {
                            props.removeI(i);
                        }}> 
                            {i.libelle} ❌
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
                                var r = window.confirm("Si vous continuez cela mettra fin au choix des ingrédients. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.next();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Modifier les stocks
                    </button>
                </div>
            </div>
        </div>
    );
};

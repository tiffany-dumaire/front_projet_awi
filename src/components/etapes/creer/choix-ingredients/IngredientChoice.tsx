import React, { useEffect, useState } from 'react';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { Phase_Ingredient_Interface } from '../../../../interfaces/Phase.interface';
import styles from './IngredientChoice.module.css';
import { useHistory } from 'react-router-dom';

export type IngredientChoiceProps = {
    id_phase?: number;
    ingredients: Array<Ingredient_Interface>;
    phaseIngredients: Array<Phase_Ingredient_Interface>;
    addAnIngredient?: (code: number, libelle: string) => void;
    pullAnIngredient?: (phaseI: Phase_Ingredient_Interface) => void;
    disabled: boolean;
};

export const IngredientChoice: React.FunctionComponent<IngredientChoiceProps> = (props: IngredientChoiceProps) => {
    //recherche
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>(props.ingredients);
    //ingrédient ajouté
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>(props.phaseIngredients);
    //changement de vue
    const history = useHistory();
    //recherche
    const [word, setWord] = useState<string>('');

    /**
     * Rechercher des phases en fonction de "word"
     */
     const searchPhases = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = props.ingredients.filter(ingredient => ingredient.libelle.toLowerCase().match(regex));
        setIngredients(searchResult);
    }

    /**
     * Redirection vers le détail de la phase
     * @param id 
     */
    const goTo = (id: number) => {
        const url = `/phases/view/${id}`;
        history.push(url);
    };

    useEffect(() => {
        if (props.phaseIngredients) {
          setAddedIngredients(props.phaseIngredients);
        }
        if (props.ingredients) {
            setIngredients(props.ingredients);
        }
    }, [props.ingredients, props.phaseIngredients]);

    return (
        <div className={props.disabled ? styles.debutContainer2 : styles.debutContainer}>
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
                    {props.ingredients.length === 0 ? 
                        'Vous ne pouvez pas ajouter d\'autres ingrédients' : 
                        ingredients.map((ingredient) => (
                            <div className={styles.click} key={'i' + ingredient.code} onClick={() => {
                                if(props.addAnIngredient) {
                                    props.addAnIngredient(ingredient.code, ingredient.libelle);
                                    setWord('');
                                }
                            }}>
                                <span className={styles.add}>+</span> {ingredient.libelle}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list}>
                    {addedIngredients.map((i) => (
                        <div className={styles.click} key={'a' + i.code} onClick={() => {
                            if(props.pullAnIngredient) {
                                props.pullAnIngredient(i);
                            }
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
                                var r = window.confirm("Si vous continuez cela mettra fin à la création de la phase. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    goTo(props.id_phase ? props.id_phase : 0);
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Voir le récapitulatif de la phase
                    </button>
                </div>
            </div>
        </div>
    );
};

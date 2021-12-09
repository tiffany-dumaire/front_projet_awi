/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { Phase_Ingredient_Interface } from '../../../../interfaces/Phase.interface';
import { IoMdAddCircle } from "react-icons/io";
import styles from './IngredientChoice.module.css';

export type IngredientChoiceProps = {
    id_phase?: number;
    ingredients: Array<Ingredient_Interface>;
    phaseIngredients: Array<Phase_Ingredient_Interface>;
    addAnIngredient?: (code: number, libelle: string) => void;
    pullAnIngredient?: (phaseI: Phase_Ingredient_Interface) => void;
    disabled: boolean;
};

export const IngredientChoice: React.FunctionComponent<IngredientChoiceProps> = (props: IngredientChoiceProps) => {
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>(props.ingredients);
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>(props.phaseIngredients);

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
            {/* Faire un affichage grid puis flex column pour mobile*/}
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
            <div className={styles.gridContainer2}>
                <div className={styles.list}>
                    {props.ingredients.length === 0 ? 
                        'Vous ne pouvez pas ajouter d\'autres ingrédients' : 
                        ingredients.map((ingredient) => (
                            <div className={styles.click} key={'i' + ingredient.code} onClick={() => {
                                if(props.addAnIngredient) {
                                    props.addAnIngredient(ingredient.code, ingredient.libelle);
                                }
                            }}>
                                <IoMdAddCircle className={styles.add} /> {ingredient.libelle}
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
                                var txt;
                                var r = window.confirm("Press a button!");
                                if (r) {
                                    txt = "You pressed OK!";
                                } else {
                                    txt = "You pressed Cancel!";
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

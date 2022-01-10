import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postQuantityIngredient, putQuantityIngredient } from '../../../../api/phase.api';
import { Fiche_Complete_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { Phase_Ingredients_Interface } from '../../../../interfaces/Phase.interface';
import { Denrees_Phase } from '../../../../models/Denrees.model';
import styles from './ModifyQuantityChoice.module.css';

export type ModifyQuantityChoiceProps = {
    id_fiche_technique: number;
    fiche: Fiche_Complete_Interface;
    phases_quantity: Phase_Ingredients_Interface[];
    setLoading: (loading: boolean) => void;
};

export const ModifyQuantityChoice: React.FunctionComponent<ModifyQuantityChoiceProps> = (props: ModifyQuantityChoiceProps) => {
    //liste des ingrédients par phase ajoutés
    const [phases, setPhases] = useState<Phase_Ingredients_Interface[]>(props.phases_quantity);
    //changement de vue
    const history = useHistory();

    /**
     * 
     * @param id_phase 
     * @param id_phase_ingredient 
     * @param libelle 
     * @param quantite 
     */
    const modifyQuantity = (id_phase: number, id_phase_ingredient: number, libelle: string, quantite: number) => {
        const phase = (element) => element.id_phase === id_phase;
        const index = phases.findIndex(phase);
        const phase_ingredient = (element2) => element2.id_phase_ingredient === id_phase_ingredient;
        const index2 = phases[index].ingredients.findIndex(phase_ingredient);
        phases[index].ingredients.splice(index2, 1, new Denrees_Phase(id_phase_ingredient, libelle, quantite));
        setPhases(phases.slice(0));
    };

    /**
     * Ajout des quantités d'ingrédient par phase
     */
    const addQuantities = () => {
        props.setLoading(false);
        phases.forEach((phase) => {
            const phaseSearchIndex = (element) => element.id_phase === phase.id_phase;
            const index = props.fiche.phases.findIndex(phaseSearchIndex);
            if (index === -1) {
                phase.ingredients.forEach((ingredient) => {
                    postQuantityIngredient(props.id_fiche_technique, ingredient.id_phase_ingredient, ingredient.quantite);
                });
            } else {
                phase.ingredients.forEach((ingredient) => {
                    const ingredientSearchIndex = (element) => element.id_phase_ingredient === ingredient.id_phase_ingredient;
                    const index2 = props.fiche.phases[index].ingredients.findIndex(ingredientSearchIndex);
                    if (index2 === -1) {
                        postQuantityIngredient(props.id_fiche_technique, ingredient.id_phase_ingredient, ingredient.quantite);
                    } else {
                        putQuantityIngredient(ingredient.id_phase_ingredient, ingredient.quantite);
                    }
                });
            }
        });
        setTimeout(
            () => history.push(`/fiches techniques/details/${props.id_fiche_technique}`)
        , 7000);
    }

    return (
        <div className={styles.debutContainer}>
            <h3>Ajouter les quantités pour chaque ingrédients par phase</h3>
            <div className={styles.flexContainer}>
                {phases.map((phase_quantity) => (
                    <div key={'phase_quantity_' + phase_quantity.id_phase}>
                        <h4>{phase_quantity.libelle_phase}</h4>
                        {phase_quantity.ingredients.map((ingredient) => (
                            <div className={styles.gridContainer} key={'ingredient_phase_' + ingredient.id_phase_ingredient}>
                                <div>
                                    <input className={styles.input} type="number" value={ingredient.quantite} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyQuantity(phase_quantity.id_phase, ingredient.id_phase_ingredient, ingredient.libelle, Number(ev.target.value))}></input>
                                </div>
                                <div>
                                    <label className={styles.label}>{ingredient.libelle}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className={styles.gridContainer}>
                    <div></div>
                    <div>
                        <button 
                            className={styles.buttonNext}
                            onClick={
                                () => {
                                    var r = window.confirm("Êtes-vous sûr d'avoir bien vérifié toutes les quantités avant de sauvegarder la fiche ?");
                                    if (r) {
                                        addQuantities();
                                    } else {
                                        return;
                                    }
                                }
                            }
                        >
                            Ordonner les phases sélectionnées
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postQuantityIngredient } from '../../../../api/phase.api';
import { Phase_Ingredients_Interface } from '../../../../interfaces/Phase.interface';
import { Denrees_Phase } from '../../../../models/Denrees.model';
import styles from './QuantityChoice.module.css';

export type QuantityChoiceProps = {
    id_fiche_technique: number;
    phases_quantity: Phase_Ingredients_Interface[];
    setLoading: (loading: boolean) => void;
};

export const QuantityChoice: React.FunctionComponent<QuantityChoiceProps> = (props: QuantityChoiceProps) => {
    const [phases, setPhases] = useState<Phase_Ingredients_Interface[]>(props.phases_quantity);
    const history = useHistory();

    const modifyQuantity = (id_phase: number, id_phase_ingredient: number, libelle: string, quantite: number) => {
        const phase = (element) => element.id_phase === id_phase;
        const index = phases.findIndex(phase);
        const phase_ingredient = (element2) => element2.id_phase_ingredient === id_phase_ingredient;
        const index2 = phases[index].ingredients.findIndex(phase_ingredient);
        phases[index].ingredients.splice(index2, 1, new Denrees_Phase(id_phase_ingredient, libelle, quantite));
        setPhases(phases.slice(0));
    };

    const addQuantities = () => {
        props.setLoading(false);
        phases.forEach((phase) => {
            phase.ingredients.forEach((ingredient) => {
                postQuantityIngredient(props.id_fiche_technique, ingredient.id_phase_ingredient, ingredient.quantite);
            });
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

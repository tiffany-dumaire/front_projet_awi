import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createFicheTechnique } from "../../../api/fiche_technique.api";
import { addPhaseFT, postQuantityIngredient } from "../../../api/phase.api";
import { Fiche_Complete_Interface } from "../../../interfaces/Fiche_Technique.interface";
import styles from './ClonerFicheTechnique.module.css';

export type ClonerFicheTechniqueProps = {
    ficheTechnique: Fiche_Complete_Interface;
    setLoading: (loading: boolean) => void;
}

export const ClonerFicheTechnique: React.FunctionComponent<ClonerFicheTechniqueProps> = (props: ClonerFicheTechniqueProps) => {
    //nombre de couverts pour la nouvelle fiche clonée
    const [newNBCouverts, setNewNBCouverts] = useState<number>(props.ficheTechnique.nombre_couverts);
    //changement de vue
    const history = useHistory();

    /**
     * Cloner la fiche en ajouter les éléments de base
     */
    const clonerFiche = () => {
        props.setLoading(false);
        createFicheTechnique(props.ficheTechnique.libelle_fiche_technique, newNBCouverts, props.ficheTechnique.id_responsable, props.ficheTechnique.id_categorie_fiche).then((result) => { 
            setTimeout(
                () => addPhasesScheduled(result)
            , 2000);
        });
        
    }

    /**
     * Ajouter les phases dans le même ordre que la fiche actuelle en la clonant
     * @param id_fiche_technique 
     */
    const addPhasesScheduled = (id_fiche_technique: number) => {
        props.ficheTechnique.phases.forEach((phase) => {
            addPhaseFT(phase.id_phase, id_fiche_technique, phase.ordre);
        });
        setTimeout(
            () => addAllIngredient(id_fiche_technique),
            3000
        )
    }

    /**
     * Ajout des quantités d'ingrédients sur la nouvelle fiche en recalculant les quantités
     * @param id_fiche_technique 
     */
    const addAllIngredient = (id_fiche_technique: number) => {
        props.ficheTechnique.phases.forEach((phase) => {
            phase.ingredients.forEach((ingredient) => {
                postQuantityIngredient(id_fiche_technique, ingredient.id_phase_ingredient, ingredient.unite === 'Piece' || ingredient.unite === 'Unite' ? Math.ceil(newNBCouverts * (ingredient.quantite/ props.ficheTechnique.nombre_couverts)) : Number((newNBCouverts * (ingredient.quantite/ props.ficheTechnique.nombre_couverts)).toFixed(3)));
            });
        });
        setTimeout(
            () => {
                history.push(`/fiches techniques/byCategorie/${props.ficheTechnique.id_categorie_fiche}`);
            }
        , 6000);
    }

    return (
        <div className={styles.detail}>
            <h4>Cloner la fiche technique en utilisant un nombre de couverts différent</h4>
            <div>
                <input className={styles.input} value={newNBCouverts} type="number" placeholder={'Nombre de couverts'} step={1} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setNewNBCouverts(Number(ev.target.value))}></input>
                <button className={styles.clonerFiche} onClick={() => clonerFiche()}>Cloner la fiche</button>
            </div>
            
        </div>
    );
}
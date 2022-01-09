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
    const [newNBCouverts, setNewNBCouverts] = useState<number>(props.ficheTechnique.nombre_couverts);
    const history = useHistory();

    const clonerFiche = () => {
        props.setLoading(false);
        createFicheTechnique(props.ficheTechnique.libelle_fiche_technique, newNBCouverts, props.ficheTechnique.id_responsable, props.ficheTechnique.id_categorie_fiche).then((result) => { 
            setTimeout(
                () => addPhasesScheduled(result)
            , 2000);
        });
        
    }

    const addPhasesScheduled = (id_fiche_technique: number) => {
        props.ficheTechnique.phases.forEach((phase) => {
            addPhaseFT(phase.id_phase, id_fiche_technique, phase.ordre);
        });
        setTimeout(
            () => addAllIngredient(id_fiche_technique),
            3000
        )
    }

    const addAllIngredient = (id_fiche_technique: number) => {
        props.ficheTechnique.phases.forEach((phase) => {
            phase.ingredients.forEach((ingredient) => {
                postQuantityIngredient(id_fiche_technique, ingredient.id_phase_ingredient, newNBCouverts * (ingredient.quantite/ props.ficheTechnique.nombre_couverts));
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
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../../../api/ingredient.api';
import { addIngredient, getDenreesByPhase, getPhaseByID, pullIngredient } from '../../../../api/phase.api';
import { IngredientChoice } from '../../../../components/etapes/modifier/choix-ingredients/IngredientChoice';
import { InitialiserEtape } from '../../../../components/etapes/modifier/InitialiserEtape';
import { Loading } from '../../../../components/loading/Loading';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { Phase_Ingredient_Interface, Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import { Phase_Ingredient } from '../../../../models/Phase.model';
import styles from './ModifyPhase.module.css';

export function ModifyPhase(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //ingrédient existants
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>([]);
    //ingrédient ajoutés à la phase
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>([]);
    //paramètre de l'url
    const { id_phase } = useParams<{ id_phase: string }>();
    //information de la phase
    const [phase, setPhase] = useState<Phase_Simple_Interface>();
    
    /**
     * Récupération des infos de base de la phase
     */
    const getPhase = () => {
        getPhaseByID(Number(id_phase)).then((phase) => {
            setPhase(phase);
        });
    }

    /**
     * Récupération des denrées déjà dans la phase
     */
    const getAddedIngredient = () => {
        getDenreesByPhase(Number(id_phase)).then((list) => {
            setAddedIngredients(list);
        });
    }

    /**
     * Récupération de tous les ingrédients existants en bdd
     */
    const getIngredientList = () => {
        getIngredients().then((list) => {
            setIngredients(list);
        });
    };

    /**
     * Ajouter un ingrédient à la phase
     * @param code 
     * @param id_phase 
     * @param libelle 
     */
    const addAnIngredient = (code: number, id_phase: number, libelle: string) => {
        const codeToSearch = (element) => element.code === code;
        const index = addedIngredients.findIndex(codeToSearch);
        if (index === -1) {
            addIngredient(code, id_phase).then((id_phase_ingredient) => {
                addedIngredients.push(new Phase_Ingredient(id_phase_ingredient, code, id_phase, libelle));
                setAddedIngredients(addedIngredients.slice(0));
            });
        }
    };

    /**
     * Retirer un ingrédient de la phase
     * @param phase_ingredient 
     */
    const pullAnIngredient = (phase_ingredient: Phase_Ingredient_Interface) => {
        pullIngredient(phase_ingredient.id_phase_ingredient).then((result) => {
            let index = addedIngredients.indexOf(phase_ingredient);
            addedIngredients.splice(index, 1);
            setAddedIngredients(addedIngredients.slice(0));
        });
    };


    useEffect(() => {
        getPhase();
        getAddedIngredient();
        getIngredientList();        
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'Modifier une phase'}</title>
            </Helmet>
            {
                loading && phase ? (
                    <div className={styles.container}>
                        <InitialiserEtape id_phase={Number(id_phase)} phase={phase} />
                        <IngredientChoice id_phase={Number(id_phase)} ingredients={ingredients} phaseIngredients={addedIngredients} addAnIngredient={(code: number, libelle: string) => addAnIngredient(code, Number(id_phase), libelle)} pullAnIngredient={(phaseI: Phase_Ingredient_Interface) => pullAnIngredient(phaseI)} disabled={Number(id_phase) ? false : true} />
                    </div>
                ) : 
                (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}

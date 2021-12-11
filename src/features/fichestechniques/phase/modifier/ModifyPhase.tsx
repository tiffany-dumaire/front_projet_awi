import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../../../api/ingredient.api';
import { addIngredient, getDenreesByPhase, pullIngredient } from '../../../../api/phase.api';
import { IngredientChoice } from '../../../../components/etapes/modifier/choix-ingredients/IngredientChoice';
import { InitialiserEtape } from '../../../../components/etapes/modifier/InitialiserEtape';
import { Loading } from '../../../../components/loading/Loading';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { Phase_Ingredient_Interface } from '../../../../interfaces/Phase.interface';
import { Phase_Ingredient } from '../../../../models/Phase.model';
import styles from './ModifyPhase.module.css';

export function ModifyPhase(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>([]);
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>([]);
    const { id_phase } = useParams<{ id_phase: string }>();
    
    const getAddedIngredient = () => {
        getDenreesByPhase(Number(id_phase)).then((list) => {
            list.forEach((denree) => {
                addedIngredients.push(denree);
                setAddedIngredients(addedIngredients.slice(0));
            });
        });
    }

    const getIngredientList = () => {
        getIngredients().then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(ingredient);
                setIngredients(ingredients.slice(0));
            });
        });
    };

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

    const pullAnIngredient = (phase_ingredient: Phase_Ingredient_Interface) => {
        pullIngredient(phase_ingredient.id_phase_ingredient).then((result) => {
            let index = addedIngredients.indexOf(phase_ingredient);
            console.log(index);
            addedIngredients.splice(index, 1);
            setAddedIngredients(addedIngredients.slice(0));
        });
    };


    useEffect(() => {
        getAddedIngredient();
        getIngredientList();        
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'Modifier une phase'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <InitialiserEtape id_phase={Number(id_phase)} />
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

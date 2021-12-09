import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getIngredients } from '../../../../api/ingredient.api';
import { addIngredient, pullIngredient } from '../../../../api/phase.api';
import { IngredientChoice } from '../../../../components/etapes/creer/choix-ingredients/IngredientChoice';
import { InitialiserEtape } from '../../../../components/etapes/creer/InitialiserEtape';
import { Loading } from '../../../../components/loading/Loading';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { Phase_Ingredient_Interface } from '../../../../interfaces/Phase.interface';
import { Phase_Ingredient } from '../../../../models/Phase.model';
import styles from './CreatePhase.module.css';

export function CreatePhase(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [newId, setNewId] = useState<number>();
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>([]);
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>([]);
    
    const getIngredientList = () => {
        getIngredients().then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(ingredient);
                setIngredients(ingredients.slice(0));
            });
        });
    };

    const addAnIngredient = (code: number, id_phase: number, libelle: string) => {
        addIngredient(code, id_phase).then((id_phase_ingredient) => {
            addedIngredients.push(new Phase_Ingredient(id_phase_ingredient, code, id_phase, libelle));
            setAddedIngredients(addedIngredients.slice(0));
        });
    };

    const pullAnIngredient = (phase_ingredient: Phase_Ingredient_Interface) => {
        pullIngredient(phase_ingredient.id_phase_ingredient).then((result) => {
            let index = addedIngredients.indexOf(phase_ingredient);
            console.log(index);
            addedIngredients.splice(index, 1);
            setAddedIngredients(addedIngredients.slice(0));
        });
    };

    console.log(addedIngredients);

    useEffect(() => {
        getIngredientList();        
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'➕ Créer une phase'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        {newId ? (
                            <>
                                <InitialiserEtape id_phase={newId} setId={(id: number) => setNewId(id)}/>
                                <IngredientChoice ingredients={ingredients} phaseIngredients={addedIngredients} addAnIngredient={(code: number, libelle: string) => addAnIngredient(code, newId, libelle)} pullAnIngredient={(phaseI: Phase_Ingredient_Interface) => pullAnIngredient(phaseI)} disabled={newId ? false : true} />
                            </>
                        ) :(
                            <>
                                <InitialiserEtape setId={(id: number) => setNewId(id)}/>
                                <IngredientChoice id_phase={newId} ingredients={ingredients} phaseIngredients={addedIngredients} disabled={newId ? false : true} />
                            </>
                        )}
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

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
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //id de la phase nouvellement créée
    const [newId, setNewId] = useState<number>();
    //liste d'ingrédients existants
    const [ingredients, setIngredients] = useState<Array<Ingredient_Interface>>([]);
    //liste d'ingrédient de la nouvelle phase
    const [addedIngredients, setAddedIngredients] = useState<Array<Phase_Ingredient_Interface>>([]);
    
    /**
     * Récupération de tous les ingrédients existants
     */
    const getIngredientList = () => {
        getIngredients().then((list) => {
            setIngredients(list);
        });
    };

    /**
     * Ajout d'un ingrédient à la phase
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
                <title>{'➕ Créer une phase'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        {newId ? (
                            <>
                                <InitialiserEtape id_phase={newId} setId={(id: number) => setNewId(id)}/>
                                <IngredientChoice id_phase={newId} ingredients={ingredients} phaseIngredients={addedIngredients} addAnIngredient={(code: number, libelle: string) => addAnIngredient(code, newId, libelle)} pullAnIngredient={(phaseI: Phase_Ingredient_Interface) => pullAnIngredient(phaseI)} disabled={newId ? false : true} />
                            </>
                        ) :(
                            <>
                                <InitialiserEtape setId={(id: number) => setNewId(id)}/>
                                <IngredientChoice ingredients={ingredients} phaseIngredients={addedIngredients} disabled={newId ? false : true} />
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

import React, { useEffect, useState } from 'react';
import styles from './SelectedIngredientsStock.module.css';
import { Helmet } from 'react-helmet';
import { ModifyStock } from '../../../../components/stocks/modify/ModifyStock';
import { Stock_Interface } from '../../../../interfaces/Ingredient.interface';
import { getIngredients } from '../../../../api/ingredient.api';
import { useHistory } from 'react-router-dom';
import { LoadingStock } from '../../../../components/loading/loading-stock/LoadingStock';
import { IngredientChoice } from '../../../../components/stocks/modify/IngredientChoice';


export function SelectedIngredientsStock(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //ensemble des ingrédients choisis
    const [selectedIngredients, setSelectedIngredients] = useState<Stock_Interface[]>([]);
    //tous les ingrédients de la catégorie choisies avec leur stock respectif
    const [ingredients, setIngredients] = useState<Stock_Interface[]>([]);
    //etape
    const [step, setStep] = useState<number>(1);
    //changement de vue
    const history = useHistory();

    /**
     * Récupération de la liste de tous les ingrédients
     */
     const getIngredientList = () => {
        getIngredients().then((list) => {
            setIngredients(list);
        });
    };

    /**
     * Aller à l'étape suivante
     */
    const changeStep = () => {
        if (step === 1) setStep(2);
        else setStep(1);
    }

    /**
     * Redicection vers la liste de tous les ingrédients du mercurial
     */
    const goToMercurialCategory = () => {
        setLoading(false);
        setTimeout(
            () => history.push(`/mercurial/byCategorie/0`)
        , 7000);
    }

    /**
     * Ajout d'un ingrédient à la liste
     * @param ingredient 
     */
    const addIngredient = (ingredient: Stock_Interface) => {
        const index = selectedIngredients.indexOf(ingredient);
        if (index === -1) {
            selectedIngredients.push(ingredient);
            setSelectedIngredients(selectedIngredients.slice(0));
        }
    };

    /**
     * Retirer un ingrédient de la liste
     * @param ingredient 
     */
    const removeIngredient = (ingredient: Stock_Interface) => {
        const index = selectedIngredients.indexOf(ingredient);
        selectedIngredients.splice(index, 1);
        setSelectedIngredients(selectedIngredients.slice(0));
    }

    useEffect(() => {
        getIngredientList();
        setTimeout(
            () => setLoading(true)
        , 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'🛒 Entrées de stock | Par catégorie 🛒'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        {
                            step === 1 ? (
                                <IngredientChoice 
                                    ingredients={ingredients} 
                                    selectedIngredients={selectedIngredients} 
                                    addI={(ingredient: Stock_Interface) => addIngredient(ingredient)} 
                                    removeI={(ingredient: Stock_Interface) => removeIngredient(ingredient)} 
                                    next={() => changeStep()} 
                                />
                            ) : (
                                <ModifyStock ingredients={selectedIngredients} goTo={() => goToMercurialCategory()}/>
                            )
                        }
                    </div>
                ) : 
                (
                    <div className={styles.container}>
                        <LoadingStock />
                    </div>
                )
            }
        </>
    );
}
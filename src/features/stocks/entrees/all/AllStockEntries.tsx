import React, { useEffect, useState } from 'react';
import styles from './AllStockEntries.module.css';
import { Helmet } from 'react-helmet';
import { Stock_Interface } from '../../../../interfaces/Ingredient.interface';
import { getIngredients } from '../../../../api/ingredient.api';
import { Stock } from '../../../../models/Ingredient.model';
import { ModifyStock } from '../../../../components/stocks/modify/ModifyStock';
import { useHistory } from 'react-router-dom';
import { LoadingStock } from '../../../../components/loading/loading-stock/LoadingStock';


export function AllStockEntries(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<Stock_Interface[]>([]);
    const history = useHistory();

    const goToMercurial = () => {
        setLoading(false);
        setTimeout(
            () => history.push('/mercurial/byCategorie/0')
        , 10000);
    }
    
    const getIngredientList = () => {
        getIngredients().then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(new Stock(ingredient.code,ingredient.libelle,ingredient.unite,ingredient.stock));
                setIngredients(ingredients.slice(0));
            });
            setLoading(true);
        });
    };

    useEffect(() => {
        getIngredientList();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'🛒 Entrées de stock | Tous 🛒'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <ModifyStock ingredients={ingredients} goTo={() => goToMercurial()} />
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
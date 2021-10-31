import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getIngredientByCategorie } from '../../api/ingredient.api';
import { Loading } from '../../components/loading/Loading';
import { IngredientDetail } from '../../components/mercurial/ingredient/IngredientDetail';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import { Ingredient } from '../../models/Ingredient.model';
import { generateDate } from '../../utils/date.util';
import styles from './DetailIngredient.module.css';

export function DetailIngredient(): JSX.Element {
    const [date, setDate] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const [ingredient, setIngredient] = useState<Ingredient_Interface>(new Ingredient(0,'','',0,0,false,0,0));
    const { id_ingredient } = useParams<{ id_ingredient: string }>();

    async function getIngredient() {
        await getIngredientByCategorie(Number(id_ingredient)).then((i) => {
            setIngredient(i);
        });
    };

    useEffect(() => {
        setDate(generateDate());
        getIngredient();
        setLoader(true);
    },[]);

    console.log(typeof ingredient);
    
    return (
        <>
            <Helmet>
                <title>{ingredient?.libelle}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <IngredientDetail ingredient={ingredient} />
                    </div>
                ) : (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
                     
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { getCategoriesAllergenes } from '../../../api/categorie.api';
import { Loading } from '../../../components/loading/Loading';
import { InitNewIngredient } from '../../../components/mercurial/ingredient/create/InitNewIngredient';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { Ingredient } from '../../../models/Ingredient.model';
import styles from './CreateIngredient.module.css';

export function CreateIngredient(): JSX.Element {
    //const [date, setDate] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const [ingredient, setIngredient] = useState<Ingredient_Interface>(new Ingredient(0,'','',0,0,false,0,0));
    const [categorie_allergene, setCategorieAllergene] = useState<string>('Aucune');

    const getAllergeneCategorie = () => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                if (categorie.id_categorie_allergene === ingredient.id_categorie_allergene) {
                    setCategorieAllergene(categorie.categorie_allergene);
                    setLoader(true);
                }
            });
        });
    };

    useEffect(() => {
        getAllergeneCategorie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{ingredient?.libelle}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <Link className={styles.link} to={`/mercurial/byCategorie/${ingredient.id_categorie}`}>
                            <IoIosArrowBack /> Retour à la catégorie
                        </Link>
                        <div className={styles.container2}>
                            <InitNewIngredient />
                        </div>  
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
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { getCategoriesAllergenes } from '../../api/categorie.api';
import { getIngredientByCategorie } from '../../api/ingredient.api';
import { Loading } from '../../components/loading/Loading';
import { IngredientDetail } from '../../components/mercurial/ingredient/IngredientDetail';
import { EditIngredient } from '../../components/modals/edit-ingredient/EditIngredient';
import { Ingredient_Interface } from '../../interfaces/Ingredient.interface';
import { Ingredient } from '../../models/Ingredient.model';
//import { generateDate } from '../../utils/date.util';
import styles from './DetailIngredient.module.css';

export function DetailIngredient(): JSX.Element {
    //const [date, setDate] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const [edited, setEdited] = useState<boolean>(false);
    const [ingredient, setIngredient] = useState<Ingredient_Interface>(new Ingredient(0,'','',0,0,false,0,0));
    const [categorie_allergene, setCategorieAllergene] = useState<string>('Aucune');
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const { id_ingredient } = useParams<{ id_ingredient: string }>();

    const getAllergeneCategorie = () => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                if (categorie.id_categorie_allergene === ingredient.id_categorie_allergene) {
                    setCategorieAllergene(categorie.categorie_allergene);
                }
            });
        });
    };

    const getIngredient = () => {
        getIngredientByCategorie(Number(id_ingredient)).then((i) => {
            setIngredient(i);
            setLoader(true);
        });
    };

    useEffect(() => {
        //setDate(generateDate());
        getIngredient();
        getAllergeneCategorie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        ///setDate(generateDate());
        if (edited) {
            setLoader(false);
            getIngredient();
            getAllergeneCategorie();
        } 
        setEdited(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[edited]);
    
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
                            {
                                onEdit ? (
                                    <EditIngredient ingredient={ingredient} setEdited={(edit: boolean) => setEdited(edit)} setOnEdit={(edit: boolean) => setOnEdit(edit)}/>
                                ) : (
                                    <IngredientDetail ingredient={ingredient} categorie_allergene={categorie_allergene} setOnEdit={(edit: boolean) => setOnEdit(edit)}/>
                                )
                            }  
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
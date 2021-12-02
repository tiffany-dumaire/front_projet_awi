import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getCategorieAllergeneById, getCategorieById, getCategoriesAllergenes } from '../../../api/categorie.api';
import { getIngredientByCategorie } from '../../../api/ingredient.api';
import { Loading } from '../../../components/loading/Loading';
import { EditIngredient } from '../../../components/mercurial/ingredient/edit/EditIngredient';
import { IngredientDetail } from '../../../components/mercurial/ingredient/IngredientDetail';
import { Categorie_Interface } from '../../../interfaces/Categorie.interface';
import { Categorie_Allergenes_Interface } from '../../../interfaces/Categorie_Allergenes.interface';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { Ingredient } from '../../../models/Ingredient.model';
import styles from './DetailIngredient.module.css';

export function DetailIngredient(): JSX.Element {
    const [loader, setLoader] = useState<boolean>(true);
    const [edited, setEdited] = useState<boolean>(false);
    const [ingredient, setIngredient] = useState<Ingredient_Interface>(new Ingredient(0,'','',0,0,false,0,0));
    const [categorie, setCategorie] = useState<Categorie_Interface>();
    const [categorie_allergene, setCategorieAllergene] = useState<Categorie_Allergenes_Interface>();
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const { id_ingredient } = useParams<{ id_ingredient: string }>();

    const getAllergeneCategorie = () => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                if (categorie.id_categorie_allergene === ingredient.id_categorie_allergene) {
                    setCategorieAllergene(categorie);
                }
            });
        });
    };

    async function getIngredient() {
        await getIngredientByCategorie(Number(id_ingredient)).then((i) => {
            setIngredient(i);
            getCategorieById(i.id_categorie).then((c) => {
                setCategorie(c);
            });
            if (i.id_categorie_allergene != null) {
                getCategorieAllergeneById(i.id_categorie_allergene).then((c2) => {
                    setCategorieAllergene(c2);
                });
            }
            setLoader(true);
        });
    };

    useEffect(() => {
        getIngredient();
        getAllergeneCategorie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (edited) {
            getIngredient();
            getAllergeneCategorie();
        } 
        setEdited(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[edited]);
    
    return (
        <>
            <Helmet>
                <title>{'🍽️ ' + ingredient?.libelle}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/mercurial/byCategorie/${ingredient.id_categorie}`}>
                                Retour à la catégorie
                            </Link>
                        </div>
                        <div className={styles.container2}>
                            {
                                onEdit ? (
                                    <EditIngredient ingredient={ingredient} setEdited={(edit: boolean) => setEdited(edit)} setOnEdit={(edit: boolean) => setOnEdit(edit)}/>
                                ) : (
                                    <IngredientDetail ingredient={ingredient} categorie={categorie} categorie_allergene={categorie_allergene} setOnEdit={(edit: boolean) => setOnEdit(edit)}/>
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
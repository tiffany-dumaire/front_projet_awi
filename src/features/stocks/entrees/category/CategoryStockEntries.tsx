import React, { useEffect, useState } from 'react';
import styles from './CategoryStockEntries.module.css';
import { Helmet } from 'react-helmet';
import { ModifyStock } from '../../../../components/stocks/modify/ModifyStock';
import { Stock_Interface } from '../../../../interfaces/Ingredient.interface';
import { getIngredientsByCategorie } from '../../../../api/ingredient.api';
import { Stock } from '../../../../models/Ingredient.model';
import { Categorie_Interface } from '../../../../interfaces/Categorie.interface';
import { getCategories } from '../../../../api/categorie.api';
import { CategorieChoice } from '../../../../components/stocks/modify/CategorieChoice';
import { useHistory } from 'react-router-dom';
import { LoadingStock } from '../../../../components/loading/loading-stock/LoadingStock';

export function CategoryStockEntries(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //catégorie choisie pour y modifier les stocks
    const [id_categorie, setIdCategorie] = useState<number>(0);
    //ensemble des catégories existantes
    const [categories, setCategories] = useState<Categorie_Interface[]>([]);
    //tous les ingrédients de la catégorie choisies avec leur stock respectif
    const [ingredients, setIngredients] = useState<Stock_Interface[]>([]);
    //etape
    const [step, setStep] = useState<number>(1);
    //changement de vue
    const history = useHistory();

    /**
     * Récupération de la liste des ingrédients pour une catégorie donnée
     * @param id_categorie 
     */
    const getIngredientList = (id_categorie: number) => {
        getIngredientsByCategorie(id_categorie).then((list) => {
            list.forEach((ingredient) => {
                ingredients.push(new Stock(ingredient.code,ingredient.libelle,ingredient.unite,ingredient.stock));
                setIngredients(ingredients.slice(0));
            });
        });
    };

    /**
     * Récupération de l'ensemble des catégories existantes
     */
    const getAllCategories = () => {
        getCategories().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });
    }

    /**
     * Aller à l'étape suivante
     */
    const changeStep = () => {
        if (step === 1) setStep(2);
        else setStep(1);
    }

    /**
     * Redicection vers la catégorie du mercurial pour laquelle on modifie les stocks
     */
    const goToMercurialCategory = () => {
        setLoading(false);
        setTimeout(
            () => history.push(`/mercurial/byCategorie/${id_categorie}`)
        , 7000);
    }

    useEffect(() => {
        getAllCategories();
        setTimeout(
            () => setLoading(true)
        , 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (step) {
            getIngredientList(id_categorie); 
        }       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[step]);
    
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
                                <CategorieChoice id_categorie={id_categorie} categories={categories} setStep={() => changeStep()} setCategorie={(idC: number) => setIdCategorie(idC)} />
                            ) : (
                                <ModifyStock ingredients={ingredients} goTo={() => goToMercurialCategory()}/>
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
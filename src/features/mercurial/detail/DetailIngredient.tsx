import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getCategorieAllergeneById, getCategorieById, getCategoriesAllergenes } from '../../../api/categorie.api';
import { deleteIngredient, getIngredientByCategorie } from '../../../api/ingredient.api';
import { Loading } from '../../../components/loading/Loading';
import { EditIngredient } from '../../../components/mercurial/ingredient/edit/EditIngredient';
import { IngredientDetail } from '../../../components/mercurial/ingredient/IngredientDetail';
import { Categorie_Interface } from '../../../interfaces/Categorie.interface';
import { Categorie_Allergenes_Interface } from '../../../interfaces/Categorie_Allergenes.interface';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { Ingredient } from '../../../models/Ingredient.model';
import styles from './DetailIngredient.module.css';

export function DetailIngredient(): JSX.Element {
    //loading
    const [loader, setLoader] = useState<boolean>(true);
    //modifié lorsqu'un ingrédient est modifié
    const [edited, setEdited] = useState<boolean>(false);
    //récupération des informations de l'ingrédient
    const [ingredient, setIngredient] = useState<Ingredient_Interface>(new Ingredient(0,'','',0,0,false,0,0));
    //catégorie de l'ingrédient
    const [categorie, setCategorie] = useState<Categorie_Interface>();
    //catégorie allergene de l'ingrédient
    const [categorie_allergene, setCategorieAllergene] = useState<Categorie_Allergenes_Interface>();
    //en cours d'édition ou non
    const [onEdit, setOnEdit] = useState<boolean>(false);
    //paramètre de l'url
    const { id_ingredient } = useParams<{ id_ingredient: string }>();
    //changement de vue
    const history = useHistory();

    /**
     * 
     */
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
        });
    };

    const deleteAnIngredient = () => {
        var r = window.confirm("La suppression de cette fiche produit affectera toutes les étapes et fiches techniques dans lesquelles vous avez utilisé cet ingrédient. Êtes-vous sûr de vouloir malgré tout supprimer cet ingrédient définitivement du mercurial ?");
        if (r) {
            deleteIngredient(Number(id_ingredient)).then((result) => {
                history.push('/mercurial');
            });
        } else {
            return;
        }
    };

    useEffect(() => {
        getIngredient();
        getAllergeneCategorie();
        setTimeout(
            () => setLoader(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (edited) {
            getIngredient();
            getAllergeneCategorie();
            setEdited(false);
        } 
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
                                    <IngredientDetail ingredient={ingredient} categorie={categorie} categorie_allergene={categorie_allergene} setOnEdit={(edit: boolean) => setOnEdit(edit)} deleteI={() => deleteAnIngredient()}/>
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
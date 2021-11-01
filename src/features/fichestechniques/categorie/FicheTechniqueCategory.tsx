import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styles from './FicheTechniqueCategory.module.css';
import { Loading } from '../../../components/loading/Loading';
import { SearchFiche } from '../../../components/search-bar/fiches-techniques/SearchFiche';

export function FicheTechniqueCategory(): JSX.Element {
    //const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    //const { id_categorie } = useParams<{ id_categorie: string }>();
    const [loading, setLoading] = useState<boolean>(false);

   /*  async function getIngredientList() {
        if (Number(id_categorie) === 0) {
            await getIngredients().then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                });
                setLoading(true);
            });
        }else {
            await getIngredientsByCategorie(Number(id_categorie)).then((list) => {
                list.forEach((ingredient) => {
                    ingredients.push(ingredient);
                    setIngredients(ingredients.slice(0));
                }); 
                setLoading(true);
            });
        }  
    }; */

    useEffect(() => {
        //getIngredientList(); 
        setLoading(true);       
    },[]);

    return(
        <>
            <Helmet>
                <title>{}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <Link className={styles.link} to={`/fiches techniques`}>
                            <IoIosArrowBack /> Retour aux fiches techniques
                        </Link>
                        <div className={styles.searchContainer}>
                            <SearchFiche />
                        </div>
                    </div>
                ) : (
                    <div className={styles.mercurialContainer}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
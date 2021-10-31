import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategoriesAllergenes } from '../../api/categorie.api';
import { Loading } from '../../components/loading/Loading';
import { CategorieAllergenesCard } from '../../components/mercurial/CategorieAllergenesCard';
import { SearchAllergene } from '../../components/search-bar/allergenes/SearchAllergene';
import { Categorie_Allergenes_Interface } from '../../interfaces/Categorie_Allergenes.interface';
import { Categorie_Allergenes } from '../../models/Categorie_Allergernes.model';
import styles from './ListeAllergenesPage.module.css';

export function ListeAllergenesPage(): JSX.Element {
    const [categories, setCategories] = useState<Categorie_Allergenes_Interface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
                setLoading(true);
            });
        });

        categories.push(new Categorie_Allergenes(0, 'TOUS','#660066'));
        setCategories(categories.slice(0));
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Liste des allergènes'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.mercurialContainer}>
                        <div className={styles.mercurialContainer2}>
                            <SearchAllergene />
                        </div>
                        <div className={styles.mercurialContainer}>
                            {
                                categories.map((categorie: Categorie_Allergenes_Interface) => (
                                    <Link className={styles.link} to={`/liste des allergenes/byCategorie/${categorie.id_categorie_allergene}`}>
                                        <CategorieAllergenesCard id_categorie_allergene={categorie.id_categorie_allergene} categorie_allergene={categorie.categorie_allergene} color_allergene={categorie.color_allergene} />
                                    </Link>
                                ))        
                            }
                        </div>
                    </div>
                ) : 
                (
                    <div className={styles.mercurialContainer}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
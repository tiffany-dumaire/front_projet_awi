import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategories } from '../../api/categorie.api';
import { Loading } from '../../components/loading/Loading';
import { CategorieCard } from '../../components/mercurial/CategorieCard';
import { SearchIngredient } from '../../components/search-bar/ingredients/SearchIngredient';
import { Categorie_Interface } from '../../interfaces/Categorie.interface';
import { Categorie } from '../../models/Categorie.model';
import styles from './MercurialPage.module.css';

export function MercurialPage(): JSX.Element {
    const [categories, setCategories] = useState<Categorie_Interface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCategories().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
                setLoading(true);
            });
        });

        categories.push(new Categorie(0, 'TOUS','#660066'));
        setCategories(categories.slice(0));
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'Mercurial'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <div className={styles.mercurialContainer2}>
                            <SearchIngredient />
                        </div>
                        <div className={styles.mercurialContainer}>
                            {
                                categories.map((categorie: Categorie_Interface) => (
                                    <Link className={styles.link} to={`/mercurial/byCategorie/${categorie.id_categorie}`}>
                                        <CategorieCard id_categorie={categorie.id_categorie} categorie={categorie.categorie} color={categorie.color} />
                                    </Link>
                                ))        
                            }
                        </div>
                    </div>
                ) : 
                (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
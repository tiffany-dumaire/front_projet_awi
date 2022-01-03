import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategoriesAllergenes } from '../../api/categorie.api';
import { Loading } from '../../components/loading/Loading';
import { CategorieAllergenesCard } from '../../components/mercurial/CategorieAllergenesCard';
import { SearchIngredient } from '../../components/search-bar/ingredients/SearchIngredient';
import { Categorie_Allergenes_Interface } from '../../interfaces/Categorie_Allergenes.interface';
import { SidebarMenu } from '../../layout/sidebar-menu/SidebarMenu';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'☠️ Liste des allergènes ☠️'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <SidebarMenu 
                            width={320} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/mercurial', name: 'Rechercher un ingrédient'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/phases/create', name: 'Créer une étape'},
                                    {to: '/phases', name: 'Liste des phases'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.searchContainer}>
                            <SearchIngredient />
                        </div>
                        <div className={styles.mercurialContainer}>
                            {
                                categories.map((categorie: Categorie_Allergenes_Interface) => (
                                    <>
                                        {categorie.id_categorie_allergene === 0 ? 
                                            <Link  key={categorie.id_categorie_allergene} className={styles.link} to={`/liste des allergenes/byCategorie/${categorie.id_categorie_allergene}`}>
                                                <CategorieAllergenesCard id_categorie_allergene={categorie.id_categorie_allergene} categorie_allergene={categorie.categorie_allergene} color_allergene={categorie.color_allergene} />
                                            </Link>
                                        :
                                            <div key={categorie.id_categorie_allergene} className={styles.link}>
                                                <CategorieAllergenesCard id_categorie_allergene={categorie.id_categorie_allergene} categorie_allergene={categorie.categorie_allergene} color_allergene={categorie.color_allergene} />
                                            </div>
                                        }
                                    </>
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
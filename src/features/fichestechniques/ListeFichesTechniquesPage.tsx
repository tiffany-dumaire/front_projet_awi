import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategoriesFiches } from '../../api/categorie.api';
import { CategorieFTCard } from '../../components/fiches-techniques/categorie-card/CategorieFTCard';
import { Loading } from '../../components/loading/Loading';
import { SearchFiche } from '../../components/search-bar/fiches-techniques/SearchFiche';
import { Categorie_Fiches_Interface } from '../../interfaces/Categorie_Fiches.interface';
import { SidebarMenu } from '../../layout/sidebar-menu/SidebarMenu';
import { Categorie_Fiches } from '../../models/Categorie_Fiches.model';
import styles from './ListeFichesTechniquesPage.module.css';

export function ListeFichesTechniquesPage(): JSX.Element {
    //catégories de fiches techniques
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        categories.push(new Categorie_Fiches(0, 'TOUS','#660066'));
        setCategories(categories.slice(0));
        getCategoriesFiches().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
                setLoading(true);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'📋 Liste des fiches techniques 📋'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.listeFTContainer}>
                        <SidebarMenu 
                            width={320} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/phases/create', name: 'Créer une étape'},
                                    {to: '/phases', name: 'Liste des phases'},
                                    {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/mercurial', name: 'Voir le mercurial'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.container}>
                            <div className={styles.searchContainer}>
                                <SearchFiche />
                            </div>
                            <div className={styles.categoryContainer}>
                                {
                                    categories.map((categorie: Categorie_Fiches_Interface) => (
                                        <div key={`keyf_${categorie.id_categorie_fiche}`}>
                                            {categorie.id_categorie_fiche === 0 ? 
                                                <Link key={categorie.id_categorie_fiche} className={styles.link} to={`/fiches techniques/byCategorie/${categorie.id_categorie_fiche}`}>
                                                    <CategorieFTCard id_categorie_fiche={categorie.id_categorie_fiche} categorie_fiche={categorie.categorie_fiche} color_fiche={categorie.color_fiche} />
                                                </Link>
                                            :
                                                <div key={categorie.id_categorie_fiche} className={styles.link}>
                                                    <CategorieFTCard id_categorie_fiche={categorie.id_categorie_fiche} categorie_fiche={categorie.categorie_fiche} color_fiche={categorie.color_fiche} />
                                                </div>
                                            }
                                        </div>
                                        
                                    ))        
                                }
                            </div>
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
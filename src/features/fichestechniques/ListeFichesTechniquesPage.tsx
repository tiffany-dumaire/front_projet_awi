import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getCategoriesFiches } from '../../api/categorie.api';
import { CategorieFTCard } from '../../components/fiches-techniques/categorie-card/CategorieFTCard';
import { Loading } from '../../components/loading/Loading';
import { SearchFiche } from '../../components/search-bar/fiches-techniques/SearchFiche';
import { Categorie_Fiches_Interface } from '../../interfaces/Categorie_Fiches.interface';
import { SidebarMenu } from '../../layout/sidebar-menu/SidebarMenu';
import styles from './ListeFichesTechniquesPage.module.css';

export function ListeFichesTechniquesPage(): JSX.Element {
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCategoriesFiches().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
                setLoading(true);
            });
        });
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Liste des fiches techniques'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.listeFTContainer}>
                        <SidebarMenu 
                            width={300} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '', name: 'Imprimer une fiche technique'},
                                    {to: '', name: 'Créer une étape'},
                                    {to: '', name: 'Ajouter un ingrédient au mercurial'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
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
                                        <Link className={styles.link} to={`/fiches techniques/byCategorie/${categorie.id_categorie_fiche}`}>
                                            <CategorieFTCard id_categorie_fiche={categorie.id_categorie_fiche} categorie_fiche={categorie.categorie_fiche} color_fiche={categorie.color_fiche} />
                                        </Link>
                                    ))        
                                }
                            </div>
                            {/* Afficher les catégories de fiches techniques sous formes de cartes :
                                    - Catégorie nom
                                    - Couleur catégorie
                                Ensuite dans les catégories, afficher les fiches techniques sous formes de cartes :
                                    - Intitulé
                                    - Nombre de couverts
                                    - Responsable
                                    - Catégorie                       
                            */}
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
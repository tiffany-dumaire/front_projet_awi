import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useHistory, useParams } from "react-router-dom";
import styles from './SearchFiche.module.css';

export const SearchFiche: React.FunctionComponent = () => {
    //recherche
    const [search, setSearch] = useState<string>('');
    //paramètre de l'url
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    //changement de vue
    const history = useHistory();

    /**
     * Redirection vers la recherche de fiche
     * @param search 
     */
    const goToSearchFT = (search: string) => {
        const url = `/fiches techniques/search/${search}`;
        history.push(url);
    }

    /**
     * Redirection vers la recherche de fiche par catégorie
     * @param search 
     * @param id_categorie_fiche 
     */
    const goToSearchFTByCategorie = (search: string, id_categorie_fiche: number) => {
        const url = `/fiches techniques/search/${search}/byCategorie/${id_categorie_fiche}`;
        history.push(url);
    }
    
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <input
                    placeholder="Rechercher un ingrédient..."
                    className={styles.search}
                    type='text'
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value)}
                    value={search}
                ></input>
                <button 
                    className={styles.button}
                    onClick={
                        () => {
                            if (search !== '') {
                                if (id_categorie_fiche !== undefined && Number(id_categorie_fiche) !== 0) {
                                    goToSearchFTByCategorie(search, Number(id_categorie_fiche));
                                } else {
                                    goToSearchFT(search);
                                }
                            }
                        }
                    }
                >
                    <FcSearch className={styles.buttonSearch} /> Rechercher une fiche
                </button>
            </div>      
        </div>
    );
};
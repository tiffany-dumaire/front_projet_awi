import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useHistory, useParams } from "react-router-dom";
import styles from './SearchFiche.module.css';

export const SearchFiche: React.FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    const { id_categorie_fiche } = useParams<{ id_categorie_fiche: string }>();
    const history = useHistory();

    const goToSearchFT = (search: string) => {
        const url = `/fiches techniques/search/${search}`;
        history.push(url);
    }

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
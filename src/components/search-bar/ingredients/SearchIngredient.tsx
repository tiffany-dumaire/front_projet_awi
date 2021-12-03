import React, { useState } from "react";
import styles from './SearchIngredient.module.css';
import { FcSearch } from "react-icons/fc";
import { useParams, useHistory } from "react-router";

export const SearchIngredient: React.FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    const { id_categorie } = useParams<{ id_categorie: string }>();
    const { id_categorie_allergene } = useParams<{id_categorie_allergene: string }>();
    const history = useHistory();
    
    const goToSearchIngredients = (search: string) => {
        const url = `/mercurial/search/${search}`;
        history.push(url);
    }

    const goToSearchIngredientsByCategorie = (search: string, id_categorie: number) => {
        const url = `/mercurial/search/${search}/byCategorie/${id_categorie}`;
        history.push(url);
    }

    const goToSearchIngredientsByCategorieAllergene = (search: string, id_categorie_allergene: number) => {
        const url = `/mercurial/search/${search}/byCategorieAllergene/${id_categorie_allergene}`;
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
                                if (id_categorie !== undefined && Number(id_categorie) !== 0) {
                                    goToSearchIngredientsByCategorie(search, Number(id_categorie));
                                } else {
                                    if (id_categorie_allergene !== undefined && Number(id_categorie_allergene) !== 0) {
                                        goToSearchIngredientsByCategorieAllergene(search, Number(id_categorie_allergene));
                                    } else {
                                        goToSearchIngredients(search);
                                    }
                                }
                            }
                        }
                    }
                >
                    <FcSearch className={styles.buttonSearch} /> Rechercher un ingrédient
                </button>
            </div>
        </div>
    );
};
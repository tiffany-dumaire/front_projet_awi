import React, { useState } from "react";
//import { Ingredient_Interface } from "../../../interfaces/Ingredient.interface";
import styles from './SearchIngredient.module.css';
import { FcSearch } from "react-icons/fc";

export const SearchIngredient: React.FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    //const [ingredients, setIngredients] = useState<Ingredient_Interface[]>([]);
    
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
                <FcSearch className={styles.iconeSearch}/>
            </div>
            
        </div>
    );
};
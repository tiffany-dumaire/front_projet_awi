import React, { useState } from "react";
import styles from './SearchFiche.module.css';

export const SearchFiche: React.FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <input
                    placeholder="Rechercher une fiche technique..."
                    className={styles.search}
                    type='text'
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value)}
                    value={search}
                ></input>
            </div>      
        </div>
    );
};
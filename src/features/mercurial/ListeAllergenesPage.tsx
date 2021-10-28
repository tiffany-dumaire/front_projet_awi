import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './ListeAllergenesPage.module.css';

export function ListeAllergenesPage(): JSX.Element {
    return(
        <>
            <Helmet>
                <title>{'Liste des allergènes'}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
            </div>
        </>
    );
}
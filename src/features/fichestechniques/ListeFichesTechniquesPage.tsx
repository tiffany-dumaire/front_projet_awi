import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './ListeFichesTechniquesPage.module.css';

export function ListeFichesTechniquesPage(): JSX.Element {
    return(
        <>
            <Helmet>
                <title>{'Liste des fiches techniques'}</title>
            </Helmet>
            <div className={styles.listeFTContainer}>
                <input placeholder="rechercher une fiche technique"></input>
            </div>
        </>
    );
}
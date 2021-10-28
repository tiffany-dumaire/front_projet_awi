import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from './MercurialPage.module.css';

export function MercurialPage(): JSX.Element {
    return(
        <>
            <Helmet>
                <title>{'Mercurial'}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <input placeholder="rechercher un catégorie ou un ingrédient"></input>
            </div>
        </>
    );
}
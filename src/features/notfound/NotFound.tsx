import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound(): JSX.Element {
    const history = useHistory();

    const goTo = () => {
        const url = `/`;
        history.push(url);
    };

    return (
        <>
            <Helmet>
                <title>{'⚠️ 404 - Page non trouvée ⚠️'}</title>
            </Helmet>
            <div className={styles.container}>
                <div className={styles.row}><span className={styles.icone}>⚠️ </span><h4 className={styles.icone2}>Cette page n'existe pas.</h4></div>
                <div><button className={styles.buttonReturn} onClick={() => goTo()}>Retour à l'accueil</button></div>
            </div>
        </>
    );
}
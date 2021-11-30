import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { IngredientChoice } from '../../../../components/etapes/creer/choix-ingredients/IngredientChoice';
import { InitialiserEtape } from '../../../../components/etapes/creer/InitialiserEtape';
import { Loading } from '../../../../components/loading/Loading';
import styles from './CreatePhase.module.css';

export function CreatePhase(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    //const [newId, setNewId] = useState<number>();

    useEffect(() => {
        setLoading(true);
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'➕ Créer une phase'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <InitialiserEtape />
                        <IngredientChoice />
                    </div>
                ) : 
                (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}

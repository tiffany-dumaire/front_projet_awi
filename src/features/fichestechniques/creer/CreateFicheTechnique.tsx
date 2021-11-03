import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { DebutFicheTechnique } from '../../../components/fiches-techniques/categorie-card/creer/phase1/DebutFicheTechnique';
import { Loading } from '../../../components/loading/Loading';
import styles from './CreateFicheTechnique.module.css';

export function CreateFicheTechnique(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [numStep, setNumStep] = useState<number>(1);
    const [newId, setNewId] = useState<number>();

    useEffect(() => {
        setLoading(true);
    },[]);

    const nextStep = () => {
        if (numStep === 1) {
            setNumStep(2);
        }
    };
    
    return(
        <>
            <Helmet>
                <title>{'Mercurial'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        {numStep === 1 ? (
                            <DebutFicheTechnique nextStep={nextStep} />
                        ) : (
                            null
                        )}
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

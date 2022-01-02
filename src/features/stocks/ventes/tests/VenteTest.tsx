import React, { useEffect, useState } from 'react';
import styles from './VenteTest.module.css';
import { Helmet } from 'react-helmet';
import { Loading } from '../../../../components/loading/Loading';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';

export function VenteTest(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        setStep(1);
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Helmet>
                <title>{'Réaliser une vente test'}</title>
            </Helmet>
            {loading ? (
                <div className={styles.venteTestContainer}>
                    <SidebarMenu 
                        width={320} 
                        height={'530px'} 
                        to={
                            [
                                {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                {to: '/fiches techniques', name: 'Voir la liste des fiches techniques'},
                                {to: '/phases/create', name: 'Créer une étape'},
                                {to: '/phases', name: 'Liste des phases'},
                                {to: '/mercurial/create', name: 'Ajouter un ingrédient au mercurial'},
                                {to: '/mercurial', name: 'Voir le mercurial'},
                                {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                {to: '/stocks', name: 'Gérer les stocks'}
                            ]
                        }
                    />
                    <div className={styles.container}>
                        {step === 1 ? (
                            null
                            //<CategorieChoice id_categorie={id_categorie} categories={categories} setStep={() => changeStep()} setCategorie={(idC: number) => setIdCategorie(idC)} />
                        ) : (
                            null
                            //<ModifyStock ingredients={ingredients} goTo={() => goToMercurialCategory()}/>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <Loading />
                </div>
            )}
        </>
    );
}
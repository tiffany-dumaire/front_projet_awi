import React, { useEffect, useState } from 'react';
import styles from './Vente.module.css';
import { Helmet } from 'react-helmet';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';
import { Etiquette_Fiche_Technique_Interface, Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { etiquetteFiche, getFichesTechniques } from '../../../../api/fiche_technique.api';
import { LoadingStock } from '../../../../components/loading/loading-stock/LoadingStock';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export function Vente(): JSX.Element {
    //liste des fiches existantes
    const [fiches, setFiches] = useState<Fiche_Technique_Interface[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //configuration des étiquettes de fiche
    const [etiquettes, setEtiquettes] = useState<Etiquette_Fiche_Technique_Interface[]>([]);

    /**
     * Ajout d'une étiquette correspondant à une fiche dans la liste
     * @param id_fiche_technique 
     */
    const addEtiquette = (id_fiche_technique: number) => {
        etiquetteFiche(id_fiche_technique).then((result) => {
            etiquettes.push(result);
            setEtiquettes(etiquettes.slice(0));
        });
    };

    useEffect(() => {
        getFichesTechniques().then((result) => {
            result.forEach((fiche_technique) => {
                fiches.push(fiche_technique);
                setFiches(fiches.slice(0));
            });
        });
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Helmet>
                <title>{'🍱 Réaliser une vente test 🍱'}</title>
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
                        
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <LoadingStock />
                </div>
            )}
        </>
    );
}
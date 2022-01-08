import React, { useEffect, useState } from 'react';
import styles from './Vente.module.css';
import { Helmet } from 'react-helmet';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';
import { Etiquette_Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { etiquettesFiches } from '../../../../api/fiche_technique.api';
import { LoadingStock } from '../../../../components/loading/loading-stock/LoadingStock';
import { QuantiteParFiche } from '../../../../components/stocks/etiquette/quantity-meal/QuantiteParFiche';
import { VenteEtiquettes } from '../../../../components/stocks/etiquette/vente-etiquettes/VenteEtiquettes';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export function Vente(): JSX.Element {
    //liste des fiches existantes
    const [fiches, setFiches] = useState<Etiquette_Fiche_Technique_Interface[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //configuration des étiquettes de fiche
    const [etiquettes, setEtiquettes] = useState<Etiquette[]>([]);
    //étape de la création des étiquettes
    const [step, setStep] = useState<number>(1);

    /**
     * Ajout d'une étiquette correspondant à une fiche dans la liste
     * @param etiquette 
     */
    const addEtiquette = (etiquette: Etiquette_Fiche_Technique_Interface) => {
        const etiquetteToSearch = (element) => element.etiquette === etiquette;
        const index = etiquettes.findIndex(etiquetteToSearch);
        if (index === -1) {
            etiquettes.push({"quantity": 1, "etiquette": etiquette});
            setEtiquettes(etiquettes.slice(0));
        } else {
            etiquettes[index].quantity = etiquettes[index].quantity + 1;
            setEtiquettes(etiquettes.slice(0));
        }
    };

    /**
     * Retirer une étiquette de la liste
     * @param all
     * @param etiquette 
     */
    const removeEtiquette = (all: boolean, etiquette: Etiquette_Fiche_Technique_Interface) => {
        const etiquetteToSearch = (element) => element.etiquette === etiquette;
        const index = etiquettes.findIndex(etiquetteToSearch);
        if (etiquettes[index].quantity === 1 || all) {
            etiquettes.splice(index, 1);
            setEtiquettes(etiquettes.slice(0));
        } else {
            etiquettes[index].quantity = etiquettes[index].quantity - 1;
            setEtiquettes(etiquettes.slice(0));
        }
    }

    /**
     * Aller à l'étape suivante
     */
     const changeStep = () => {
        if (step === 1) setStep(2);
        else setStep(1);
    }

    useEffect(() => {
        etiquettesFiches().then((result) => {
            setFiches(result);
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
                <title>{'🍱 Editer une étiquette 🍱'}</title>
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
                        {step === 1 ? 
                            <QuantiteParFiche 
                                fiches={fiches} 
                                etiquettes={etiquettes} 
                                add={(etiquette: Etiquette_Fiche_Technique_Interface) => addEtiquette(etiquette)} 
                                remove={(all: boolean, etiquette: Etiquette_Fiche_Technique_Interface) => removeEtiquette(all, etiquette)} 
                                next={() => changeStep()} 
                            /> 
                        :
                            <VenteEtiquettes etiquettes={etiquettes} previous={() => changeStep()} />
                        }
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
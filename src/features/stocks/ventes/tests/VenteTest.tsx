import React, { useEffect, useState } from 'react';
import styles from './VenteTest.module.css';
import { Helmet } from 'react-helmet';
import { Loading } from '../../../../components/loading/Loading';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';
import { Etiquette_Fiche_Technique_Interface, Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { etiquetteFiche, getFichesTechniques } from '../../../../api/fiche_technique.api';
import { FicheTechniqueChoice } from '../../../../components/stocks/etiquette/FicheTechniqueChoice';

export function VenteTest(): JSX.Element {
    //liste des fiches existantes
    const [fiches, setFiches] = useState<Fiche_Technique_Interface[]>([]);
    //liste des fiches vendues
    const [addedFiches, setAddedFiches] = useState<Fiche_Technique_Interface[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //etape de la vente
    const [step, setStep] = useState<number>(1);
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

    /**
     * Ajout d'une fiche dans la liste des fiches vendues
     * @param fiche 
     */
    const addFiche = (fiche: Fiche_Technique_Interface) => {
        const index = addedFiches.indexOf(fiche);
        if (index === -1) {
            addedFiches.push(fiche);
            setAddedFiches(addedFiches.slice(0));
        }
    };

    /**
     * Suppression d'une fiche dans la liste des fiches vendues
     * @param fiche 
     */
    const removeFiche = (fiche: Fiche_Technique_Interface) => {
        const index = addedFiches.indexOf(fiche);
        addedFiches.splice(index, 1);
        setAddedFiches(addedFiches.slice(0));
    };

    /**
     * Passer à l'étape suivante
     */
    const nextStep = () => {
        if (step === 1) {
            setStep(2);
        } else {
            if (step === 2) {
                setStep(3)
            }
        }
    };

    useEffect(() => {
        getFichesTechniques().then((result) => {
            result.forEach((fiche_technique) => {
                fiches.push(fiche_technique);
                setFiches(fiches.slice(0));
            });
        });
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
                            <FicheTechniqueChoice fiches={fiches} addedFiches={addedFiches} addFiche={(fiche: Fiche_Technique_Interface) => addFiche(fiche)} removeFiche={(fiche: Fiche_Technique_Interface) => removeFiche(fiche)} next={() => nextStep()}  />
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
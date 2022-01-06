import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCategoriesFiches } from '../../../api/categorie.api';
import { createFicheTechnique } from '../../../api/fiche_technique.api';
import { getPhaseIngredients, getPhases } from '../../../api/phase.api';
import { getResponsables } from '../../../api/responsable.api';
import { DebutFicheTechnique } from '../../../components/fiches-techniques/creer/phase1/DebutFicheTechnique';
import { PhasesChoice } from '../../../components/fiches-techniques/creer/phase2/PhasesChoice';
import { TaskScheduling } from '../../../components/fiches-techniques/creer/phase3/TaskScheduling';
import { QuantityChoice } from '../../../components/fiches-techniques/creer/phase4/QuantityChoice';
import { LoadingFiche } from '../../../components/loading/loading-fiche/LoadingFiche';
import { Categorie_Fiches_Interface } from '../../../interfaces/Categorie_Fiches.interface';
import { Phase_Ingredients_Interface, Phase_Simple_Interface } from '../../../interfaces/Phase.interface';
import { Responsable_Interface } from '../../../interfaces/Responsable.interface';
import styles from './CreateFicheTechnique.module.css';

export function CreateFicheTechnique(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //catégories de fiches techniques existantes
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    //responsables existants
    const [responsables, setResponsables] = useState<Responsable_Interface[]>([]);
    //phases existantes
    const [phases, setPhases] = useState<Phase_Simple_Interface[]>([]);
    //phases ajoutées à la fiche technique
    const [addedPhases, setAddedPhases] = useState<Phase_Simple_Interface[]>([]);
    //étape de la création de la fiche
    const [numStep, setNumStep] = useState<number>(1);
    //id de la fiche nouvellement créée
    const [newId, setNewId] = useState<number>();
    //ingrédient des phases de la fiche technique
    const [phasesI, setPhasesI] = useState<Phase_Ingredients_Interface[]>([]);

    /**
     * Récupération des catégories de fiches techniques existantes
     */
    const getCategoriesList = () => {
        getCategoriesFiches().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });
    };

    /**
     * Récupération des responsables existants
     */
    const getResponsablesList = () => {
        getResponsables().then((list) => {
            list.forEach((responsable) => {
                responsables.push(responsable);
                setResponsables(responsables.slice(0));
            });
        });
    };

    /**
     * Récupération des phases existantes
     */
    const getPhasesList = () => {
        getPhases().then((list) => {
            list.forEach((phase) => {
                phases.push(phase);
                setPhases(phases.slice(0));
            });
        });
    };

    /**
     * Ajout des informations d'une nouvelle fiche technique à la bdd
     * @param libelle 
     * @param couverts 
     * @param id_categorie 
     * @param id_responsable 
     */
    const createFiche = (libelle: string, couverts: number, id_categorie: number, id_responsable: number) => {
        createFicheTechnique(libelle, couverts, id_responsable, id_categorie).then((id_fiche_technique) => {
            setNewId(id_fiche_technique);
        });
        nextStep();
    };

    /**
     * Ajout d'une phase à la fiche technique localement
     * @param phase 
     */
    const addAPhase = (phase: Phase_Simple_Interface) => {
        const index = addedPhases.indexOf(phase);
        if (index === -1) {
            addedPhases.push(phase);
            setAddedPhases(addedPhases.slice(0));
        }
    };

    /**
     * Retirer localement une phase à la fiche technique
     * @param phase 
     */
    const removeAPhase = (phase: Phase_Simple_Interface) => {
        const index = addedPhases.indexOf(phase);
        addedPhases.splice(index, 1);
        setAddedPhases(addedPhases.slice(0));
    };

    useEffect(() => {
        getCategoriesList();
        getResponsablesList();
        getPhasesList();
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    /**
     * Changement d'étape dans la création de la fiche technique
     */
    const nextStep = () => {
        if (numStep === 1) {
            setNumStep(2);
        } else {
            if (numStep === 2) {
                setNumStep(3)
            } else {
                setLoading(false);
                getPhaseIngredients(newId!).then((result) => {
                    result.forEach((phase) => {
                        phasesI.push(phase);
                        setPhasesI(phasesI.slice(0));
                    });
                });
                setTimeout(
                    () => {
                        setNumStep(4);
                        setLoading(true);
                    }
                , 5000);
            }
        }
    };
    
    return(
        <>
            <Helmet>
                <title>{'➕ Créer une fiche technique'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        {
                            numStep === 1 ? (
                                //<QuantityChoice phases_quantity={phasesI} />
                                <DebutFicheTechnique categories={categories} responsables={responsables} createFiche={(libelle: string, couverts: number, id_responsable: number, id_categorie: number) => createFiche(libelle, couverts, id_categorie, id_responsable)} />
                            ) : (
                                numStep === 2 ? (
                                    <PhasesChoice phases={phases} addedPhases={addedPhases} addPhase={(phase: Phase_Simple_Interface) => addAPhase(phase)} removePhase={(phase: Phase_Simple_Interface) => removeAPhase(phase)} next={() => nextStep()} />
                                ) : ( 
                                    numStep === 3 ? (
                                        <TaskScheduling idFT={newId ? newId : 0} addedPhases={addedPhases} scheduling={() => nextStep()} />
                                    ) : (
                                        <QuantityChoice phases_quantity={phasesI} setLoading={(loading: boolean) => setLoading(loading)} id_fiche_technique={newId!} />
                                    )
                                )
                                
                            )
                        }
                    </div>
                ) : 
                (
                    <div className={styles.container}>
                        <LoadingFiche />
                    </div>
                )
            }
        </>
    );
}

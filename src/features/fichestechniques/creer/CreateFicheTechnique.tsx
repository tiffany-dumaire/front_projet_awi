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
import { Loading } from '../../../components/loading/Loading';
import { Categorie_Fiches_Interface } from '../../../interfaces/Categorie_Fiches.interface';
import { Phase_Ingredients_Interface, Phase_Simple_Interface } from '../../../interfaces/Phase.interface';
import { Responsable_Interface } from '../../../interfaces/Responsable.interface';
import styles from './CreateFicheTechnique.module.css';

export function CreateFicheTechnique(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    const [responsables, setResponsables] = useState<Responsable_Interface[]>([]);
    const [phases, setPhases] = useState<Phase_Simple_Interface[]>([]);
    const [addedPhases, setAddedPhases] = useState<Phase_Simple_Interface[]>([]);
    const [numStep, setNumStep] = useState<number>(1);
    const [newId, setNewId] = useState<number>();
    const [phasesI, setPhasesI] = useState<Phase_Ingredients_Interface[]>([]);

    const getCategoriesList = () => {
        getCategoriesFiches().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });
    };

    const getResponsablesList = () => {
        getResponsables().then((list) => {
            list.forEach((responsable) => {
                responsables.push(responsable);
                setResponsables(responsables.slice(0));
            });
        });
    };

    const getPhasesList = () => {
        getPhases().then((list) => {
            list.forEach((phase) => {
                phases.push(phase);
                setPhases(phases.slice(0));
            });
        });
    };

    const createFiche = (libelle: string, couverts: number, id_categorie: number, id_responsable: number) => {
        createFicheTechnique(libelle, couverts, id_responsable, id_categorie).then((id_fiche_technique) => {
            setNewId(id_fiche_technique);
        });
        nextStep();
    };

    const addAPhase = (phase: Phase_Simple_Interface) => {
        const index = addedPhases.indexOf(phase);
        if (index === -1) {
            addedPhases.push(phase);
            setAddedPhases(addedPhases.slice(0));
        }
    };

    const removeAPhase = (phase: Phase_Simple_Interface) => {
        const index = addedPhases.indexOf(phase);
        addedPhases.splice(index, 1);
        setAddedPhases(addedPhases.slice(0));
    };

    useEffect(() => {
        getCategoriesList();
        getResponsablesList();
        getPhasesList();
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const nextStep = () => {
        if (numStep === 1) {
            setNumStep(2);
        } else {
            if (numStep === 2) {
                setNumStep(3)
            } else {
                setLoading(false);
                if(newId) {
                    getPhaseIngredients(newId).then((result) => {
                        setPhasesI(result);
                        setNumStep(4);
                        setLoading(true);
                    });
                }
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
                        <Loading />
                    </div>
                )
            }
        </>
    );
}

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getCategoriesFiches } from '../../../api/categorie.api';
import { getFicheByID, modifyFicheTechnique } from '../../../api/fiche_technique.api';
import { getPhaseIngredients, getPhases, getPhasesByFT } from '../../../api/phase.api';
import { getResponsables } from '../../../api/responsable.api';
import { DebutFicheTechnique } from '../../../components/fiches-techniques/creer/phase1/DebutFicheTechnique';
import { PhasesChoice } from '../../../components/fiches-techniques/creer/phase2/PhasesChoice';
import { TaskScheduling } from '../../../components/fiches-techniques/creer/phase3/TaskScheduling';
import { QuantityChoice } from '../../../components/fiches-techniques/creer/phase4/QuantityChoice';
import { Loading } from '../../../components/loading/Loading';
import { Categorie_Fiches_Interface } from '../../../interfaces/Categorie_Fiches.interface';
import { Fiche_Technique_Interface } from '../../../interfaces/Fiche_Technique.interface';
import { Phase_Ingredients_Interface, Phase_Simple_Interface } from '../../../interfaces/Phase.interface';
import { Responsable_Interface } from '../../../interfaces/Responsable.interface';
import styles from './ModifyFicheTechnique.module.css';

export function ModifyFicheTechnique(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //fiche technique
    const [ficheTechnique, setFicheTechnique] = useState<Fiche_Technique_Interface>();
    const { id_fiche_technique } = useParams<{ id_fiche_technique: string }>();
    //éléments importés de la bdd (catégorie de fiche technique, responsables, phases)
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    const [responsables, setResponsables] = useState<Responsable_Interface[]>([]);
    const [phases, setPhases] = useState<Phase_Simple_Interface[]>([]);
    //liste des phases
    const [addedPhases, setAddedPhases] = useState<Phase_Simple_Interface[]>([]);
    //ancien ordre
    const [oldOrder, setOldOrder] = useState<number[]>([]);
    //numéro d'étape
    const [numStep, setNumStep] = useState<number>(1);
    //ingrédient des phases
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

    /**
     * Modifier la fiche technique
     * @param libelle 
     * @param couverts 
     * @param id_categorie 
     * @param id_responsable 
     */
    const modifierFiche = (libelle: string, couverts: number, id_categorie: number, id_responsable: number) => {
        modifyFicheTechnique(ficheTechnique!.id_fiche_technique, libelle, couverts, id_responsable, id_categorie).then((result) => {
            nextStep();
        });
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
        getFicheByID(Number(id_fiche_technique)).then((ft) => {
            setFicheTechnique(ft);
        });
        getPhasesByFT(Number(id_fiche_technique)).then((phases) => {
            setAddedPhases(phases);
            phases.forEach((phase) => {
                oldOrder.push(phase.id_phase);
                setOldOrder(oldOrder.slice(0));
            });
            console.log(oldOrder);
        });
        getCategoriesList();
        getResponsablesList();
        getPhasesList();
        setTimeout(
            () => setLoading(true),
            3000
        );
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
                getPhaseIngredients(ficheTechnique!.id_fiche_technique).then((result) => {
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
                                <DebutFicheTechnique fiche={ficheTechnique} categories={categories} responsables={responsables} createFiche={(libelle: string, couverts: number, id_responsable: number, id_categorie: number) => modifierFiche(libelle, couverts, id_categorie, id_responsable)} />
                            ) : (
                                numStep === 2 ? (
                                    <PhasesChoice phases={phases} addedPhases={addedPhases} addPhase={(phase: Phase_Simple_Interface) => addAPhase(phase)} removePhase={(phase: Phase_Simple_Interface) => removeAPhase(phase)} next={() => nextStep()} />
                                ) : ( 
                                    numStep === 3 ? (
                                        <TaskScheduling idFT={ficheTechnique?.id_fiche_technique ? ficheTechnique?.id_fiche_technique : 0} addedPhases={addedPhases} scheduling={() => nextStep()} />
                                    ) : (
                                        <QuantityChoice phases_quantity={phasesI} setLoading={(loading: boolean) => setLoading(loading)} id_fiche_technique={ficheTechnique?.id_fiche_technique!} />
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

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCategoriesFiches } from '../../../api/categorie.api';
import { createFicheTechnique } from '../../../api/fiche_technique.api';
import { getResponsables } from '../../../api/responsable.api';
import { DebutFicheTechnique } from '../../../components/fiches-techniques/categorie-card/creer/phase1/DebutFicheTechnique';
import { Loading } from '../../../components/loading/Loading';
import { Categorie_Fiches_Interface } from '../../../interfaces/Categorie_Fiches.interface';
import { Responsable_Interface } from '../../../interfaces/Responsable.interface';
import styles from './CreateFicheTechnique.module.css';

export function CreateFicheTechnique(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Categorie_Fiches_Interface[]>([]);
    const [responsables, setResponsables] = useState<Responsable_Interface[]>([]);
    const [numStep, setNumStep] = useState<number>(1);
    const [newId, setNewId] = useState<number>();

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

    const createFiche = (libelle: string, couverts: number, id_categorie: number, id_responsable: number) => {
        createFicheTechnique(libelle, couverts, id_responsable, id_categorie).then((id_fiche_technique) => {
            setNewId(id_fiche_technique);
        });
        nextStep();
    };

    useEffect(() => {
        getCategoriesList();
        getResponsablesList();
        setLoading(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const nextStep = () => {
        if (numStep === 1) {
            setNumStep(2);
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
                                <DebutFicheTechnique categories={categories} responsables={responsables} createFiche={(libelle: string, couverts: number, id_responsable: number, id_categorie: number) => createFiche(libelle, couverts, id_categorie, id_responsable)} />
                            ) : (
                                null
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

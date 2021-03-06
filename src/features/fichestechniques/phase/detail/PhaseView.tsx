import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deletePhase, getDenreesByPhase, getPhaseByID } from '../../../../api/phase.api';
import { Loading } from '../../../../components/loading/Loading';
import { Phase_Ingredient_Interface, Phase_Simple_Interface } from '../../../../interfaces/Phase.interface';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';
import styles from './PhaseView.module.css';

export function PhaseView(): JSX.Element {
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //infos de la phase
    const [infos, setInfos] = useState<Phase_Simple_Interface>();
    //liste des denrées de la phase
    const [denrees, setDenrees] = useState<Array<Phase_Ingredient_Interface>>([]);
    //paramètre de l'url
    const { id_phase } = useParams<{ id_phase: string }>();
    //changement de vue
    const history = useHistory();

    /**
     * Redirection vers la modification de la phase
     */
    const goTo = () => {
        const url = `/phases/modify/${id_phase}`;
        history.push(url);
    };

    /**
     * Récupération des informations de base de la phase
     */
    const getInfosPhase = () => {
        getPhaseByID(Number(id_phase)).then((phase) => {
            setInfos(phase);
        });
    }

    /**
     * Récupération de la liste des denrées de la phase
     */
    const getDenreesList = () => {
        getDenreesByPhase(Number(id_phase)).then((list) => {
            list.forEach((denree) => {
                denrees.push(denree);
                setDenrees(denrees.slice(0));
            });
        });
    };

    /**
     * Suppression de la phase
     * @returns 
     */
    const deleteThisPhase = () => {
        var r = window.confirm("La suppression de cette fiche produit affectera toutes les étapes et fiches techniques dans lesquelles vous avez utilisé cet ingrédient. Êtes-vous sûr de vouloir malgré tout supprimer cet ingrédient définitivement du mercurial ?");
        if (r) {
            deletePhase(Number(id_phase)).then((result) => {
                history.push(`/phases`);
            });
        } else {
            return;
        }
    };

    useEffect(() => {
        getInfosPhase();
        getDenreesList();
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <>
            <Helmet>
                <title>{'➕ Créer une phase'}</title>
            </Helmet>
            {
                loading ? (
                    <div className={styles.container}>
                        <SidebarMenu 
                            width={320} 
                            height={'530px'} 
                            to={
                                [
                                    {to: '/phases/create', name: 'Créer une phase'},
                                    {to: '/phases', name: 'Liste des phases'},
                                    {to: '/mercurial', name: 'Voir le mercurial'},
                                    {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                                    {to: '/fiches techniques/create', name: 'Créer une fiche technique'},
                                    {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                                    {to: '/stocks', name: 'Gérer les stocks'}
                                ]
                            }
                        />
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/phases`}>
                                Voir toutes les phases
                            </Link>
                        </div>
                        <div className={styles.subContainer}>
                            <div className={styles.gridContainer}>
                                <div>
                                    <h3>Description de la phase : {infos?.id_phase}</h3>
                                    <p><b>Intitulé : </b>{infos?.libelle_phase}</p>
                                    <p><b>Description : </b>{infos?.description_phase}</p>
                                    <p><b>Durée : </b>{infos?.duree_phase} minutes</p>
                                </div>
                                <div>
                                    <h3>Liste des denrées de la phase</h3>
                                    <div className={styles.list}>
                                        {denrees.map((denree) => (
                                            <p key={denree.id_phase_ingredient}>{denree.libelle}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.gridButton}>
                                    <button 
                                        className={styles.button}
                                        onClick={() => goTo()}
                                    >
                                        Modifier la phase
                                    </button>
                                    <button 
                                        className={styles.buttonDelete}
                                        onClick={() => deleteThisPhase()}
                                    >
                                        Supprimer la phase
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
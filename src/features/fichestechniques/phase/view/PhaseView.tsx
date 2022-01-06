import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deletePhase, getPhaseDetail } from '../../../../api/phase.api';
import { Loading } from '../../../../components/loading/Loading';
import { SidebarMenu } from '../../../../layout/sidebar-menu/SidebarMenu';
import { Phase_Detail } from '../../../../models/Phase.model';
import styles from './PhaseView.module.css';

export function PhaseView(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [phase, setPhase] = useState<Phase_Detail>();
    const { id_phase } = useParams<{ id_phase: string }>();
    const history = useHistory();

    const goTo = () => {
        const url = `/phases/modify/${id_phase}`;
        history.push(url);
    };

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
        getPhaseDetail(Number(id_phase)).then((result) => {
            setPhase(result);
        })
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
                                    <h3>Description de la phase : {phase?.id_phase}</h3>
                                    <p><b>Intitulé : </b>{phase?.libelle_phase}</p>
                                    <p><b>Description : </b>{phase?.description_phase}</p>
                                    <p><b>Durée : </b>{phase?.duree_phase} minutes</p>
                                </div>
                                <div>
                                    <h3>Liste des denrées de la phase</h3>
                                    <div className={styles.list}>
                                        {phase?.ingredients.map((denree) => (
                                            <p key={denree.code}>{denree.libelle}</p>
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
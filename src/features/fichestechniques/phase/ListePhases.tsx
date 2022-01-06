import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { getPhases } from '../../../api/phase.api';
import { Loading } from '../../../components/loading/Loading';
import { Phase_Simple_Interface } from '../../../interfaces/Phase.interface';
import { SidebarMenu } from '../../../layout/sidebar-menu/SidebarMenu';
import styles from './ListePhases.module.css';

export function ListePhasesPage(): JSX.Element {
    //liste des phases
    const [phases, setPhases] = useState<Phase_Simple_Interface[]>([]);
    //research
    const [research, setResearch] = useState<Phase_Simple_Interface[]>([]);
    //loading
    const [loading, setLoading] = useState<boolean>(false);
    //mot de recherche
    const [word, setWord] = useState<string>('');

    /**
     * Rechercher des phases en fonction de "word"
     */
    const searchPhases = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = phases.filter(phase => phase.libelle_phase.toLowerCase().match(regex));
        setResearch(searchResult);
    }

    useEffect(() => {
        getPhases().then((list) => {
            setPhases(list);
            setResearch(list);
        });
        setTimeout(
            () => setLoading(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Helmet>
                <title>{'📋 Liste des phases 📋'}</title>
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
                        <div className={styles.searchContainer}>
                            <div className={styles.searchBar}>
                                <input
                                    placeholder="Rechercher une phase par son libellé..."
                                    className={styles.search}
                                    type='text'
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setWord(ev.target.value)}
                                    value={word}
                                ></input>
                                <button 
                                    className={styles.button2}
                                    onClick={
                                        () => {
                                            searchPhases();
                                        }
                                    }
                                >
                                    <FcSearch className={styles.buttonSearch} /> Rechercher une phase
                                </button>
                            </div>
                        </div>
                        <div className={styles.phaseContainer}>
                            {research.length > 0 ? 
                                (<table className={styles.fichePresentation}>
                                    <thead>
                                        <tr>
                                            <th className={styles.th}>Identifiant</th>
                                            <th className={styles.th}>Libellé</th>
                                            <th className={styles.th}>Description</th>
                                            <th className={styles.th}>Durée</th>
                                            <th className={styles.th}>Aperçu de la phase</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            research.map((phase: Phase_Simple_Interface) => (
                                                <tr key={phase.id_phase}>
                                                    <td className={styles.td}>{phase.id_phase}</td>
                                                    <td className={styles.alignLeft}>{phase.libelle_phase}</td>
                                                    <td className={styles.alignLeft}>{phase.description_phase}</td>
                                                    <td className={styles.td}>{phase.duree_phase}'</td>
                                                    <td className={styles.td}>
                                                        <Link className={styles.button} to={`/phases/view/${phase.id_phase}`}>
                                                            <FcSearch className={styles.iconeSearch}/>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>) : <p>Il n'existe actuellement aucune phase.</p>
                            }
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
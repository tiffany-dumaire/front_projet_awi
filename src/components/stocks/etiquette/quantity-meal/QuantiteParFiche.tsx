import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Etiquette_Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import styles from './QuantiteParFiche.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type QuantiteParFicheProps = {
    fiches: Etiquette_Fiche_Technique_Interface[];
    etiquettes: Etiquette[];
    add: (etiquette: Etiquette_Fiche_Technique_Interface) => void;
    remove: (all: boolean, etiquette: Etiquette_Fiche_Technique_Interface) => void;
    next: () => void;
};

export const QuantiteParFiche: React.FunctionComponent<QuantiteParFicheProps> = (props: QuantiteParFicheProps) => {
    //recherche
    const [fiches, setFiches] = useState<Etiquette_Fiche_Technique_Interface[]>(props.fiches);
    const [word, setWord] = useState<string>('');
    
    /**
     * Rechercher des phases en fonction de "word"
     */
     const searchPhases = () => {
        const regex = new RegExp(word.toLowerCase());
        const searchResult = props.fiches.filter(fiche => fiche.libelle_fiche_technique.toLowerCase().match(regex));
        setFiches(searchResult);
    }

    return (
        <div className={styles.debutContainer}>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Liste des fiches</label>
                </div> 
                <div>
                    <label className={styles.label}>Fiches sélectionnés</label>
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.gridContainer3}>
                    <input
                        placeholder="Rechercher une fiche..."
                        className={styles.input}
                        type='text'
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setWord(ev.target.value)}
                        value={word}
                    ></input>
                    <button className={styles.button} onClick={() => searchPhases()}>
                        🔎
                    </button>
                </div>
                <div></div>
            </div>
            <div className={styles.gridContainer2}>
                <div className={styles.list}>
                    {fiches.length === 0 ? 
                        `Il n'existe pas de fiche correspondant à la recherche.` : 
                        fiches.map((fiche) => (
                            <div className={styles.click} key={'f' + fiche.id_fiche_technique}>
                                <div>
                                    <Link className={styles.link} to={`/fiches techniques/details/${fiche.id_fiche_technique}`} target={'_blank'}>🔎</Link>
                                </div>
                                <div onClick={() => {
                                    props.add(fiche);
                                }}>
                                    <span className={styles.add}>+</span> {fiche.libelle_fiche_technique}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.list}>
                    {props.etiquettes.map((etiquette) => (
                        <div className={styles.click} key={'a' + etiquette.etiquette.id_fiche_technique}> 
                            {etiquette.quantity} - {etiquette.etiquette.libelle_fiche_technique} <span onClick={() => props.remove(false, etiquette.etiquette)}>➖</span><span onClick={() => props.remove(true, etiquette.etiquette)}>❌</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.gridContainer}>
                <div></div>
                <div>
                    <button className={styles.buttonNext} onClick={
                            () => {
                                var r = window.confirm("Si vous continuez cela mettra fin à la commande. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.next();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Paramétrer les étiquettes
                    </button>
                </div>
            </div>
        </div>
    );
}
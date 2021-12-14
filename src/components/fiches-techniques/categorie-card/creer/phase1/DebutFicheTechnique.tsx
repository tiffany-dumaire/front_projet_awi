import React, { useState } from 'react';
import { Categorie_Fiches_Interface } from '../../../../../interfaces/Categorie_Fiches.interface';
import { Responsable_Interface } from '../../../../../interfaces/Responsable.interface';
import styles from './DebutFicheTechnique.module.css';

export type DebutFicheTechniqueProps = {
    id_fiche_technique?: number;
    categories: Categorie_Fiches_Interface[];
    responsables: Responsable_Interface[];
    createFiche: (intitule: string, couverts: number, id_responsable: number, id_categorie: number) => void;
};

export const DebutFicheTechnique: React.FunctionComponent<DebutFicheTechniqueProps> = (props: DebutFicheTechniqueProps) => {
    const [intitule, setIntitule] = useState<string>('');
    const [couverts, setCouverts] = useState<number>(0);
    const [id_responsable, setIdResponsable] = useState<number>(0);
    const [id_categorie, setIdCategorie] = useState<number>(0);

    const tronquer = (x: number) => {
        return x.toFixed(0);
    }

    return (
        <div className={styles.debutContainer}>
            {/* Faire un affichage grid puis flex column pour mobile*/}
            <h3>Créer une nouvelle fiche technique</h3>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Intitulé de la fiche technique</label>
                </div>
                <div>
                    <label className={styles.label}>Quel sera le nombre de couverts ?</label>
                </div>
                <div>
                    <label className={styles.label}>Désigner le responsable de la fiche</label>
                </div>
                <div>
                    <label className={styles.label}>Catégorie de la fiche</label>
                </div>
                <div></div>
                <div>
                    <input className={styles.input} type="text" placeholder={'Saisir l\'intitulé de la nouvelle fiche technique...'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setIntitule(ev.target.value)}></input>
                </div>
                <div>
                    <input className={styles.input} type="number" step={1} placeholder={'Saisir le nombre de couverts..'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCouverts(Number(ev.target.value))}></input>
                </div>
                <div>
                    <select
                        className={styles.input}
                        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                            setIdResponsable(Number(ev.target.value))
                        }
                    >
                        <option 
                            className={styles.options} 
                            value={0}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setIdResponsable(Number(ev.target.value))
                        }>Aucun</option>
                        {props.responsables.map((responsable) =>
                                <option 
                                    key={responsable.intitule_responsable}
                                    className={styles.options} 
                                    value={responsable.id_responsable}
                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setIdResponsable(Number(ev.target.value))
                                }>{responsable.intitule_responsable}</option>
                        )}
                    </select>
                </div>
                <div>
                    <select
                        className={styles.input}
                        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                            setIdCategorie(Number(ev.target.value))
                        }
                    >
                        <option 
                            className={styles.options} 
                            value={0}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setIdCategorie(Number(ev.target.value))
                        }>Aucune</option>
                        {props.categories.map((categorie) =>
                                <option 
                                    key={categorie.categorie_fiche}
                                    className={styles.options} 
                                    value={categorie.id_categorie_fiche}
                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setIdCategorie(Number(ev.target.value))
                                }>{categorie.categorie_fiche}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button 
                        className={styles.buttonNext} 
                        onClick={
                            () => {
                                if (intitule === '') {
                                    alert('Vous n\'avez pas défini l\'intitulé de la fiche technique.');
                                    return;
                                }
                                if (Number(tronquer(couverts)) === 0) {
                                    alert('Vous n\'avez pas défini un nombre de couverts valide.');
                                    return;
                                }
                                if (id_categorie === 0) {
                                    alert('Vous n\'avez pas défini la catégorie de la fiche.');
                                    return;
                                }
                                if (id_responsable === 0) {
                                    alert('Vous n\'avez pas défini de responsable pour cette fiche.');
                                    return;
                                }
                                props.createFiche(intitule, couverts, id_responsable, id_categorie);
                            }
                        }
                    >   
                        Passer à l'étape suivante
                    </button>
                </div>
            </div>
        </div>
    );
};

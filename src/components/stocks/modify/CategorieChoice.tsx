import React from 'react';
import { Categorie_Interface } from '../../../interfaces/Categorie.interface';
import styles from './ModifyStock.module.css';

export type CategorieChoiceProps = {
    categories: Categorie_Interface[];
    id_categorie: number;
    setStep: () => void;
    setCategorie: (id_categorie: number) => void;
};

export const CategorieChoice: React.FunctionComponent<CategorieChoiceProps> = (props: CategorieChoiceProps) => {
    return (
        <div className={styles.stockContainer2}>
            <div className={styles.choice}>
                <label>Choisissez la catégorie pour laquelle vous souhaitez traiter les entrées de stock :</label>
                <select
                    className={styles.input}
                    onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                        props.setCategorie(Number(ev.target.value))
                    }
                >
                    <option 
                        key={0}
                        className={styles.options} 
                        value={0}
                        onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => props.setCategorie(Number(ev.target.value))}
                    >
                        {'Aucune'}
                    </option>
                    {props.categories.map((categorie) =>
                        <option 
                            key={categorie.categorie}
                            className={styles.options} 
                            value={categorie.id_categorie}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => props.setCategorie(Number(ev.target.value))
                        }>
                            {categorie.categorie}
                        </option>
                    )}
                </select>
                <button 
                    className={styles.next}
                    disabled={props.id_categorie === 0 ? true : false}
                    onClick={
                        () => {
                            props.setStep();
                        }
                    } 
                >
                    Modifier les stocks
                </button>
            </div>
        </div>
    );
};

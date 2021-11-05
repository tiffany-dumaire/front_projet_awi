import React, { useEffect, useState } from 'react';
import { getCategoriesAllergenes } from '../../../../api/categorie.api';
import { Categorie_Allergenes_Interface } from '../../../../interfaces/Categorie_Allergenes.interface';
import styles from './InitNewIngredient.module.css';

export const InitNewIngredient: React.FunctionComponent = function () {
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [unite, setUnite] = useState<string>('kg');
    const [allergene, setAllergene] = useState<boolean>(false);
    const [categorie_allergene, setCategorieAllergene] = useState<number | undefined>(undefined);
    const [categories, setCategories] = useState<Categorie_Allergenes_Interface[]>([]);

    useEffect(() => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((categorie) => {
                categories.push(categorie);
                setCategories(categories.slice(0));
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    /* async function createIngredient(
        id_ingredient: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        id_categorie_allergene: number | undefined
    ) {
        //await putIngredient(id_ingredient,libelle,unite,prix_unitaire,stock,allergene,id_categorie,id_categorie_allergene).then((result) => {
        //    props.setOnEdit(false);
        //    props.setEdited(true);
        //});
    }; */

    return (
        <div className={styles.detailContainer}>
            <h2>{'Créer un nouvel ingrédient'}</h2>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Code produit</label>
                </div>
                <div>
                    <label className={styles.label}>Prix unitaire (en €)</label>
                </div>
                <div>
                    <label className={styles.label}>Stock</label>
                </div>
                <div>
                    <label className={styles.label}>Unité</label>
                </div>
                <div>
                    <label className={styles.label}>Allergène</label>
                </div>
                <div>
                    <label className={styles.label}>Catégorie d'allergènes</label>
                </div>
                <div>
                    <button className={styles.buttonSave} onClick={
                        () => {
                            
                        }
                    }>
                        Sauvegarder la fiche produit
                    </button>
                </div>
                <div>
                    <input className={styles.input} type="text"></input>
                </div>
                <div>
                    <input className={styles.input2} type="number" value={price} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(ev.target.value))}></input>
                </div>
                <div>
                    <input className={styles.input2} type="number" value={stock} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setStock(Number(ev.target.value))}></input>
                </div>
                <div>
                    <input className={styles.input} type="text" value={unite} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setUnite(ev.target.value)}></input>
                </div>
                <div>
                    <div className={styles.switchContainer}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={allergene} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setAllergene(Boolean(ev.target.checked))}/>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>
                </div>
                <div>
                    <select
                        value={categorie_allergene}
                        className={styles.input}
                        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                            setCategorieAllergene(Number(ev.target.value))
                        }
                    >
                        <option 
                            className={styles.options} 
                            value={undefined}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                        }>Aucune</option>
                        {categories.map((categorie) =>
                                <option 
                                    className={styles.options} 
                                    value={categorie.id_categorie_allergene}
                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                }>{categorie.categorie_allergene}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className={styles.buttonCancel}>Annuler la création</button>
                </div>
            </div>
        </div>
    );
};

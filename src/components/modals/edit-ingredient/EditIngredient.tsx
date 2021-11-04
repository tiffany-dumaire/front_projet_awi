import React, { useEffect, useState } from 'react';
import styles from './EditIngredient.module.css';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { putIngredient } from '../../../api/ingredient.api';
import { Categorie_Allergenes_Interface } from '../../../interfaces/Categorie_Allergenes.interface';
import { getCategoriesAllergenes } from '../../../api/categorie.api';

export type EditIngredientProps = {
    ingredient: Ingredient_Interface;
    setEdited: (value: boolean) => void;
    setOnEdit: (value: boolean) => void;
};

export const EditIngredient: React.FunctionComponent<EditIngredientProps> = function (props: EditIngredientProps) {
    const [price, setPrice] = useState<number>(props.ingredient.prix_unitaire);
    const [stock, setStock] = useState<number>(props.ingredient.stock);
    const [unite, setUnite] = useState<string>(props.ingredient.unite);
    const [allergene, setAllergene] = useState<boolean>(props.ingredient.allergene);
    const [categorie_allergene, setCategorieAllergene] = useState<number | undefined>(props.ingredient.id_categorie_allergene);
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

    async function modifyIngredient(
        id_ingredient: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        id_categorie_allergene: number | undefined
    ) {
        await putIngredient(id_ingredient,libelle,unite,prix_unitaire,stock,allergene,id_categorie,id_categorie_allergene).then((result) => {
            props.setOnEdit(false);
            props.setEdited(true);
        });
    };

    return (
        <div className={styles.detailContainer}>
            <h2>{props.ingredient.libelle}</h2>
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
                            modifyIngredient(props.ingredient.code,props.ingredient.libelle,unite,price,stock,allergene,props.ingredient.id_categorie,categorie_allergene);
                        }
                    }>
                        Sauvegarder la fiche produit
                    </button>
                </div>
                <div>
                    <input className={styles.input} type="text" disabled value={props.ingredient.code}></input>
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
                    <button className={styles.buttonCancel} onClick={() => props.setOnEdit(false)}>Annuler la modification</button>
                </div>
            </div>
        </div>
    );
};

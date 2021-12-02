import React, { useEffect, useState } from 'react';
import styles from './EditIngredient.module.css';
import { Ingredient_Interface } from '../../../../interfaces/Ingredient.interface';
import { putIngredient } from '../../../../api/ingredient.api';
import { Categorie_Allergenes_Interface } from '../../../../interfaces/Categorie_Allergenes.interface';
import { getCategories, getCategoriesAllergenes } from '../../../../api/categorie.api';
import { Categorie_Interface } from '../../../../interfaces/Categorie.interface';

export type EditIngredientProps = {
    ingredient: Ingredient_Interface;
    setEdited: (value: boolean) => void;
    setOnEdit: (value: boolean) => void;
};

export const EditIngredient: React.FunctionComponent<EditIngredientProps> = function (props: EditIngredientProps) {
    const [libelle, setLibelle] = useState<string>(props.ingredient.libelle);
    const [unite, setUnite] = useState<string>(props.ingredient.unite);
    const [price, setPrice] = useState<number>(props.ingredient.prix_unitaire);
    const [stock, setStock] = useState<number>(props.ingredient.stock);
    const [allergene, setAllergene] = useState<boolean>(props.ingredient.allergene);
    const [categorie, setCategorie] = useState<number | null>(props.ingredient.id_categorie);
    const [categorie_allergene, setCategorieAllergene] = useState<number | null>(props.ingredient.id_categorie_allergene);
    const [categories, setCategories] = useState<Categorie_Interface[]>([]);
    const [categoriesAllergene, setCategoriesAllergene] = useState<Categorie_Allergenes_Interface[]>([]);

    useEffect(() => {
        getCategoriesAllergenes().then((list) => {
            list.forEach((c) => {
                categoriesAllergene.push(c);
                setCategoriesAllergene(categoriesAllergene.slice(0));
            });
        });
        getCategories().then((list) => {
            list.forEach((c2) => {
                categories.push(c2);
                setCategories(categories.slice(0));
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const modifyIngredient = (
        id_ingredient: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        id_categorie_allergene: number | null
    ) => {
        putIngredient(id_ingredient, libelle, unite, prix_unitaire, stock, allergene, id_categorie, id_categorie_allergene);
        props.setEdited(true);
        props.setOnEdit(false);
    };

    return (
        <div className={styles.detailContainer}>
            <h2>{props.ingredient.libelle}</h2>
            <div className={styles.gridContainer}>
                <div>
                    <label className={styles.label}>Code produit</label>
                </div>
                <div>
                    <label className={styles.label}>Libellé du produit</label>
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
                    <label className={styles.label}>Catégorie</label>
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
                            if (libelle === '') {
                                alert('Vous n\'avez pas défini de libellé pour cet ingrédient.');
                                return;
                            }
                            if (price === 0) {
                                alert('Vous n\'avez pas défini de prix pour cet ingrédient.');
                                return;
                            } 
                            if (stock === 0) {
                                alert('Vous n\'avez pas défini le stock initial pour cet ingrédient.');
                                return;
                            }
                            if (unite === '') {
                                alert('Vous n\'avez pas défini d\'unité de mesure pour cet ingrédient.');
                                return;
                            }
                            if (categorie === 0 || categorie === null) {
                                alert('Vous n\'avez pas défini la catégorie de cet ingrédient.');
                                return;
                            } 
                            if (allergene) {
                                if (categorie_allergene === 0 || categorie_allergene === null) {
                                    alert('Vous n\'avez pas défini la catégorie d\'allergène de cet ingrédient.');
                                    return;
                                }
                                modifyIngredient(props.ingredient.code,libelle,unite,price,stock,allergene,categorie,categorie_allergene);
                            } else {
                                modifyIngredient(props.ingredient.code,libelle,unite,price,stock,allergene,categorie,null);
                            }
                        }
                    }>
                        Sauvegarder la fiche produit
                    </button>
                </div>
                <div>
                    <input className={styles.input2} value={props.ingredient.code} type="number" disabled></input>
                </div>
                <div>
                    <input placeholder={'Saisissez un libellé..'} className={styles.input} value={libelle} type="text" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibelle(ev.target.value)}></input>
                </div>
                <div>
                    <input className={styles.input2} value={price} type="number" step=".01" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(ev.target.value))}></input>
                </div>
                <div>
                    <input className={styles.input2} value={stock} type="number" step=".001" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setStock(Number(ev.target.value))}></input>
                </div>
                <div>
                <select
                        value={unite}
                        className={styles.input}
                        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                            setUnite(ev.target.value)
                        }
                    >
                        <option 
                            className={styles.options} 
                            value={''}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                        }>Aucune</option>
                        <option 
                            className={styles.options} 
                            value={'kg'}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                            }>
                                Kilogramme
                        </option>
                        <option 
                            className={styles.options} 
                            value={'L'}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                            }>
                                Litre
                        </option>
                        <option 
                            className={styles.options} 
                            value={'Piece'}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                            }>
                                Pièce
                        </option>
                        <option 
                            className={styles.options} 
                            value={'Unite'}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                            }>
                                Unité
                        </option>
                        <option 
                            className={styles.options} 
                            value={'Botte'}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                            }>
                                Botte
                        </option>
                    </select>
                </div>
                <div>
                    <select
                        value={categorie === null ? 0 : categorie}
                        className={styles.input}
                        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                            setCategorie(Number(ev.target.value))
                        }
                    >
                        <option 
                            className={styles.options} 
                            value={0}
                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorie(Number(ev.target.value))
                        }>Aucune</option>
                        {categories.map((categorie) =>
                                <option 
                                    key={categorie.categorie}
                                    className={styles.options} 
                                    value={categorie.id_categorie}
                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorie(Number(ev.target.value))
                                }>{categorie.categorie}</option>
                        )}
                    </select>
                </div>
                <div>
                    <div className={styles.switchContainer}>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={allergene} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setAllergene(Boolean(ev.target.checked))}/>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>
                </div>
                { allergene ? (
                    <div>
                        <select
                            value={categorie_allergene === null ? 0 : categorie_allergene}
                            className={styles.input}
                            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                setCategorieAllergene(Number(ev.target.value))
                            }
                        >
                            <option 
                                className={styles.options} 
                                value={0}
                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                            }>Aucune</option>
                            {categoriesAllergene.map((categorie) =>
                                    <option 
                                        key={categorie.categorie_allergene}
                                        className={styles.options} 
                                        value={categorie.id_categorie_allergene}
                                        onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                    }>{categorie.categorie_allergene}</option>
                            )}
                        </select>
                    </div>
                ) : (
                    <div>
                        <select
                            value={0}
                            className={styles.input}
                            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                setCategorieAllergene(Number(ev.target.value))
                            }
                            disabled
                        >
                            <option 
                                className={styles.options} 
                                value={0}
                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                            }>Aucune</option>
                            {categoriesAllergene.map((categorie) =>
                                    <option 
                                        key={categorie.categorie_allergene}
                                        className={styles.options} 
                                        value={categorie.id_categorie_allergene}
                                        onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                    }>{categorie.categorie_allergene}</option>
                            )}
                        </select>
                    </div>
                )}
                <div>
                    <button className={styles.buttonCancel} onClick={() => props.setOnEdit(false)}>Annuler la modification</button>
                </div>
            </div>
        </div>
    );
};

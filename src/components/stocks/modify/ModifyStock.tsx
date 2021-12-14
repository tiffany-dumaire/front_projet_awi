import React, { useState } from 'react';
import { modifyStock } from '../../../api/ingredient.api';
import { Stock_Interface } from '../../../interfaces/Ingredient.interface';
import { Stock } from '../../../models/Ingredient.model';
import styles from './ModifyStock.module.css';

export type ModifyStockProps = {
    ingredients: Stock_Interface[];
};

export const ModifyStock: React.FunctionComponent<ModifyStockProps> = (props: ModifyStockProps) => {
    const [ingredients, setIngredients] = useState<Stock_Interface[]>(props.ingredients);

    const modifyStockIngredient = (code: number, libelle: string, unite: string, stock: number) => {
        const codeToSearch = (element) => element.code === code;
        const index = ingredients.findIndex(codeToSearch);
        ingredients.splice(index, 1, new Stock(code, libelle, unite, stock));
        setIngredients(ingredients.slice(0));
    }

    const modifyAll = () => {
        ingredients.forEach((ingredient) => {
            modifyStock(ingredient.code, ingredient.stock);
        });
    }

    return (
        <div className={styles.stockContainer}>
            {ingredients.length > 0 ? 
                (<table className={styles.mercurial}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Code</th>
                            <th className={styles.th}>Libellé</th>
                            <th className={styles.th}>Unité</th>
                            <th className={styles.th}>Quantité en stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            ingredients.map((ingredient: Stock_Interface) => (
                                <tr key={ingredient.code}>
                                    <td className={styles.td}>{ingredient.code}</td>
                                    <td className={styles.alignLeft}>{ingredient.libelle}</td>
                                    <td className={styles.td}>{ingredient.unite}</td>
                                    <td className={styles.alignRight}>
                                        <input className={styles.input} value={ingredient.stock} type="number" placeholder={'Nouveau stock..'} step={ingredient.unite === 'Piece' || ingredient.unite === 'Unite' ? 1 : 0.001} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => modifyStockIngredient(ingredient.code, ingredient.libelle, ingredient.unite, Number(ev.target.value))}></input>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>) : null
            }
            <button 
                className={styles.modifyStock}
                onClick={
                    () => {
                        modifyAll();
                    }
                } 
            >
                Modifier les stocks
            </button>
        </div>
    );
};

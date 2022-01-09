//import jsPDF from "jspdf";
import React, { useRef } from "react";
import { Categorie_Interface } from "../../../interfaces/Categorie.interface";
import { Categorie_Allergenes_Interface } from "../../../interfaces/Categorie_Allergenes.interface";
import { Ingredient_Interface } from "../../../interfaces/Ingredient.interface";
import styles from './IngredientDetail.module.css';
import { useReactToPrint } from 'react-to-print';

export type IngredientDetailProps = {
    ingredient: Ingredient_Interface;
    categorie: Categorie_Interface | undefined;
    categorie_allergene: Categorie_Allergenes_Interface | undefined;
    setOnEdit: (value: boolean) => void;
    deleteI: () => void;
};

export const IngredientDetail: React.FunctionComponent<IngredientDetailProps> = (props: IngredientDetailProps) => {
    const componentRef = useRef(null);

    /**
     * Impression du pdf du détail ingrédient
     */
    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    return(
        <div className={styles.detailContainer}>
            <div className={styles.subDetailContainer} ref={componentRef}>
                <h2>{props.ingredient.libelle}</h2>
                <div className={styles.gridContainer}>
                    <div>
                        <label className={styles.label}>Code produit</label>
                    </div>
                    <div>
                        <label className={styles.label}>Prix unitaire</label>
                    </div>
                    <div>
                        <label className={styles.label}>Stock</label>
                    </div>
                    <div>
                        <label className={styles.label}>Allergène</label>
                    </div>
                    <div>
                        <label className={styles.label}>Catégorie</label>
                    </div>
                    <div>
                        <label className={styles.label}>Catégorie d'allergènes</label>
                    </div>
                    <div>
                        <input className={styles.input} type="text" disabled value={props.ingredient.code}></input>
                    </div>
                    <div>
                        <input className={styles.input} type="text" disabled value={props.ingredient.prix_unitaire + ' €'}></input>
                    </div>
                    <div>
                        <input className={styles.input} type="text" disabled value={props.ingredient.stock + ' ' + props.ingredient.unite}></input>
                    </div>
                    <div>
                        <div className={styles.switchContainer}>
                            <label className={styles.switch}>
                                <input type="checkbox" disabled checked={props.ingredient.allergene}/>
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <input className={styles.input} type="text" disabled value={props.categorie?.categorie}></input>
                    </div>
                    <div>
                        <input className={styles.input} type="text" disabled value={props.ingredient.id_categorie_allergene === null ? 'Aucune' : props.categorie_allergene ? props.categorie_allergene.categorie_allergene : 'Aucune'}></input>
                    </div>
                </div>
                {/* <RecapitulatifIngredient ingredient={props.ingredient} /> */}
            </div>
            <div className={styles.gridButtonContainer}>
                <div>
                    <button className={styles.buttonEdit} onClick={() => props.setOnEdit(true)}>Editer la fiche produit</button>
                </div>
                <div>
                    <button className={styles.buttonPrint} onClick={() => getPDF()}>Imprimer la fiche produit</button>
                </div>
                <div>
                    <button className={styles.buttonDelete} onClick={() => props.deleteI()}>Supprimer la fiche produit</button>
                </div>
            </div>
        </div>
    );
};

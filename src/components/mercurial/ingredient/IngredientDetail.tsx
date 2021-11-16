//import jsPDF from "jspdf";
import React from "react";
import { Ingredient_Interface } from "../../../interfaces/Ingredient.interface";
import { RecapitulatifIngredient } from "../../pdf/ingredient/RecapitulatifIngredient";
import styles from './IngredientDetail.module.css';

export type IngredientDetailProps = {
    ingredient: Ingredient_Interface;
    categorie_allergene: string;
    setOnEdit: (value: boolean) => void;
};

export const IngredientDetail: React.FunctionComponent<IngredientDetailProps> = (props: IngredientDetailProps) => {

    function getPDF() {
        /* var doc = new jsPDF('portrait','px',[490,560]);
        var pdfjs = document.getElementById('divToPrint');
        doc.html(pdfjs!, {
            callback: function(doc) {
                doc.save(`${props.ingredient.libelle}.pdf`)
            },
            x:1,
            y:1
        }); */
    } 

    return(
        <div className={styles.detailContainer} id="divToPrint">
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
                    <label className={styles.label}>Catégorie d'allergènes</label>
                </div>
                <div>
                    <button className={styles.buttonEdit} onClick={() => props.setOnEdit(true)}>Editer la fiche produit</button>
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
                    <input className={styles.input} type="text" disabled value={props.categorie_allergene}></input>
                </div>
                <div>
                    <button className={styles.buttonPrint} onClick={() => getPDF()}>Imprimer la fiche produit</button>
                </div>
            </div>
            <RecapitulatifIngredient ingredient={props.ingredient} />
        </div>
    );
};

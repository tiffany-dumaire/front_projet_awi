import React from "react";
import { Etiquette_Fiche_Technique_Interface } from "../../../../../interfaces/Fiche_Technique.interface";
import styles from './VenteAEmporter.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type QuantiteStock = {
    code: number;
    libelle: string;
    quantity: number;
    stock: number;
}

export type VenteAEmporterProps = {
    etiquettes: Etiquette[];
    vente: boolean;
    quantityStock: QuantiteStock[];
};

export const VenteAEmporter: React.FunctionComponent<VenteAEmporterProps> = (props: VenteAEmporterProps) => {    

    /**
     * Vérification si les ingrédients ont tous suffisamment de stock ou non
     * @param code 
     * @returns 
     */
    const stockVenteOk = (code: number): boolean=> {
        const searchIndex = (element) => element.code === code;
        const index = props.quantityStock.findIndex(searchIndex);
        if (index === -1){
            return false;
        } else {
            return props.quantityStock[index].quantity < props.quantityStock[index].stock;
        }
    }

    return (
        <div className={styles.container}>
            <label className={styles.label2}>Etiquette {props.vente ? 'de vente' : 'test'} - à emporter</label>
            {props.etiquettes.map((etiquette) => (
                <div key={etiquette.etiquette.id_fiche_technique}>
                    <ul> 
                        <li>{etiquette.quantity} x {etiquette.etiquette.libelle_fiche_technique} ({etiquette.etiquette.nombre_couverts} couverts)</li>
                        <ul>
                            {etiquette.etiquette.ingredients.map((ingredient) => (
                                <li key={etiquette.etiquette.id_fiche_technique + '_' + ingredient.code}>
                                    {ingredient.allergene ?
                                        <span className={props.vente ? stockVenteOk(ingredient.code) ? styles.label : styles.label3 : styles.label}>{ingredient.libelle}</span>
                                    :
                                        <span className={props.vente ? stockVenteOk(ingredient.code) ? '' : styles.label4 : ''}>{ingredient.libelle}</span>
                                    }
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            ))}
        </div>
    );
}
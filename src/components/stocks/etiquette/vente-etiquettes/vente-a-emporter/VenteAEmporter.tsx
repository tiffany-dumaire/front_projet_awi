import React, { useEffect, useState } from "react";
import { Etiquette_Fiche_Technique_Interface } from "../../../../../interfaces/Fiche_Technique.interface";
import styles from './VenteAEmporter.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type QuantiteStock = {
    code: number;
    quantity: number;
    stock: number;
}

export type VenteAEmporterProps = {
    etiquettes: Etiquette[];
    vente: boolean;
    etiquette: (stockOk: boolean) => void;
};

export const VenteAEmporter: React.FunctionComponent<VenteAEmporterProps> = (props: VenteAEmporterProps) => {
    const [quantityStock, setQuantityStock] = useState<QuantiteStock[]>([]);

    const stockVenteOk = (code: number): boolean=> {
        const searchIndex = (element) => element.code === code;
        const index = quantityStock.findIndex(searchIndex);
        if (index === -1){
            return false;
        } else {
            return quantityStock[index].quantity < quantityStock[index].stock;
        }
    }

    useEffect(() => {
        props.etiquettes.forEach((etiquette) => {
            const quantite = etiquette.quantity;
            etiquette.etiquette.ingredients.forEach((ingredient) => {
                const searchI = (element) => element.code === ingredient.code
                const index = quantityStock.findIndex(searchI);
                if (index === -1) {
                    quantityStock.push({"code": ingredient.code, "quantity": quantite * ingredient.quantite_ingredient, "stock": ingredient.stock});
                    setQuantityStock(quantityStock.slice(0));
                } else {
                    quantityStock[index].quantity = quantityStock[index].quantity + quantite * ingredient.quantite_ingredient;
                    setQuantityStock(quantityStock.slice(0));
                }
            }); 
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
import React from "react";
import { Etiquette_Fiche_Technique_Interface } from "../../../../../interfaces/Fiche_Technique.interface";
import styles from './VenteNormale.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type QuantiteStock = {
    code: number;
    quantity: number;
    stock: number;
}

export type VenteNormaleProps = {
    etiquettes: Etiquette[];
    vente: boolean;
};

export const VenteNormale: React.FunctionComponent<VenteNormaleProps> = (props: VenteNormaleProps) => {
    
    return (
        <div className={styles.container}>
            <label className={styles.label2}>Etiquette {props.vente ? 'de vente' : 'test'} - sur place</label>
            {props.etiquettes.map((etiquette) => (
                <div>
                    <ul> 
                        <li>{etiquette.quantity} x {etiquette.etiquette.libelle_fiche_technique} ({etiquette.etiquette.nombre_couverts} couverts)</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
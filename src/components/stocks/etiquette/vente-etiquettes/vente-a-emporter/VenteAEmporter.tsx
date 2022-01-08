import React from "react";
import { Etiquette_Fiche_Technique_Interface } from "../../../../../interfaces/Fiche_Technique.interface";
import styles from './VenteAEmporter.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type VenteAEmporterProps = {
    etiquettes: Etiquette[];
    vente: boolean;
};

export const VenteAEmporter: React.FunctionComponent<VenteAEmporterProps> = (props: VenteAEmporterProps) => {
    
    return (
        <div className={styles.container}>
            <label className={styles.label2}>Etiquette {props.vente ? 'de vente' : 'test'} - à emporter</label>
            {props.etiquettes.map((etiquette) => (
                <div key={etiquette.etiquette.id_fiche_technique}>
                    <ul> 
                        <li>{etiquette.quantity} x {etiquette.etiquette.libelle_fiche_technique}</li>
                        <ul>
                            {etiquette.etiquette.ingredients.map((ingredient) => (
                                <li key={etiquette.etiquette.id_fiche_technique + '_' + ingredient.code}>
                                    {ingredient.allergene ?
                                        <span className={styles.label}>{ingredient.libelle}</span>
                                    :
                                        ingredient.libelle
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
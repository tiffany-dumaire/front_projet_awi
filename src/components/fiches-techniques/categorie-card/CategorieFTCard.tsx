import React from 'react';
import styles from './CategorieFTCard.module.css';

export type CategorieFTCardProps = {
    id_categorie_fiche: number;
    categorie_fiche: string;
    color_fiche: string;
};

export const CategorieFTCard: React.FunctionComponent<CategorieFTCardProps> = (props: CategorieFTCardProps) => {
    const linkStyle = {backgroundColor: props.color_fiche}
    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h2>{props.id_categorie_fiche}</h2>
            <h3>{props.categorie_fiche}</h3>
        </div>
    );
};

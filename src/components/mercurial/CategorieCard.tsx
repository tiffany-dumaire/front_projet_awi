import React from 'react';
import styles from './CategorieCard.module.css';

export type CategorieCardProps = {
    id_categorie: number;
    categorie: string;
    color: string;
};

export const CategorieCard: React.FunctionComponent<CategorieCardProps> = (props: CategorieCardProps) => {
    const linkStyle = {backgroundColor: props.color}
    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h2>{props.id_categorie}</h2>
            <h3>{props.categorie}</h3>
        </div>
    );
}
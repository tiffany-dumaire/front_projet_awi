import React from 'react';
import styles from './CategorieCard.module.css';

export type CategorieAllergenesCardProps = {
    id_categorie_allergene: number;
    categorie_allergene: string;
    color_allergene: string;
};

export const CategorieAllergenesCard: React.FunctionComponent<CategorieAllergenesCardProps> = (props: CategorieAllergenesCardProps) => {
    const linkStyle = {backgroundColor: props.color_allergene}
    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h2>{props.id_categorie_allergene}</h2>
            <h3>{props.categorie_allergene}</h3>
        </div>
    );
};

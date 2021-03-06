import React from 'react';
import { FcSettings, FcNook } from "react-icons/fc";
import { useHistory } from 'react-router-dom';
import styles from './CategorieCard.module.css';

export type CategorieAllergenesCardProps = {
    id_categorie_allergene: number;
    categorie_allergene: string;
    color_allergene: string;
};

export const CategorieAllergenesCard: React.FunctionComponent<CategorieAllergenesCardProps> = (props: CategorieAllergenesCardProps) => {
    const linkStyle = {backgroundColor: props.color_allergene}
    const history = useHistory();

    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h4 className={styles.h3}>{props.id_categorie_allergene}</h4>
            <h3 className={styles.h3}>{props.categorie_allergene}</h3>
            {props.id_categorie_allergene !== 0 ? 
                <div>
                    <FcSettings className={styles.icone} onClick={() => history.push(`category/allergene/modify/${props.id_categorie_allergene}`)} />
                    <FcNook className={styles.icone} onClick={() => history.push(`/liste des allergenes/byCategorie/${props.id_categorie_allergene}`)} />
                </div>
            : 
                null
            }
        </div>
    );
};

import React from 'react';
import styles from './CategorieCard.module.css';
import { FcSettings, FcNook } from "react-icons/fc";
import { useHistory } from 'react-router-dom';

export type CategorieCardProps = {
    id_categorie: number;
    categorie: string;
    color: string;
};

export const CategorieCard: React.FunctionComponent<CategorieCardProps> = (props: CategorieCardProps) => {
    const linkStyle = {backgroundColor: props.color}
    const history = useHistory();

    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h4 className={styles.h3}>{props.id_categorie}</h4>
            <h3 className={styles.h3}>{props.categorie}</h3>
            {props.id_categorie !== 0 ? 
                <div>
                    <FcSettings className={styles.icone} onClick={() => history.push(`category/ingredient/modify/${props.id_categorie}`)} />
                    <FcNook className={styles.icone} onClick={() => history.push(`/mercurial/byCategorie/${props.id_categorie}`)} />
                </div>
            : 
                null
            }
        </div>
    );
}
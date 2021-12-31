import React from 'react';
import { FcNook, FcSettings } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';
import styles from './CategorieFTCard.module.css';

export type CategorieFTCardProps = {
    id_categorie_fiche: number;
    categorie_fiche: string;
    color_fiche: string;
};

export const CategorieFTCard: React.FunctionComponent<CategorieFTCardProps> = (props: CategorieFTCardProps) => {
    const linkStyle = {backgroundColor: props.color_fiche}
    const history = useHistory();

    return (
        <div 
            className={styles.categorieCard}
            style={linkStyle}
        >
            <h4 className={styles.h3}>{props.id_categorie_fiche}</h4>
            <h3 className={styles.h3}>{props.categorie_fiche}</h3>
            {props.id_categorie_fiche !== 0 ? 
                <div>
                    <FcSettings className={styles.icone} onClick={() => history.push(`category/fiche_technique/modify/${props.id_categorie_fiche}`)} />
                    <FcNook className={styles.icone} onClick={() => history.push(`/fiches techniques/byCategorie/${props.id_categorie_fiche}`)} />
                </div>
            : 
                null
            }
        </div>
    );
};

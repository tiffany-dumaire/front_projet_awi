import React from "react";
import styles from './LoadingFiche.module.css';
import loading from '../../../assets/img/loaderfiche.gif';

export const LoadingFiche: React.FunctionComponent = () => {
    return (
        <div className={styles.loadingContainer}>
            <img className={styles.loader} src={loading} alt={'Loading fiche'}/>  
        </div>
    );
}
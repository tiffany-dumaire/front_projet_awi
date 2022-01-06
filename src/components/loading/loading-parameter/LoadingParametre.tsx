import React from "react";
import styles from './LoadingParametre.module.css';
import loading from '../../../assets/img/parameterloader.gif';

export const LoadingParametre: React.FunctionComponent = () => {
    return (
        <div className={styles.loadingContainer}>
            <img className={styles.loader} src={loading} alt={'Loading parameter'}/>  
        </div>
    );
}
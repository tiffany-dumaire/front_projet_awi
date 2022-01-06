import React from "react";
import styles from './LoadingStock.module.css';
import loading from '../../../assets/img/stockloder.gif';

export const LoadingStock: React.FunctionComponent = () => {
    return (
        <div className={styles.loadingContainer}>
            <img className={styles.loader} src={loading} alt={'Loading parameter'}/>  
        </div>
    );
}
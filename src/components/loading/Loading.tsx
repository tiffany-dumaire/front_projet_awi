import React from "react"
import styles from './Loading.module.scss';


export const Loading: React.FunctionComponent = () => {
    return (
        <div className={styles.panLoader}>
            <div className={styles.loader}></div>
            <div className={styles.panContainer}>
                <div className={styles.pan}></div>
                <div className={styles.handle}></div>
            </div>
            <div className={styles.shadow}></div>
        </div>
    );
}

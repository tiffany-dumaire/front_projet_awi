import React from "react";
import { useHistory } from "react-router-dom";
import styles from './DashboardCard.module.css';

export type DashboardCardProps = {
    title: string;
    description: string;
    path: string;
    color: string;
}

export const DashboardCard: React.FunctionComponent<DashboardCardProps> = (props: DashboardCardProps) => {
    const history = useHistory();
    const linkStyle = {backgroundColor: props.color}

    /**
     * Redirection
     */
    const goTo = () => {
        const url = props.path;
        history.push(url);
    };
    
    return (
        <div 
            className={styles.dashboardCardContainer}
            style={linkStyle} 
            onClick={() => goTo()}
        >
            <h2 className={styles.title}>{props.title}</h2>
            <p className={styles.description}>{props.description}</p>
        </div>
    );
}
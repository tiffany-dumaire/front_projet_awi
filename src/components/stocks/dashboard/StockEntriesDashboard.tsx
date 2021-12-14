import React from "react";
import { DashboardCard } from "./DashboardCard";
import styles from './StockDashboard.module.css';

export const StockEntriesDashboard: React.FunctionComponent = () => {
    const functionnalities = [
        {   
            title: 'Réaliser une entrée de stock complète',
            description: 'Réaliser les entrées de stock pour l\'ensemble des ingrédients contenus dans le mercurial.',
            path: '/stocks/entrees/all',
            color: '#999966'
        },
        {   
            title: 'Réaliser une entrée de stock par catégorie',
            description: 'Choisissez une catégorie d\'ingrédients afin de pouvoir réaliser les entrées de stock pour cette catégorie.',
            path: '/stocks/entrees/byCategorie',
            color: '#cc99ff'
        },
        {   
            title: 'Réaliser une entrée de stock pour une liste d\'ingrédients',
            description: 'Choisissez des ingrédients dans le mercurial afin de pouvoir réaliser les entrées de stock pour une liste d\'ingrédients donnée.',
            path: '/stocks/entrees/byList',
            color: '#00cc99'
        }
    ];

    return (
        <div className={styles.container}>
            <h1>Gérer les entrées de stocks</h1>
            <div className={styles.subContainer}>
                {
                    functionnalities.map((functionnality) => (
                        <DashboardCard key={functionnality.title} title={functionnality.title} description={functionnality.description} path={functionnality.path} color={functionnality.color} />
                    ))
                }
            </div>
        </div>
    );
}
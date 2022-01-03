import React from "react";
import { DashboardCard } from "./DashboardCard";
import styles from './StockDashboard.module.css';

export const StocksDashboard: React.FunctionComponent = () => {
    const functionnalities = [
        {   
            title: 'Gestion des entrées de stock',
            description: 'Ici vous pourrez gérer les entrées de stock pour tous les ingrédients, par catégorie d\'ingrédients ou en choisissant des ingrédients spécifiques.',
            path: '/stocks/entrees',
            color: '#999966'
        },
        {   
            title: 'Editer une étiquette de vente',
            description: 'Editer les étiquettes de vente en choisissant soit des fiches techniques, soit les ingrédients. Les stocks seront modifiés.',
            path: '/stocks/ventes/sorties',
            color: '#cc99ff'
        },
        {   
            title: 'Editer une étiquette test',
            description: 'Editer des étiquettes de vente tests en choisissant soit des fiches techniques ou des ingrédients. Les stocks ne seront pas modifiés.',
            path: '/stocks/ventes/test',
            color: '#00cc99'
        }
    ];

    return (
        <div className={styles.container}>
            <h1>Gérer les entrées de stock et les ventes</h1>
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
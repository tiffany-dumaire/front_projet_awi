import React from "react";
import { Helmet } from "react-helmet";
import { DashboardCard } from "./card/DashboardCard";
import styles from './Dashbord.module.css';

export const Dashbord: React.FunctionComponent = () => {
    const functionnalities = [
        {
            title: 'Voir le mercurial',
            description: 'Vous pourrez y trouver la liste de tous les ingrédients répertoriés en base de données.',
            path: '/mercurial',
            color: '#ff9999'
        },
        {
            title: 'Voir la liste des allergènes',
            description: 'Vous pourrez y trouver la liste de tous les ingrédients répertoriés en base de données.',
            path: '/liste des allergenes',
            color: '#cc99ff'
        },
        {
            title: 'Voir les fiches techniques',
            description: 'Vous pourrez y trouver l\'ensemble des fiches techniques et les éditer au besoin.',
            path: '/fiches techniques',
            color: '#3399ff'
        },
        {   
            title: 'Gestion des stocks',
            description: 'Ici vous pourrez gérer les stocks pour chaque ingrédient ainsi que réaliser et simuler des ventes.',
            path: '/stocks',
            color: '#999966'
        }
    ];

    return (
        <>
        <Helmet>
            <title>✨ Gestionnaire de fiches techniques de cuisine ✨</title>
        </Helmet>
        <div className={styles.container}>
            <h1>Gestionnaire de fiches techniques de cuisine</h1>
            <div className={styles.subContainer}>
                {
                    functionnalities.map((functionnality) => (
                        <DashboardCard key={functionnality.title} title={functionnality.title} description={functionnality.description} path={functionnality.path} color={functionnality.color} />
                    ))
                }
            </div>
        </div>
        </>
    );
}
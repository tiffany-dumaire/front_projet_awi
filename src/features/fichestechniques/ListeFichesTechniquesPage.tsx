import React from 'react';
import { Helmet } from 'react-helmet';
import { SidebarMenu } from '../../layout/sidebar-menu/SidebarMenu';
import styles from './ListeFichesTechniquesPage.module.css';

export function ListeFichesTechniquesPage(): JSX.Element {
    return(
        <>
            <Helmet>
                <title>{'Liste des fiches techniques'}</title>
            </Helmet>
            <div className={styles.listeFTContainer}>
                <SidebarMenu 
                    width={300} 
                    height={'600px'} 
                    to={
                        [
                            {to: '', name: 'Créer une fiche technique'},
                            {to: '/fiches techniques', name: 'Rechercher une fiche technique'},
                            {to: '', name: 'Imprimer une fiche technique'},
                            {to: '', name: 'Créer une étape'},
                            {to: '', name: 'Ajouter un ingrédient au mercurial'},
                            {to: '/liste des allergenes', name: 'Voir la liste des allergènes'},
                        ]
                    }
                />
                <input placeholder="rechercher une fiche technique"></input>
            </div>
        </>
    );
}
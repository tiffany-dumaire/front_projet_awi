import React from 'react';
import { Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import styles from './FTPresentationCard.module.css';

export type FTPresentationCardProps = {
    fiche_technique: Fiche_Technique_Interface;
};

export const FTPresentationCard: React.FunctionComponent<FTPresentationCardProps> = (props: FTPresentationCardProps) => {
    
    return (
        <div className={styles.card}>
            <table className={styles.fichePresentation}>
                <thead>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>INTITULE</th>
                    <th className={styles.th}>NBRE DE COUVERTS</th>
                    <th className={styles.th}>RESPONSABLE</th>
                    {/* <th className={styles.th}>Voir la fiche produit</th> */}
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.td}>{props.fiche_technique.id_fiche_technique}</td>
                        <td className={styles.alignLeft}>{props.fiche_technique.libelle_fiche_technique}</td>
                        <td className={styles.td}>{props.fiche_technique.nombre_couverts}</td>
                        <td className={styles.alignRight}>{props.fiche_technique.id_responsable}</td>
                        {/* <td className={styles.td}>
                            <Link className={styles.button} to={`/mercurial/ingredient/${ingredient.code}`}>
                                <FcSearch className={styles.iconeSearch}/>
                            </Link>
                        </td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
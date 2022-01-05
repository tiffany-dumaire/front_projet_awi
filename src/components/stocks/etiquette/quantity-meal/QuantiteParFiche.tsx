import React, { useEffect, useState } from 'react';
import { Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import styles from './FicheTechniqueChoice.module.css';

export type QuantiteParFicheProps = {
    addedFiches: Fiche_Technique_Interface[];
    saveQuantities: (quantites: number[]) => void;
    next: () => void;
};

export const QuantiteParFiche: React.FunctionComponent<QuantiteParFicheProps> = (props: QuantiteParFicheProps) => {
    const [quantites, setQuantites] = useState<number[]>([]);

    useEffect(() => {
        props.addedFiches.forEach((fiche) => {
            quantites.push(0);
            setQuantites(quantites.slice(0));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.debutContainer}>
            
        </div>
    );
}
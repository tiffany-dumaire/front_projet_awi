import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Etiquette_Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { VenteAEmporter } from './vente-a-emporter/VenteAEmporter';
import { VenteNormale } from './vente-normale/VenteNormale';
import styles from './VenteEtiquettes.module.css';

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type VenteEtiquettesProps = {
    etiquettes: Etiquette[];
    previous: () => void;
};

export const VenteEtiquettes: React.FunctionComponent<VenteEtiquettesProps> = (props: VenteEtiquettesProps) => {
    const [normalOuEmporter, setNormalOuEmporter] = useState<boolean>(false);
    const [vente, setVente] = useState<boolean>(false);
    const componentRef = useRef(null);

    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={styles.debutContainer}>
            <h3 className={styles.title}>Paramétrage des étiquettes</h3>
            <div className={styles.gridContainer2}>
                <div>
                    <label className={styles.label}>Etiquette de vente à emporter</label>
                </div> 
                <div>
                    <label className={styles.label}>Réaliser les sorties de stock</label>
                </div>
                <div className={styles.switchContainer}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={normalOuEmporter} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setNormalOuEmporter(Boolean(ev.target.checked))}/>
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
                <div className={styles.switchContainer}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={vente} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setVente(Boolean(ev.target.checked))}/>
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>
            </div>
            <h3 className={styles.title}>Aperçu des étiquettes en fonction des paramètres donnés</h3> 
            <div ref={componentRef} className={styles.etiquetteContainer}>
                {normalOuEmporter ? 
                    <VenteAEmporter etiquettes={props.etiquettes} vente={vente} />
                :
                    <VenteNormale etiquettes={props.etiquettes} vente={vente} />
                }
            </div>
            <div className={styles.gridContainer}>
                <div>
                    <button 
                        className={styles.buttonPrevious} 
                        onClick={
                            () => {
                                var r = window.confirm("Si vous continuez cela mettra fin à la commande. \nSouhaitez-vous tout de même continuer ?");
                                if (r) {
                                    props.previous();
                                } else {
                                    return;
                                }
                            }
                        }
                    >
                        Modifier le contenu de la vente
                    </button>
                </div>
                <div>
                    <button 
                        className={styles.buttonPrint} 
                        onClick={
                            () => {
                                if (vente) {
                                    var r = window.confirm("Si vous continuez cela modifiera les stocks. \nSouhaitez-vous tout de même continuer ?");
                                    if (r) {
                                        getPDF();
                                    } else {
                                        return;
                                    } 
                                }
                                getPDF();
                            }
                        }
                    >
                        Imprimer l'étiquette {vente ? 'de vente' : 'test'}
                    </button>
                </div>
            </div>
        </div>
    );
}
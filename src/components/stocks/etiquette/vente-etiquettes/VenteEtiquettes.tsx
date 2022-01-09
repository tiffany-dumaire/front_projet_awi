import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { modifyStock } from '../../../../api/ingredient.api';
import { Etiquette_Fiche_Technique_Interface } from '../../../../interfaces/Fiche_Technique.interface';
import { VenteAEmporter } from './vente-a-emporter/VenteAEmporter';
import { VenteNormale } from './vente-normale/VenteNormale';
import styles from './VenteEtiquettes.module.css';

export type QuantiteStock = {
    code: number;
    libelle: string;
    unite: string;
    quantity: number;
    stock: number;
}

export type Etiquette = {
    quantity: number;
    etiquette: Etiquette_Fiche_Technique_Interface;
};

export type VenteEtiquettesProps = {
    etiquettes: Etiquette[];
    quantityStock: QuantiteStock[];
    previous: () => void;
};

export const VenteEtiquettes: React.FunctionComponent<VenteEtiquettesProps> = (props: VenteEtiquettesProps) => {
    //paramètres de l'étiquette 
    const [normalOuEmporter, setNormalOuEmporter] = useState<boolean>(false);
    const [vente, setVente] = useState<boolean>(false);
    //reference pour les pdf
    const componentRef = useRef(null);
    const componentIManquantRef = useRef(null);
    //stock pas ok
    const [stockPasOk, setStockPasOk] = useState<QuantiteStock[]>([]);
    //changement de vue
    const history = useHistory();

    /**
     * Récupération du pdf de l'étiquette
     */
    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    /**
     * Récupération du pdf de la liste des ingrédients manquants
     */
    const printStocksManquants = useReactToPrint({
        content: () => componentIManquantRef.current,
    });

    /**
     * Modifier tous les stocks pour réaliser les sorties
     */
    const modifyAll = () => {
        props.quantityStock.forEach(async (ingredient) => {
            await modifyStock(ingredient.code, (ingredient.stock - ingredient.quantity));
        });
        setTimeout(
            () => getPDF(),
            3000
        );
        setTimeout(
            () =>  history.push('/stocks'),
            3000
        );
    }

    useEffect(() => {
        props.quantityStock.forEach((qs) => {
            if (qs.quantity > qs.stock) {
                stockPasOk.push(qs);
                setStockPasOk(stockPasOk.slice(0));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <VenteAEmporter etiquettes={props.etiquettes} vente={vente} quantityStock={props.quantityStock} />
                :
                    <VenteNormale etiquettes={props.etiquettes} vente={vente} />
                }
            </div>
            {vente ?
                 stockPasOk.length === 0 ?
                    null
                :
                    <>
                        <h3 className={styles.title}>Aperçu des étiquettes en fonction des paramètres donnés</h3>
                        <div ref={componentIManquantRef} className={styles.etiquetteContainer}>
                            <label className={styles.label2}>Voici la liste des ingrédients manquants</label>
                            {stockPasOk.map((spo) => (
                                <div key={'spo' + spo.code}>
                                    <ul>
                                        <li>{spo.quantity - spo.stock} {spo.unite} - {spo.libelle}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
            : null}
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
                                    if (stockPasOk.length === 0 ) {
                                        var r = window.confirm("Si vous continuez cela modifiera les stocks. \nSouhaitez-vous tout de même continuer ?");
                                        if (r) {
                                            modifyAll();
                                        } else {
                                            return;
                                        } 
                                    } else {
                                        printStocksManquants();
                                    }
                                } else {
                                    getPDF();
                                }
                            }
                        }
                    >
                        {vente ? (
                            stockPasOk.length === 0 ? `Réaliser la vente` : `Imprimer la liste des ingrédients manquants`
                        ) : (
                            `Imprimer l'étiquette test`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
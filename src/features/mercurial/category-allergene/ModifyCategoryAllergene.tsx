import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getCategorieAllergeneById, modifyCategoryAllergene } from '../../../api/categorie.api';
import { LoadingParametre } from '../../../components/loading/loading-parameter/LoadingParametre';
import styles from './ModifyCategoryAllergene.module.css';

export function ModifyCategoryAllergene(): JSX.Element {
    //loading
    const [loader, setLoader] = useState<boolean>(false);
    //paramètre de la categorie récupérée
    const [libelle, setLibelle] = useState<string>('');
    const [color, setColor] = useState<string>('');
    //Paramètre de l'url
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();
    //changement de vue
    const history = useHistory();

    /**
     * Redirection vers la liste des allergènes
     */
    const goToAllergenes = () => {
        history.push(`/liste des allergenes`);
    }

    /**
     * Modification de la catégorie d'allergène
     * @returns 
     */
    const modifyThisCategory = () => {
        var r = window.confirm("Êtes-vous sûr de vouloir modifier cette catégorie ?");
        if (r) {
            modifyCategoryAllergene(Number(id_categorie_allergene), libelle, color).then((result) => history.push(`/liste des allergenes`));
        } else {
            return;
        }
    }

    useEffect(() => {
        getCategorieAllergeneById(Number(id_categorie_allergene)).then((result) => {
            setLibelle(result.categorie_allergene);
            setColor(result.color_allergene);
        });
        setTimeout(
            () => setLoader(true),
            1000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{`⚙️ Modifier la catégorie d'allergènes`}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <Link className={styles.link} to={`/liste des allergenes`}>
                            Retour aux allergènes
                        </Link>
                        <div className={styles.container2}>
                            <div className={styles.categoryContainer}>
                                <h2>Modifier la catégorie d'allergène</h2>
                                <div className={styles.gridContainer}>
                                    <div>
                                        <label className={styles.label}>Identifiant de la catégorie</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Libellé de la catégorie</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Couleur de la catégorie</label>
                                    </div>
                                    <div>
                                        <button className={styles.buttonSave} onClick={() => modifyThisCategory()}>Modifier la catégorie</button>
                                    </div>
                                    <div>
                                        <input disabled className={styles.input} type="number" step="any" value={Number(id_categorie_allergene)}></input>
                                    </div>
                                    <div>
                                        <input placeholder={'Saisissez un libellé..'} className={styles.input} type="text" value={libelle} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibelle(ev.target.value)}></input>
                                    </div>
                                    <div>
                                        <input className={styles.input} type="color" value={color} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setColor(ev.target.value)}></input>
                                    </div>
                                    <div>
                                        <button className={styles.buttonCancel} onClick={() => goToAllergenes()}>Annuler la modification</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                ) : (
                    <div className={styles.container}>
                        <LoadingParametre />
                    </div>
                )
            }
        </>
    );
}
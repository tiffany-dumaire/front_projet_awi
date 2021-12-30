import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getCategorieById, modifyCategory } from '../../../api/categorie.api';
import { Loading } from '../../../components/loading/Loading';
import styles from './ModifyCategoryIngredient.module.css';

export function ModifyCategoryIngredient(): JSX.Element {
    const [loader, setLoader] = useState<boolean>(false);
    const [libelle, setLibelle] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const { id_categorie } = useParams<{ id_categorie: string }>();
    const history = useHistory();

    const goToMercurial = () => {
        history.push(`/mercurial`);
    }

    const modifyThisCategory = () => {
        var r = window.confirm("Êtes-vous sûr de vouloir modifier cette catégorie ?");
        if (r) {
            modifyCategory(Number(id_categorie), libelle, color).then((result) => history.push(`/mercurial`));
        } else {
            return;
        }
    }

    useEffect(() => {
        getCategorieById(Number(id_categorie)).then((result) => {
            setLibelle(result.categorie);
            setColor(result.color);
        });
        setLoader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{'➕ Ajouter un ingrédient au mercurial'}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <Link className={styles.link} to={`/mercurial`}>
                            Retour au mercurial
                        </Link>
                        <div className={styles.container2}>
                            <div className={styles.categoryContainer}>
                                <h2>Modifier la catégorie d'ingrédient</h2>
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
                                        <input disabled className={styles.input} type="number" step="any" value={Number(id_categorie)}></input>
                                    </div>
                                    <div>
                                        <input placeholder={'Saisissez un libellé..'} className={styles.input} type="text" value={libelle} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibelle(ev.target.value)}></input>
                                    </div>
                                    <div>
                                        <input className={styles.input} type="color" value={color} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setColor(ev.target.value)}></input>
                                    </div>
                                    <div>
                                        <button className={styles.buttonCancel} onClick={() => goToMercurial()}>Annuler la modification</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                ) : (
                    <div className={styles.container}>
                        <Loading />
                    </div>
                )
            }
        </>
    );
}
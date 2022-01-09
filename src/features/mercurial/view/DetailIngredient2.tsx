import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { deleteIngredient, getIngredientDetail } from '../../../api/ingredient.api';
import { Loading } from '../../../components/loading/Loading';
import { Ingredient_Detail_Interface } from '../../../interfaces/Ingredient.interface';
import styles from './DetailIngredient2.module.css';

export function DetailIngredient2(): JSX.Element {
    //loading
    const [loader, setLoader] = useState<boolean>(true);
    //récupération des informations de l'ingrédient
    const [ingredient, setIngredient] = useState<Ingredient_Detail_Interface>();
    //paramètre de l'url
    const { id_ingredient } = useParams<{ id_ingredient: string }>();
    //pdf
    const componentRef = useRef(null);
    //changement de vue
    const history = useHistory();

    /**
     * Imprimer la fiche produit en pdf
     */
    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    /**
     * Suppression de la fiche produit
     * @returns 
     */
    const deleteAnIngredient = () => {
        var r = window.confirm("La suppression de cette fiche produit affectera toutes les étapes et fiches techniques dans lesquelles vous avez utilisé cet ingrédient. Êtes-vous sûr de vouloir malgré tout supprimer cet ingrédient définitivement du mercurial ?");
        if (r) {
            deleteIngredient(Number(id_ingredient)).then((result) => {
                history.push('/mercurial');
            });
        } else {
            return;
        }
    };

    useEffect(() => {
        getIngredientDetail(Number(id_ingredient)).then((result) => setIngredient(result));
        setTimeout(
            () => setLoader(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{'🍽️ ' + ingredient?.libelle}</title>
            </Helmet>
            {
                loader && ingredient? (
                    <div className={styles.container}>
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/mercurial/byCategorie/${ingredient.id_categorie}`}>
                                Retour à la catégorie
                            </Link>
                        </div>
                        <div className={styles.container2}>
                            <div className={styles.detailContainer}>
                                <div className={styles.subDetailContainer} ref={componentRef}>
                                    <h2>{ingredient.libelle}</h2>
                                    <div className={styles.gridContainer}>
                                        <div>
                                            <label className={styles.label}>Code produit</label>
                                        </div>
                                        <div>
                                            <label className={styles.label}>Prix unitaire</label>
                                        </div>
                                        <div>
                                            <label className={styles.label}>Stock</label>
                                        </div>
                                        <div>
                                            <label className={styles.label}>Allergène</label>
                                        </div>
                                        <div>
                                            <label className={styles.label}>Catégorie</label>
                                        </div>
                                        <div>
                                            <label className={styles.label}>Catégorie d'allergènes</label>
                                        </div>
                                        <div>
                                            <input className={styles.input} type="text" disabled value={ingredient.code}></input>
                                        </div>
                                        <div>
                                            <input className={styles.input} type="text" disabled value={ingredient.prix_unitaire + ' €'}></input>
                                        </div>
                                        <div>
                                            <input className={styles.input} type="text" disabled value={ingredient.stock + ' ' + ingredient.unite}></input>
                                        </div>
                                        <div>
                                            <div className={styles.switchContainer}>
                                                <label className={styles.switch}>
                                                    <input type="checkbox" disabled checked={ingredient.allergene}/>
                                                    <span className={`${styles.slider} ${styles.round}`}></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <input className={styles.input} type="text" disabled value={ingredient.categorie}></input>
                                        </div>
                                        <div>
                                            <input className={styles.input} type="text" disabled value={ingredient.categorie_allergene === null ? 'Aucune' : ingredient.categorie_allergene}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.gridButtonContainer}>
                                    <div>
                                        <button className={styles.buttonEdit} onClick={() => history.push(`/mercurial/modify/${id_ingredient}`)}>Editer la fiche produit</button>
                                    </div>
                                    <div>
                                        <button className={styles.buttonPrint} onClick={() => getPDF()}>Imprimer la fiche produit</button>
                                    </div>
                                    <div>
                                        <button className={styles.buttonDelete} onClick={() => deleteAnIngredient()}>Supprimer la fiche produit</button>
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
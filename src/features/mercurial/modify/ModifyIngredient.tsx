import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getCategories, getCategoriesAllergenes } from '../../../api/categorie.api';
import { getIngredientDetail, putIngredient } from '../../../api/ingredient.api';
import { Loading } from '../../../components/loading/Loading';
import { Categorie_Interface } from '../../../interfaces/Categorie.interface';
import { Categorie_Allergenes_Interface } from '../../../interfaces/Categorie_Allergenes.interface';
import styles from './ModifyIngredient.module.css';

export function ModifyIngredient(): JSX.Element {
    //attribut du produit
    const [libelle, setLibelle] = useState<string>('');
    const [unite, setUnite] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [allergene, setAllergene] = useState<boolean>(false);
    const [categorie, setCategorie] = useState<number | null>(null);
    const [categorie_allergene, setCategorieAllergene] = useState<number | null>(null);
    //loading
    const [loader, setLoader] = useState<boolean>(true);
    //paramètre de l'url
    const { id_ingredient } = useParams<{ id_ingredient: string }>();
    //changement de vue
    const history = useHistory();
    //récupération de la liste des catégories
    const [categories, setCategories] = useState<Categorie_Interface[]>([]);
    //récupération de la liste des catégories d'allergènes
    const [categoriesAllergene, setCategoriesAllergene] = useState<Categorie_Allergenes_Interface[]>([]);

    /**
     * Modification d'une fiche produit
     * @param id_ingredient 
     * @param libelle 
     * @param unite 
     * @param prix_unitaire 
     * @param stock 
     * @param allergene 
     * @param id_categorie 
     * @param id_categorie_allergene 
     */
    const modifyIngredient = (
        id_ingredient: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        id_categorie_allergene: number | null
    ) => {
        putIngredient(id_ingredient, libelle, unite, prix_unitaire, stock, allergene, id_categorie, id_categorie_allergene).then((result) => {
            history.push(`/mercurial/ingredient/${id_ingredient}`);
        });
    };

    useEffect(() => {
        getCategoriesAllergenes().then((list) => {
            setCategoriesAllergene(list);
        });
        getCategories().then((list) => {
            setCategories(list);
        });
        getIngredientDetail(Number(id_ingredient)).then((result) => {
            setLibelle(result.libelle);
            setPrice(result.prix_unitaire);
            setStock(result.stock);
            setUnite(result.unite);
            setAllergene(result.allergene);
            setCategorie(result.id_categorie);
            setCategorieAllergene(result.id_categorie_allergene);
        });
        setTimeout(
            () => setLoader(true),
            2000
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <>
            <Helmet>
                <title>{'🍽️ ' + libelle}</title>
            </Helmet>
            {
                loader ? (
                    <div className={styles.container}>
                        <div className={styles.linkTo}>
                            <Link className={styles.link} to={`/mercurial/byCategorie/${categorie}`}>
                                Retour à la catégorie
                            </Link>
                        </div>
                        <div className={styles.container2}>
                            <div className={styles.detailContainer}>
                                <h2>{libelle}</h2>
                                <div className={styles.gridContainer}>
                                    <div>
                                        <label className={styles.label}>Code produit</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Libellé du produit</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Prix unitaire (en €)</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Stock</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Unité</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Catégorie</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Allergène</label>
                                    </div>
                                    <div>
                                        <label className={styles.label}>Catégorie d'allergènes</label>
                                    </div>
                                    <div>
                                        <button className={styles.buttonSave} onClick={
                                            () => {
                                                if (libelle === '') {
                                                    alert('Vous n\'avez pas défini de libellé pour cet ingrédient.');
                                                    return;
                                                }
                                                if (price < 0.01) {
                                                    alert('Vous n\'avez pas défini de prix pour cet ingrédient.');
                                                    return;
                                                } 
                                                if (stock < 0) {
                                                    alert('Vous n\'avez pas défini le stock initial pour cet ingrédient.');
                                                    return;
                                                }
                                                if (unite === '') {
                                                    alert('Vous n\'avez pas défini d\'unité de mesure pour cet ingrédient.');
                                                    return;
                                                }
                                                if (categorie === 0 || categorie === null) {
                                                    alert('Vous n\'avez pas défini la catégorie de cet ingrédient.');
                                                    return;
                                                } 
                                                if (allergene) {
                                                    if (categorie_allergene === 0 || categorie_allergene === null) {
                                                        alert('Vous n\'avez pas défini la catégorie d\'allergène de cet ingrédient.');
                                                        return;
                                                    }
                                                    modifyIngredient(Number(id_ingredient),libelle,unite,price,stock,allergene,categorie,categorie_allergene);
                                                } else {
                                                    modifyIngredient(Number(id_ingredient),libelle,unite,price,stock,allergene,categorie,null);
                                                }
                                            }
                                        }>
                                            Sauvegarder la fiche produit
                                        </button>
                                    </div>
                                    <div>
                                        <input className={styles.input2} value={Number(id_ingredient)} type="number" disabled></input>
                                    </div>
                                    <div>
                                        <input placeholder={'Saisissez un libellé..'} className={styles.input} value={libelle} type="text" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setLibelle(ev.target.value)}></input>
                                    </div>
                                    <div>
                                        <input className={styles.input2} value={price} type="number" step=".01" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(ev.target.value))}></input>
                                    </div>
                                    <div>
                                        <input className={styles.input2} value={stock} type="number" step=".001" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setStock(Number(ev.target.value))}></input>
                                    </div>
                                    <div>
                                    <select
                                            value={unite}
                                            className={styles.input}
                                            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                                setUnite(ev.target.value)
                                            }
                                        >
                                            <option 
                                                className={styles.options} 
                                                value={''}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                            }>Aucune</option>
                                            <option 
                                                className={styles.options} 
                                                value={'kg'}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                                }>
                                                    Kilogramme
                                            </option>
                                            <option 
                                                className={styles.options} 
                                                value={'L'}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                                }>
                                                    Litre
                                            </option>
                                            <option 
                                                className={styles.options} 
                                                value={'Piece'}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                                }>
                                                    Pièce
                                            </option>
                                            <option 
                                                className={styles.options} 
                                                value={'Unite'}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                                }>
                                                    Unité
                                            </option>
                                            <option 
                                                className={styles.options} 
                                                value={'Botte'}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setUnite(ev.target.value)
                                                }>
                                                    Botte
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={categorie === null ? 0 : categorie}
                                            className={styles.input}
                                            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                                setCategorie(Number(ev.target.value))
                                            }
                                        >
                                            <option 
                                                className={styles.options} 
                                                value={0}
                                                onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorie(Number(ev.target.value))
                                            }>Aucune</option>
                                            {categories.map((categorie) =>
                                                    <option 
                                                        key={categorie.categorie}
                                                        className={styles.options} 
                                                        value={categorie.id_categorie}
                                                        onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorie(Number(ev.target.value))
                                                    }>{categorie.categorie}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <div className={styles.switchContainer}>
                                            <label className={styles.switch}>
                                                <input type="checkbox" checked={allergene} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setAllergene(Boolean(ev.target.checked))}/>
                                                <span className={`${styles.slider} ${styles.round}`}></span>
                                            </label>
                                        </div>
                                    </div>
                                    { allergene ? (
                                        <div>
                                            <select
                                                value={categorie_allergene === null ? 0 : categorie_allergene}
                                                className={styles.input}
                                                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                                    setCategorieAllergene(Number(ev.target.value))
                                                }
                                            >
                                                <option 
                                                    className={styles.options} 
                                                    value={0}
                                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                                }>Aucune</option>
                                                {categoriesAllergene.map((categorie) =>
                                                        <option 
                                                            key={categorie.categorie_allergene}
                                                            className={styles.options} 
                                                            value={categorie.id_categorie_allergene}
                                                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                                        }>{categorie.categorie_allergene}</option>
                                                )}
                                            </select>
                                        </div>
                                    ) : (
                                        <div>
                                            <select
                                                value={0}
                                                className={styles.input}
                                                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                                                    setCategorieAllergene(Number(ev.target.value))
                                                }
                                                disabled
                                            >
                                                <option 
                                                    className={styles.options} 
                                                    value={0}
                                                    onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                                }>Aucune</option>
                                                {categoriesAllergene.map((categorie) =>
                                                        <option 
                                                            key={categorie.categorie_allergene}
                                                            className={styles.options} 
                                                            value={categorie.id_categorie_allergene}
                                                            onChange={(ev: React.ChangeEvent<HTMLOptionElement>) => setCategorieAllergene(Number(ev.target.value))
                                                        }>{categorie.categorie_allergene}</option>
                                                )}
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <button className={styles.buttonCancel} onClick={() => history.push(`/mercurial/ingredient/${id_ingredient}`)}>Annuler la modification</button>
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
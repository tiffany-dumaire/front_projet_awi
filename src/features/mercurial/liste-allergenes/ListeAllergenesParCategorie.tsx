import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getAllergenes, getAllergenesByCategorie } from '../../../api/ingredient.api';
import { Ingredient_Interface } from '../../../interfaces/Ingredient.interface';
import { IoIosArrowBack } from 'react-icons/io';
import { SketchPicker, PhotoshopPicker, SwatchesPicker } from 'react-color';
import styles from './ListeAllergenesParCategorie.module.css';


export function ListeAllergenesParCategorie(): JSX.Element {
    const [allergenes, setAllergenes] = useState<Ingredient_Interface[]>([]);
    const { id_categorie_allergene } = useParams<{ id_categorie_allergene: string }>();

    useEffect(() => {
        //récupérer le nom de la catégorie

        if (Number(id_categorie_allergene) === 0) {
            getAllergenes().then((list) => {
                list.forEach((ingredient) => {
                    allergenes.push(ingredient);
                    setAllergenes(allergenes.slice(0));
                }); 
            });
        }else {
            getAllergenesByCategorie(Number(id_categorie_allergene)).then((list) => {
                list.forEach((ingredient) => {
                    allergenes.push(ingredient);
                    setAllergenes(allergenes.slice(0));
                }); 
            });
        }  
    },[]);

    return(
        <>
            <Helmet>
                <title>{'Allergènes | '}</title>
            </Helmet>
            <div className={styles.mercurialContainer}>
                <Link className={styles.link} to={`/liste des allergenes`}>
                    <IoIosArrowBack /> Retour à la liste des allergènes
                </Link>
                {/* <SwatchesPicker /> */}
                <input placeholder="rechercher un allergène"></input>
                {allergenes.length > 0 ? 
                    (<table className={styles.mercurial}>
                        <thead>
                            <th className={styles.th}>Code</th>
                            <th className={styles.th}>Libellé</th>
                            <th className={styles.th}>Unité</th>
                            <th className={styles.th}>Prix unitaire</th>
                            <th className={styles.th}>Quantité en stock</th>
                            <th className={styles.th}>Valeur du stock</th>
                        </thead>
                        <tbody>
                            { 
                                allergenes.map((allergene: Ingredient_Interface) => (
                                    <tr>
                                        <td className={styles.td}>{allergene.code}</td>
                                        <td className={styles.alignLeft}>{allergene.libelle}</td>
                                        <td className={styles.td}>{allergene.unite}</td>
                                        <td className={styles.alignRight}>{allergene.prix_unitaire} €</td>
                                        <td className={styles.alignRight}>{allergene.stock}</td>
                                        <td className={styles.alignRight}>{allergene.prix_unitaire * allergene.stock} €</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>) : (
                        <p>Il n'existe pas encore d'allergène répertorié appartenant à cette catégorie dans notre base de données.</p>
                    )
                }
            </div>
        </>
    );
}
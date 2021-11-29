import axios, { AxiosRequestConfig } from 'axios';
import { Fiche_Technique_Infos_Interface, Fiche_Technique_Interface } from '../interfaces/Fiche_Technique.interface';

/**
 * Récupère les informations générales de l'ensemble des fiches techniques contenues dans la base de données.
 * @returns 
 */
export async function getFichesTechniques(): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/all`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fiches_techniques) => {
                const FTList: Fiche_Technique_Interface[] = new Array<Fiche_Technique_Interface>();
                fiches_techniques.data.forEach((fiche_technique: Fiche_Technique_Interface) => {
                    FTList.push(fiche_technique);
                });
                resolve(FTList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupère les informations liées à la fiche technique dont l'id est donné en paramètre : 
 * - id_fiche_technique
 * - libelle_fiche_technique
 * - nombre_couverts
 * - intitule_responsable
 * - categorie_fiche
 * @param id_fiche_technique 
 * @returns 
 */
export async function getFicheTechniqueByID(id_fiche_technique: number): Promise<Fiche_Technique_Infos_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/infos/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fiches_techniques) => {
                const FTList: Fiche_Technique_Infos_Interface[] = new Array<Fiche_Technique_Infos_Interface>();
                fiches_techniques.data.forEach((fiche_technique: Fiche_Technique_Infos_Interface) => {
                    FTList.push(fiche_technique);
                });
                resolve(FTList[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupère les informations générales de l'ensemble des fiches techniques de la catégorie dont l'id est donné en paramètre.
 * @param id_categorie_fiche 
 * @returns 
 */
export async function getFTByCategorie(id_categorie_fiche: number): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/byCategorie/${id_categorie_fiche}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fiches_techniques) => {
                const FTList: Fiche_Technique_Interface[] = new Array<Fiche_Technique_Interface>();
                fiches_techniques.data.forEach((fiche_technique: Fiche_Technique_Interface) => {
                    FTList.push(fiche_technique);
                });
                resolve(FTList);
            });
        } catch (err) {
            reject(err);
        }
    });
}
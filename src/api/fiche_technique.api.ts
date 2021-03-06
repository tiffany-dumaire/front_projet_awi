import axios, { AxiosRequestConfig } from 'axios';
import { Denree_Interface } from '../interfaces/Denrees.interface';
import { Etiquette_Fiche_Technique_Interface, Fiche_Complete_Interface, Fiche_Technique_Infos_Interface, Fiche_Technique_Interface } from '../interfaces/Fiche_Technique.interface';
import { Phase_Interface } from '../interfaces/Phase.interface';

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
 * Récupération d'une fiche technique par id
 * @param id_fiche_technique 
 * @returns 
 */
export async function getFicheByID(id_fiche_technique: number): Promise<Fiche_Technique_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/byId/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fiches_techniques) => {
                resolve(fiches_techniques.data[0]);
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

/**
 * Récupère l'ensemble des étapes de la fiche technique dont l'id est donné en paramètre.
 * @param id_fiche_technique 
 * @returns 
 */
export async function getPhasesByFT(id_fiche_technique: number): Promise<Phase_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/phases/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phases) => {
                const phaseList: Phase_Interface[] = new Array<Phase_Interface>();
                phases.data.forEach((phase: Phase_Interface) => {
                    phaseList.push(phase);
                });
                resolve(phaseList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération des denrées par fiche technique et ordre
 * @param id_fiche_technique 
 * @param ordre 
 * @returns 
 */
export async function getDenreesByFTByPhase(id_fiche_technique: number, ordre: number): Promise<Denree_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/denrees/${id_fiche_technique}/${ordre}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((denrees) => {
                const denreesList: Denree_Interface[] = new Array<Denree_Interface>();
                denrees.data.forEach((denree: Denree_Interface) => {
                    denreesList.push(denree);
                });
                resolve(denreesList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Recherche une fiche technique par nom d'ingrédient
 * @param search 
 * @returns 
 */
export async function searchFTbyIngredient(search: string): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/search/byIngredients/${search}`;
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
 * Récupération des fiches techniques par nom d'ingrédient et catégorie de fiche 
 * @param search 
 * @param id_categorie_fiche 
 * @returns 
 */
export async function searchFTbyIngredientAndCategorie(search: string, id_categorie_fiche: number): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/search/byIngredients/${search}/${id_categorie_fiche}`;
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
 * Récupération des fiches techniques par libellé de fiche
 * @param search 
 * @returns 
 */
export async function searchFTbyLibelle(search: string): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/search/byLibelle/${search}`;
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
 * Récupération des fiches techniques par libellé de fiche et catégorie de fiche technique
 * @param search 
 * @param id_categorie_fiche 
 * @returns 
 */
export async function searchFTbyLibelleAndCategorie(search: string, id_categorie_fiche: number): Promise<Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/search/byLibelle/${search}/${id_categorie_fiche}`;
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
 * Récupération d'une fiche complète par id
 * @param id_fiche_technique 
 * @returns 
 */
export async function getFicheTechniqueComplete(id_fiche_technique: number): Promise<Fiche_Complete_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/detail/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((fiche_technique) => {
                resolve(fiche_technique.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération d'une étiquette de fiche par id
 * @param id_fiche_technique 
 * @returns 
 */
export async function etiquetteFiche(id_fiche_technique: number): Promise<Etiquette_Fiche_Technique_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/etiquette/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((etiquette) => {
                resolve(etiquette.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération de toutes les étiquettes de fiches
 * @returns 
 */
export async function etiquettesFiches(): Promise<Etiquette_Fiche_Technique_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/etiquettes`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((etiquettes) => {
                const EtiquettesList: Etiquette_Fiche_Technique_Interface[] = new Array<Etiquette_Fiche_Technique_Interface>();
                etiquettes.data.forEach((etiquette: Etiquette_Fiche_Technique_Interface) => {
                    EtiquettesList.push(etiquette);
                });
                resolve(EtiquettesList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** POST **/

/**
 * Création d'une fiche technique
 * @param libelle_fiche_technique 
 * @param nombre_couverts 
 * @param id_responsable 
 * @param id_categorie_fiche 
 * @returns 
 */
export async function createFicheTechnique(
    libelle_fiche_technique: string,
    nombre_couverts: number,
    id_responsable: number,
    id_categorie_fiche: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/create`,
                data: { 
                    "libelle_fiche_technique": libelle_fiche_technique,
                    "nombre_couverts": nombre_couverts,
                    "id_responsable": id_responsable,
                    "id_categorie_fiche": id_categorie_fiche,
                },
            };
            axios(config).then((result) => {
                resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** PUT **/

/**
 * Modification de la base d'une fiche technique
 * @param id_fiche_technique 
 * @param libelle_fiche_technique 
 * @param nombre_couverts 
 * @param id_responsable 
 * @param id_categorie_fiche 
 * @returns 
 */
export async function modifyFicheTechnique(
    id_fiche_technique: number,
    libelle_fiche_technique: string,
    nombre_couverts: number,
    id_responsable: number,
    id_categorie_fiche: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'put',
                url: `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/modify/${id_fiche_technique}`,
                data: { 
                    "libelle_fiche_technique": libelle_fiche_technique,
                    "nombre_couverts": nombre_couverts,
                    "id_responsable": id_responsable,
                    "id_categorie_fiche": id_categorie_fiche,
                },
            };
            axios(config).then((result) => {
                resolve(result.data.changedRows);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** DELETE **/

/**
 * Suppression d'une fiche technique
 * @param id_fiche_technique 
 * @returns 
 */
export async function deleteFicheTechnique(
    id_fiche_technique: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'delete',
                url: `${process.env.REACT_APP_SERV_HOST}/fiches_techniques/delete/${id_fiche_technique}`
            };
            axios(config).then((result) => {
                resolve(result.data.affectedRows);
            });
        } catch (err) {
            reject(err);
        }
    });
}
import axios, { AxiosRequestConfig } from 'axios';
import { Phase_Detail_Interface, Phase_Ingredients_Interface, Phase_Ingredient_Interface, Phase_Simple_Interface } from '../interfaces/Phase.interface';

/** GET **/

/**
 * Récupération d'une phase par id
 * @param id_phase 
 * @returns 
 */
export async function getPhaseByID(id_phase: number): Promise<Phase_Simple_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/infos/${id_phase}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phases) => {
                const phaseList: Phase_Simple_Interface[] = new Array<Phase_Simple_Interface>();
                phases.data.forEach((phase: Phase_Simple_Interface) => {
                    phaseList.push(phase);
                });
                resolve(phaseList[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération de toutes les phases
 * @returns 
 */
export async function getPhases(): Promise<Phase_Simple_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/all`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phases) => {
                const phaseList: Phase_Simple_Interface[] = new Array<Phase_Simple_Interface>();
                phases.data.forEach((phase: Phase_Simple_Interface) => {
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
 * Récupération de toutes les phases pour une fiche technique
 * @param id_fiche_technique 
 * @returns 
 */
export async function getPhasesByFT(id_fiche_technique): Promise<Phase_Simple_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/byFT/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phases) => {
                const phaseList: Phase_Simple_Interface[] = new Array<Phase_Simple_Interface>();
                phases.data.forEach((phase: Phase_Simple_Interface) => {
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
 * Récupération de la liste des denrées pour une phase donnée
 * @param id_phase 
 * @returns 
 */
export async function getDenreesByPhase(id_phase: number): Promise<Phase_Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/denrees/${id_phase}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((denrees) => {
                const denreeList: Phase_Ingredient_Interface[] = new Array<Phase_Ingredient_Interface>();
                denrees.data.forEach((denree: Phase_Ingredient_Interface) => {
                    denreeList.push(denree);
                });
                resolve(denreeList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération des ingrédients des phases pour une fiche technique donnée
 * @param id_fiche_technique 
 * @returns 
 */
export async function getPhaseIngredients(id_fiche_technique: number): Promise<Phase_Ingredients_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/ingredients/${id_fiche_technique}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phases) => {
                const phasesList: Phase_Ingredients_Interface[] = new Array<Phase_Ingredients_Interface>();
                phases.data.forEach((phase: Phase_Ingredients_Interface) => {
                    phasesList.push(phase);
                });
                resolve(phasesList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération des détails d'une phase 
 * @param id_phase 
 * @returns 
 */
export async function getPhaseDetail(id_phase: number): Promise<Phase_Detail_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/phases/detail/${id_phase}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((phase) => {
                resolve(phase.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** POST **/

/**
 * Création d'une phase
 * @param libelle_phase 
 * @param libelle_denrees 
 * @param description_phase 
 * @param duree_phase 
 * @returns 
 */
export async function postPhase(
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/create`,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "libelle_phase": libelle_phase,
                    "libelle_denrees": libelle_denrees,
                    "description_phase": description_phase, 
                    "duree_phase": duree_phase
                }
            };
            axios(config).then((result) => {
                resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Ajouter une phase et l'ordre dans une fiche technique
 * @param id_phase 
 * @param id_fiche_technique 
 * @param ordre 
 * @returns 
 */
export async function addPhaseFT(
    id_phase: number,
    id_fiche_technique: number,
    ordre: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/phase_FT`,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id_phase": id_phase,
                    "id_fiche_technique": id_fiche_technique,
                    "ordre": ordre
                }
            };
            axios(config).then((result) => {
                resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Ajouter un ingrédient à une phase
 * @param code 
 * @param id_phase 
 * @returns 
 */
export async function addIngredient(
    code: number,
    id_phase: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/add_ingredient`,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "code": code,
                    "id_phase": id_phase
                }
            };
            axios(config).then((result) => {
                resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Ajouter la quantité d'ingrédient pour une phase et une fiche technique données
 * @param id_fiche_technique 
 * @param id_phase_ingredient 
 * @param quantite 
 * @returns 
 */
export async function postQuantityIngredient(
    id_fiche_technique: number,
    id_phase_ingredient: number,
    quantite: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/phase_ingredient_quantity`,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "id_fiche_technique": id_fiche_technique,
                    "id_phase_ingredient": id_phase_ingredient,
                    "quantite": quantite
                }
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
 * Modification d'une phase
 * @param id_phase 
 * @param libelle_phase 
 * @param libelle_denrees 
 * @param description_phase 
 * @param duree_phase 
 * @returns 
 */
export async function putPhase(
    id_phase: number,
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'put',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/modify/${id_phase}`,
                headers: { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "libelle_phase": libelle_phase,
                    "libelle_denrees": libelle_denrees,
                    "description_phase": description_phase, 
                    "duree_phase": duree_phase
                }
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
 * Suppression d'un ingrédient dans une phase
 * @param id_phase_ingredient 
 * @returns 
 */
export async function pullIngredient(
    id_phase_ingredient: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'delete',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/pull_ingredient/${id_phase_ingredient}`,
                headers: { 
                    'Content-Type': 'application/json' 
                }
            };
            axios(config).then((result) => {
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Suppression d'une phase
 * @param id_phase 
 * @returns 
 */
export async function deletePhase(
    id_phase: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'delete',
                url: `${process.env.REACT_APP_SERV_HOST}/phases/delete/${id_phase}`
            };
            axios(config).then((result) => {
                resolve(result.data.affectedRows);
            });
        } catch (err) {
            reject(err);
        }
    });
}
import axios, { AxiosRequestConfig } from 'axios';
import { Phase_Ingredients_Interface, Phase_Ingredient_Interface, Phase_Simple_Interface } from '../interfaces/Phase.interface';

/** GET **/

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

/** POST **/

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
                resolve(result.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** DELETE **/

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
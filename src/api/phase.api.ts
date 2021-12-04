import axios, { AxiosRequestConfig } from 'axios';

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
                //resolve(result.data.insertId);
            });
        } catch (err) {
            reject(err);
        }
    });
}
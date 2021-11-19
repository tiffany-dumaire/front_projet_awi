import axios, { AxiosRequestConfig } from 'axios';
import { Fiche_Technique_Interface } from '../interfaces/Fiche_Technique.interface';

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
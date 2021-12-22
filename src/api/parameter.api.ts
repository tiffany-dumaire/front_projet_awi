import axios, { AxiosRequestConfig } from 'axios';
import { Parameter_Interface } from '../interfaces/Parameter.interface';

export async function getParameter(libelle_parameters: string): Promise<Parameter_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/parameters/${libelle_parameters}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((parameters) => {
                const parameterList: Parameter_Interface[] = new Array<Parameter_Interface>();
                parameters.data.forEach((parameter: Parameter_Interface) => {
                    parameterList.push(parameter);
                });
                resolve(parameterList[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}
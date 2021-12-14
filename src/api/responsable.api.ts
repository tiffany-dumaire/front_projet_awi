import axios, { AxiosRequestConfig } from 'axios';
import { Responsable_Interface } from '../interfaces/Responsable.interface';


/** GET **/

export async function getResponsables(): Promise<Responsable_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/responsables/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' 
        },
      };
      axios.get(url, config).then((responsables) => {
        const responsableList: Responsable_Interface[] = new Array<Responsable_Interface>();
        responsables.data.forEach((responsable: Responsable_Interface) => {
            responsableList.push(responsable);
        });
        resolve(responsableList);
      });
    } catch (err) {
      reject(err);
    }
  });
}
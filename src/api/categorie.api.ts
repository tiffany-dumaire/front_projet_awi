import axios, { AxiosRequestConfig } from 'axios';
import { Categorie_Interface } from '../interfaces/Categorie.interface';

export async function getCategories(): Promise<Categorie_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      };
      axios.get(url, config).then((categories) => {
        const categorieList: Categorie_Interface[] = new Array<Categorie_Interface>();
        categories.data.forEach((categorie: Categorie_Interface) => {
            categorieList.push(categorie);
        });
        resolve(categorieList);
      });
    } catch (err) {
      reject(err);
    }
  });
}
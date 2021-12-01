import axios, { AxiosRequestConfig } from 'axios';
import { Categorie_Interface } from '../interfaces/Categorie.interface';
import { Categorie_Allergenes_Interface } from '../interfaces/Categorie_Allergenes.interface';
import { Categorie_Fiches_Interface } from '../interfaces/Categorie_Fiches.interface';


/** GET **/

export async function getCategories(): Promise<Categorie_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' 
        },
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

export async function getCategorieById(id_categorie: number): Promise<Categorie_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories/byID/${id_categorie}`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' 
        },
      };
      axios.get(url, config).then((categories) => {
        const categorieList: Categorie_Interface[] = new Array<Categorie_Interface>();
        categories.data.forEach((categorie: Categorie_Interface) => {
            categorieList.push(categorie);
        });
        resolve(categorieList[0]);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function getCategoriesAllergenes(): Promise<Categorie_Allergenes_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
    const url = `${process.env.REACT_APP_SERV_HOST}/categories_allergenes/all`;
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
    };
    axios.get(url, config).then((categories) => {
      const categorieList: Categorie_Allergenes_Interface[] = new Array<Categorie_Allergenes_Interface>();
      categories.data.forEach((categorie: Categorie_Allergenes_Interface) => {
        categorieList.push(categorie);
      });
        resolve(categorieList);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function getCategorieAllergeneById(id_categorie_allergene: number): Promise<Categorie_Allergenes_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories_allergenes/byID/${id_categorie_allergene}`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' 
        },
      };
      axios.get(url, config).then((categories) => {
        const categorieList: Categorie_Allergenes_Interface[] = new Array<Categorie_Allergenes_Interface>();
        categories.data.forEach((categorie: Categorie_Allergenes_Interface) => {
            categorieList.push(categorie);
        });
        resolve(categorieList[0]);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function getCategoriesFiches(): Promise<Categorie_Fiches_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories_fiches/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' 
        },
      };
      axios.get(url, config).then((categories) => {
        const categorieList: Categorie_Fiches_Interface[] = new Array<Categorie_Fiches_Interface>();
        categories.data.forEach((categorie: Categorie_Fiches_Interface) => {
          categorieList.push(categorie);
        });
        resolve(categorieList);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/** POST **/


/** PUT **/
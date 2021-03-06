import axios, { AxiosRequestConfig } from 'axios';
import { Categorie_Interface } from '../interfaces/Categorie.interface';
import { Categorie_Allergenes_Interface } from '../interfaces/Categorie_Allergenes.interface';
import { Categorie_Fiches_Interface } from '../interfaces/Categorie_Fiches.interface';


/** GET **/

/**
 * Récupération des catégories d'ingrédients
 * @returns 
 */
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

/**
 * Récupération d'une catégorie d'ingrédient par id
 * @param id_categorie 
 * @returns 
 */
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

/**
 * Récupération de la liste des catégories d'allergènes
 * @returns 
 */
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

/**
 * Récupération d'une catégorie d'allergènes par id
 * @param id_categorie_allergene 
 * @returns 
 */
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

/**
 * Récupération des catégories de fiches techniques
 * @returns 
 */
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

/**
 * Récupération d'une catégorie de fiche technique par id
 * @param id_categorie_fiche 
 * @returns 
 */
export async function getCategorieFicheById(id_categorie_fiche: number): Promise<Categorie_Fiches_Interface> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/categories_fiches/byID/${id_categorie_fiche}`;
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
        resolve(categorieList[0]);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/** PUT **/

/**
 * Modification de la catégorie d'ingrédient
 * @param id_categorie 
 * @param categorie 
 * @param color 
 * @returns 
 */
export async function modifyCategory(
  id_categorie: number,
  categorie: string,
  color: string
): Promise<Number> {
  return new Promise((resolve, reject) => {
      try {
          const config: AxiosRequestConfig = {
              method: 'put',
              url: `${process.env.REACT_APP_SERV_HOST}/categories/modify/${id_categorie}`,
              data: { 
                  "categorie": categorie,
                  "color": color,
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

/**
 * Modification de la catégorie d'allergènes
 * @param id_categorie_allergene 
 * @param categorie_allergene 
 * @param color_allergene 
 * @returns 
 */
export async function modifyCategoryAllergene(
  id_categorie_allergene: number,
  categorie_allergene: string,
  color_allergene: string
): Promise<Number> {
  return new Promise((resolve, reject) => {
      try {
          const config: AxiosRequestConfig = {
              method: 'put',
              url: `${process.env.REACT_APP_SERV_HOST}/categories_allergenes/modify/${id_categorie_allergene}`,
              data: { 
                  "categorie_allergene": categorie_allergene,
                  "color_allergene": color_allergene,
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

/**
 * Modification de la catégorie de fiches techniques
 * @param id_categorie_fiche 
 * @param categorie_fiche 
 * @param color_fiche 
 * @returns 
 */
export async function modifyCategoryFiche(
  id_categorie_fiche: number,
  categorie_fiche: string,
  color_fiche: string
): Promise<Number> {
  return new Promise((resolve, reject) => {
      try {
          const config: AxiosRequestConfig = {
              method: 'put',
              url: `${process.env.REACT_APP_SERV_HOST}/categories_fiches/modify/${id_categorie_fiche}`,
              data: { 
                  "categorie_fiche": categorie_fiche,
                  "color_fiche": color_fiche,
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
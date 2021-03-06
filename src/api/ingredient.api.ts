import axios, { AxiosRequestConfig } from 'axios';
import { Code_Interface, Ingredient_Detail_Interface, Ingredient_Interface, Stock_Interface } from '../interfaces/Ingredient.interface';

/**
 * Récupération de l'ensemble des ingrédients
 * @returns 
 */
export async function getIngredients(): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/all`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération du détail d'un ingrédient complet
 * @param code 
 * @returns 
 */
export async function getIngredientDetail(
    code: number
): Promise<Ingredient_Detail_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/byId/${code}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                resolve(ingredients.data[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération de la liste des codes existants
 * @returns 
 */
export async function getAllIds(): Promise<Code_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/allIds`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((codes) => {
                const codeList: Code_Interface[] = new Array<Code_Interface>();
                codes.data.forEach((code: Code_Interface) => {
                    codeList.push(code);
                });
                resolve(codeList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération de la liste des allergènes
 * @returns 
 */
export async function getAllergenes(): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/allergenes`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération de la liste des ingrédients par catégorie
 * @param id_categorie 
 * @returns 
 */
export async function getIngredientsByCategorie(id_categorie: number): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/byCategorie/${id_categorie}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération d'un ingrédient par id d'ingrédient
 * @param id_ingredient 
 * @returns 
 */
export async function getIngredientByCategorie(id_ingredient: number): Promise<Ingredient_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/ingredient/${id_ingredient}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList[0]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération des allergènes par catégorie d'allergène
 * @param id_categorie_allergene 
 * @returns 
 */
export async function getAllergenesByCategorie(id_categorie_allergene: number): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/allergenes/byCategorie/${id_categorie_allergene}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                },
            };
            axios.get(url, config).then((allergenes) => {
                const allergeneList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                allergenes.data.forEach((allergene: Ingredient_Interface) => {
                    allergeneList.push(allergene);
                });
                resolve(allergeneList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Rechercher un ingredient avec une partie de son nom.
 * @param search 
 * @returns 
 */
export async function searchIngredients(search: string): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/search/byWord/${search}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                }   
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Rechercher un ingredient avec une partie de son nom et dans une catégorie spécifique.
 * @param search 
 * @param id_categorie 
 * @returns 
 */
export async function searchIngredientsByCategorie(search: string, id_categorie: number): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/search/byWord/${search}/byCategorie/${id_categorie}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                }   
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Rechercher un ingredient avec une partie de son nom et dans une catégorie d'allergènes spécifique.
 * @param search 
 * @param id_categorie_allergene 
 * @returns 
 */
export async function searchIngredientsByCategorieAllergene(search: string, id_categorie_allergene: number): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/search/byWord/${search}/byCategorieAllergene/${id_categorie_allergene}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                }   
            };
            axios.get(url, config).then((ingredients) => {
                const ingredientList: Ingredient_Interface[] = new Array<Ingredient_Interface>();
                ingredients.data.forEach((ingredient: Ingredient_Interface) => {
                    ingredientList.push(ingredient);
                });
                resolve(ingredientList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** POST **/

/**
 * Création d'un ingrédient
 * @param code 
 * @param libelle 
 * @param unite 
 * @param prix_unitaire 
 * @param stock 
 * @param allergene 
 * @param id_categorie 
 * @param id_categorie_allergene 
 * @returns 
 */
export async function createIngredient(
    code: number,
    libelle: string,
    unite: string,
    prix_unitaire: number,
    stock: number,
    allergene: boolean,
    id_categorie: number,
    id_categorie_allergene: number | null
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${process.env.REACT_APP_SERV_HOST}/ingredients/create`,
                data: { 
                    "code": code,
                    "libelle": libelle,
                    "unite": unite,
                    "prix_unitaire": prix_unitaire,
                    "stock": stock,
                    "allergene": allergene,
                    "id_categorie": id_categorie,
                    "id_categorie_allergene": id_categorie_allergene
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
 * Modification d'un ingrédient
 * @param code 
 * @param libelle 
 * @param unite 
 * @param prix_unitaire 
 * @param stock 
 * @param allergene 
 * @param id_categorie 
 * @param id_categorie_allergene 
 * @returns 
 */
export async function putIngredient(
    code: number,
    libelle: string,
    unite: string,
    prix_unitaire: number,
    stock: number,
    allergene: boolean,
    id_categorie: number,
    id_categorie_allergene: number | null
): Promise<Ingredient_Interface> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'put',
                url: `${process.env.REACT_APP_SERV_HOST}/ingredients/modify/${code}`,
                data: { 
                    "libelle": libelle,
                    "unite": unite,
                    "prix_unitaire": prix_unitaire,
                    "stock": stock,
                    "allergene": allergene,
                    "id_categorie": id_categorie,
                    "id_categorie_allergene": id_categorie_allergene
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
 * Suppression d'un ingrédient
 * @param code 
 * @returns 
 */
export async function deleteIngredient(
    code: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'delete',
                url: `${process.env.REACT_APP_SERV_HOST}/ingredients/delete/${code}`
            };
            axios(config).then((result) => {
                resolve(result.data.affectedRows);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/** STOCKS **/

/**
 * Récupération des stocks pour tous les ingrédients
 * @returns 
 */
export async function getAllStocks(): Promise<Stock_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/stocks`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                }   
            };
            axios.get(url, config).then((stocks) => {
                const stockList: Stock_Interface[] = new Array<Stock_Interface>();
                stocks.data.forEach((stock: Stock_Interface) => {
                    stockList.push(stock);
                });
                resolve(stockList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Récupération des stocks par catégorie
 * @param id_categorie 
 * @returns 
 */
export async function getStockByCategorie(id_categorie: number): Promise<Stock_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/stocks/byCategorie/${id_categorie}`;
            const config: AxiosRequestConfig = {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json' 
                }   
            };
            axios.get(url, config).then((stocks) => {
                const stockList: Stock_Interface[] = new Array<Stock_Interface>();
                stocks.data.forEach((stock: Stock_Interface) => {
                    stockList.push(stock);
                });
                resolve(stockList);
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Modification du stock d'un ingrédient
 * @param code 
 * @param stock 
 * @returns 
 */
export async function modifyStock(
    code: number,
    stock: number,
): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const config: AxiosRequestConfig = {
                method: 'put',
                url: `${process.env.REACT_APP_SERV_HOST}/ingredients/stocks/modify/${code}`,
                data: { 
                    "stock": stock
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
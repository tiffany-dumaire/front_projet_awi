import axios, { AxiosRequestConfig } from 'axios';
import { Ingredient_Interface } from '../interfaces/Ingredient.interface';

export async function getIngredients(): Promise<Ingredient_Interface[]> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/all`;
      const config: AxiosRequestConfig = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
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

export async function getAllergenes(): Promise<Ingredient_Interface[]> {
    return new Promise((resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/allergenes`;
            const config: AxiosRequestConfig = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json' },
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

export async function getIngredientsByCategorie(id_categorie: number): Promise<Ingredient_Interface[]> {
  return new Promise((resolve, reject) => {
      try {
          const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/byCategorie/${id_categorie}`;
          const config: AxiosRequestConfig = {
          method: 'get',
          headers: { 
              'Content-Type': 'application/json' },
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

export async function getAllergenesByCategorie(id_categorie_allergene: number): Promise<Ingredient_Interface[]> {
  return new Promise((resolve, reject) => {
      try {
          const url = `${process.env.REACT_APP_SERV_HOST}/ingredients/allergenes/byCategorie/${id_categorie_allergene}`;
          const config: AxiosRequestConfig = {
          method: 'get',
          headers: { 
              'Content-Type': 'application/json' },
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
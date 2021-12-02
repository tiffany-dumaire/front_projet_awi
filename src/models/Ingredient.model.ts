import { Code_Interface, Ingredient_Interface } from '../interfaces/Ingredient.interface';

export class Ingredient implements Ingredient_Interface {
    code: number;
    libelle: string;
    unite: string;
    prix_unitaire: number;
    stock: number;
    allergene: boolean;
    id_categorie: number;
    id_categorie_allergene: number;

    constructor(
        code: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        id_categorie_allergene: number
    ) {
        this.code = code;
        this.libelle = libelle;
        this.unite = unite;
        this.prix_unitaire = prix_unitaire;
        this.stock = stock;
        this.allergene = allergene;
        this.id_categorie = id_categorie;
        this.id_categorie_allergene = id_categorie_allergene;
    }
}

export class Code implements Code_Interface {
    code: number;

    constructor(code: number){
        this.code = code;
    }
}
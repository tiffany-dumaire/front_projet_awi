import { Code_Interface, Ingredient_Detail_Interface, Ingredient_Interface, Ingredient_Phase_Interface, Stock_Interface } from '../interfaces/Ingredient.interface';

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

export class Ingredient_Detail implements Ingredient_Detail_Interface {
    code: number;
    libelle: string;
    unite: string;
    prix_unitaire: number;
    stock: number;
    allergene: boolean;
    id_categorie: number;
    categorie: string;
    id_categorie_allergene: number;
    categorie_allergene: string;


    constructor(
        code: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        allergene: boolean,
        id_categorie: number,
        categorie: string,
        id_categorie_allergene: number,
        categorie_allergene: string
    ) {
        this.code = code;
        this.libelle = libelle;
        this.unite = unite;
        this.prix_unitaire = prix_unitaire;
        this.stock = stock;
        this.allergene = allergene;
        this.id_categorie = id_categorie;
        this.categorie = categorie;
        this.id_categorie_allergene = id_categorie_allergene;
        this.categorie_allergene = categorie_allergene;
    }
}

export class Code implements Code_Interface {
    code: number;

    constructor(code: number){
        this.code = code;
    }
}

export class Stock implements Stock_Interface {
    code: number;
    libelle: string;
    unite: string;
    stock: number;

    constructor(code: number, libelle: string, unite: string, stock: number) {
        this.code = code;
        this.libelle = libelle;
        this.stock = stock;
        this.unite = unite;
    }
}

export class Ingredient_Phase implements Ingredient_Phase_Interface {
    code: number;
    libelle: string;
    
    constructor(code: number, libelle: string) {
        this.code = code;
        this.libelle = libelle;
    }
}
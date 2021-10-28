import { Ingredient_Interface } from '../interfaces/Ingredient.interface';

export class Ingredient implements Ingredient_Interface {
    code: number;
    libelle: string;
    unite: string;
    prix_unitaire: number;
    stock: number;
    id_categorie: number;

    constructor(
        code: number,
        libelle: string,
        unite: string,
        prix_unitaire: number,
        stock: number,
        id_categorie: number,
    ) {
        this.code = code;
        this.libelle = libelle;
        this.unite = unite;
        this.prix_unitaire = prix_unitaire;
        this.stock = stock;
        this.id_categorie = id_categorie;
    }
}
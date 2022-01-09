import { Categorie_Interface } from '../interfaces/Categorie.interface';

/**
 * 
 */
export class Categorie implements Categorie_Interface {
    id_categorie: number;
    categorie: string;
    color: string;

    /**
     * Constructeur de Categorie (d'ingrédient)
     * @param id_categorie 
     * @param categorie 
     * @param color 
     */
    constructor(
        id_categorie: number,
        categorie: string,
        color: string
    ) {
        this.id_categorie = id_categorie;
        this.categorie = categorie;
        this.color = color;
    }
}
import { Categorie_Allergenes_Interface } from '../interfaces/Categorie_Allergenes.interface';

/**
 * 
 */
export class Categorie_Allergenes implements Categorie_Allergenes_Interface {
    id_categorie_allergene: number;
    categorie_allergene: string;
    color_allergene: string;

    /**
     * Constructeur de Categorie_Allergenes
     * @param id_categorie_allergene 
     * @param categorie_allergene 
     * @param color_allergene 
     */
    constructor(
        id_categorie_allergene: number,
        categorie_allergene: string,
        color_allergene: string
    ) {
        this.id_categorie_allergene = id_categorie_allergene;
        this.categorie_allergene = categorie_allergene;
        this.color_allergene = color_allergene;
    }
    
}
import { Categorie_Fiches_Interface } from '../interfaces/Categorie_Fiches.interface';

/**
 * 
 */
export class Categorie_Fiches implements Categorie_Fiches_Interface {
    id_categorie_fiche: number;
    categorie_fiche: string;
    color_fiche: string;

    /**
     * Constructeur de Categorie_Fiches
     * @param id_categorie_fiche 
     * @param categorie_fiche 
     * @param color_fiche 
     */
    constructor(
        id_categorie_fiche: number,
        categorie_fiche: string,
        color_fiche: string
    ) {
        this.id_categorie_fiche = id_categorie_fiche;
        this.categorie_fiche = categorie_fiche;
        this.color_fiche = color_fiche;
    }
    
    
}
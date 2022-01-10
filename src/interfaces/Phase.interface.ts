import { Denrees_Phase_Interface, Denree_Interface } from "./Denrees.interface";
import { Ingredient_Phase_Interface } from "./Ingredient.interface";

/**
 * 
 */
export interface Phase_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
    ordre: number;
}

/**
 * 
 */
export interface Phase_Simple_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
}

/**
 * 
 */
export interface Phase_Ingredient_Interface {
    id_phase_ingredient: number;
    code: number;
    id_phase: number;
    libelle: string;
}

/**
 * 
 */
export interface Phase_Ingredients_Interface {
    id_phase: number;
    libelle_phase: string;
    ingredients: Denrees_Phase_Interface[];
}

/**
 * 
 */
export interface Phase_Complete_Interface {
    id_phase: number;
    id_phase_ft: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
    ordre: number;
    ingredients: Denree_Interface[];
}

/**
 * 
 */
export interface Phase_Detail_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
    ingredients: Ingredient_Phase_Interface[];
}
import { Denrees_Etiquette_Interface } from "./Denrees.interface";
import { Phase_Complete_Interface } from "./Phase.interface";

/**
 * 
 */
export interface Fiche_Technique_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    id_responsable: number;
    intitule_responsable: string;
    id_categorie_fiche: number;
}

/**
 * 
 */
export interface Fiche_Technique_Infos_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    intitule_responsable: string;
    categorie_fiche: string;
}

/**
 * 
 */
export interface Fiche_Complete_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    id_responsable: number;
    intitule_responsable: string;
    id_categorie_fiche: number;
    phases: Phase_Complete_Interface[];
}

/**
 * 
 */
export interface Etiquette_Fiche_Technique_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    ingredients: Denrees_Etiquette_Interface[];
}
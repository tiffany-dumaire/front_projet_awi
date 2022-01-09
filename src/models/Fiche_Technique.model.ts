import { Denrees_Etiquette_Interface } from '../interfaces/Denrees.interface';
import { Etiquette_Fiche_Technique_Interface, Fiche_Complete_Interface, Fiche_Technique_Infos_Interface, Fiche_Technique_Interface } from '../interfaces/Fiche_Technique.interface';
import { Phase_Complete_Interface } from '../interfaces/Phase.interface';

/**
 * 
 */
export class Fiche_Technique implements Fiche_Technique_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    id_responsable: number;
    intitule_responsable: string;
    id_categorie_fiche: number;

    /**
     * Constructeur de Fiche_Technique
     * @param id_fiche_technique 
     * @param libelle_fiche_technique 
     * @param nombre_couverts 
     * @param id_responsable 
     * @param intitule_responsable 
     * @param id_categorie_fiche 
     */
    constructor(
        id_fiche_technique: number,
        libelle_fiche_technique: string,
        nombre_couverts: number,
        id_responsable: number,
        intitule_responsable: string,
        id_categorie_fiche: number
    ) {
        this.id_fiche_technique = id_fiche_technique;
        this.libelle_fiche_technique = libelle_fiche_technique;
        this.nombre_couverts = nombre_couverts;
        this.id_responsable = id_responsable;
        this.intitule_responsable = intitule_responsable;
        this.id_categorie_fiche = id_categorie_fiche;
    }
     
}

/**
 * 
 */
export class Fiche_Technique_Infos implements Fiche_Technique_Infos_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    intitule_responsable: string;
    categorie_fiche: string;

    /**
     * Constructeur de Fiche_Technique_Infos
     * @param id_fiche_technique 
     * @param libelle_fiche_technique 
     * @param nombre_couverts 
     * @param intitule_responsable 
     * @param categorie_fiche 
     */
    constructor(
        id_fiche_technique: number,
        libelle_fiche_technique: string,
        nombre_couverts: number,
        intitule_responsable: string,
        categorie_fiche: string
    ) {
        this.id_fiche_technique = id_fiche_technique;
        this.libelle_fiche_technique = libelle_fiche_technique;
        this.nombre_couverts = nombre_couverts;
        this.intitule_responsable = intitule_responsable;
        this.categorie_fiche = categorie_fiche;
    }
     
}

/**
 * 
 */
export class Etiquette_Fiche_Technique implements Etiquette_Fiche_Technique_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    ingredients: Denrees_Etiquette_Interface[];

    /**
     * Constructeur de Etiquette_Fiche_Technique
     * @param id_fiche_technique 
     * @param libelle_fiche_technique 
     * @param nombre_couverts 
     * @param ingredients 
     */
    constructor(
        id_fiche_technique: number,
        libelle_fiche_technique: string,
        nombre_couverts: number,
        ingredients: Denrees_Etiquette_Interface[]
    ) {
        this.id_fiche_technique = id_fiche_technique;
        this.libelle_fiche_technique = libelle_fiche_technique;
        this.nombre_couverts = nombre_couverts;
        this.ingredients = ingredients;
    }
}

/**
 * 
 */
export class Fiche_Complete implements Fiche_Complete_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    intitule_responsable: string;
    id_responsable: number;
    id_categorie_fiche: number;
    phases: Phase_Complete_Interface[];

    /**
     * Constructeur de Fiche_Complete
     * @param id_fiche_technique 
     * @param libelle_fiche_technique 
     * @param nombre_couverts 
     * @param intitule_responsable 
     * @param id_responsable 
     * @param id_categorie_fiche 
     * @param phases 
     */
    constructor(
        id_fiche_technique: number,
        libelle_fiche_technique: string,
        nombre_couverts: number,
        intitule_responsable: string,
        id_responsable: number,
        id_categorie_fiche: number,
        phases: Phase_Complete_Interface[]
    ) {
        this.id_fiche_technique = id_fiche_technique;
        this.libelle_fiche_technique = libelle_fiche_technique;
        this.nombre_couverts = nombre_couverts;
        this.intitule_responsable = intitule_responsable;
        this.id_responsable = id_responsable;
        this.id_categorie_fiche = id_categorie_fiche;
        this.phases = phases;
    }
}
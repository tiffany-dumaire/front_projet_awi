import { Denree_Interface, DenreesEtape_Interface, Denrees_Etiquette_Interface, Denrees_Phase_Interface } from '../interfaces/Denrees.interface';

/**
 * 
 */
export class Denree implements Denree_Interface {
    id_phase_ingredient: number;
    code: number;
    libelle: string;
    quantite: number;
    unite: string;
    prix_unitaire: number;
    allergene: boolean;

    /**
     * Constructeur de Denree
     * @param id_phase_ingredient 
     * @param code 
     * @param libelle 
     * @param quantite 
     * @param unite 
     * @param prix_unitaire 
     * @param allergene 
     */
    constructor(
        id_phase_ingredient: number,
        code: number,
        libelle: string,
        quantite: number,
        unite: string,
        prix_unitaire: number,
        allergene: boolean
    ) {
        this.id_phase_ingredient = id_phase_ingredient;
        this.code = code;
        this.libelle = libelle;
        this.quantite = quantite;
        this.unite = unite;
        this.prix_unitaire = prix_unitaire;
        this.allergene = allergene;
    }
}

/**
 * 
 */
export class DenreesEtape implements DenreesEtape_Interface {
    ordre: number;
    libelle_denrees: string;
    denrees: Denree_Interface[];

    /**
     * Constructeur de DenreesEtape
     * @param ordre 
     * @param libelle_denrees 
     * @param denrees 
     */
    constructor(
        ordre: number,
        libelle_denrees: string,
        denrees: Denree_Interface[],
    ) {
        this.ordre = ordre;
        this.libelle_denrees = libelle_denrees;
        this.denrees = denrees;
    }
    
}

/**
 * 
 */
export class Denrees_Etiquette implements Denrees_Etiquette_Interface {
    code: number;
    libelle: string;
    allergene: boolean;
    unite: string;
    stock: number;
    quantite_ingredient: number;

    /**
     * Constructeur de Denrees_Etiquette
     * @param code 
     * @param libelle 
     * @param allergene 
     * @param unite 
     * @param stock 
     * @param quantite_ingredient 
     */
    constructor(
        code: number,
        libelle: string,
        allergene: boolean,
        unite: string,
        stock: number,
        quantite_ingredient: number
    ) {
        this.code = code;
        this.libelle = libelle;
        this.allergene = allergene;
        this.unite = unite;
        this.stock = stock;
        this.quantite_ingredient = quantite_ingredient;
    }
}

/**
 * 
 */
export class Denrees_Phase implements Denrees_Phase_Interface {
    id_phase_ingredient: number;
    libelle: string;
    quantite: number;

    /**
     * Constructeur de Denrees_Phase
     * @param id_phase_ingredient 
     * @param libelle 
     * @param quantite 
     */
    constructor(
        id_phase_ingredient: number,
        libelle: string,
        quantite: number
    ) {
        this.id_phase_ingredient = id_phase_ingredient;
        this.libelle = libelle;
        this.quantite = quantite;
    }
    
}
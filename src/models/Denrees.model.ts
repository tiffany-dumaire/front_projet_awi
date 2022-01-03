import { Denree_Interface, DenreesEtape_Interface, Denrees_Etiquette_Interface, Denrees_Phase_Interface } from '../interfaces/Denrees.interface';

export class Denree implements Denree_Interface {
    code: number;
    libelle: string;
    quantite: number;
    unite: string;
    prix_unitaire: number;
    allergene: boolean;

    constructor(
        code: number,
        libelle: string,
        quantite: number,
        unite: string,
        prix_unitaire: number,
        allergene: boolean
    ) {
        this.code = code;
        this.libelle = libelle;
        this.quantite = quantite;
        this.unite = unite;
        this.prix_unitaire = prix_unitaire;
        this.allergene = allergene;
    }
}

export class DenreesEtape implements DenreesEtape_Interface {
    ordre: number;
    libelle_denrees: string;
    denrees: Denree_Interface[];

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

export class Denrees_Etiquette implements Denrees_Etiquette_Interface {
    code: number;
    libelle: string;
    stock: number;
    quantite_ingredient: number;

    constructor(
        code: number,
        libelle: string,
        stock: number,
        quantite_ingredient: number
    ) {
        this.code = code;
        this.libelle = libelle;
        this.stock = stock;
        this.quantite_ingredient = quantite_ingredient;
    }
}

export class Denrees_Phase implements Denrees_Phase_Interface {
    id_phase_ingredient: number;
    libelle: string;
    quantite: number;

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
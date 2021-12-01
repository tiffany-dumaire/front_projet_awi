import { Denree_Interface, DenreesEtape_Interface } from '../interfaces/Denrees.interface';

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
export interface Denree_Interface {
    code: number;
    libelle: string;
    quantite: number;
    unite: string;
    prix_unitaire: number;
    allergene: boolean;
}

export interface DenreesEtape_Interface {
    ordre: number;
    libelle_denrees: string;
    denrees: Denree_Interface[];
}
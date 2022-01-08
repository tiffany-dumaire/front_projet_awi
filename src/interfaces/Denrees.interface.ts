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

export interface Denrees_Etiquette_Interface {
    code: number;
    libelle: string;
    allergene: boolean;
    stock: number;
    quantite_ingredient: number;
}

export interface Denrees_Phase_Interface {
    id_phase_ingredient: number;
    libelle: string;
    quantite: number;
}
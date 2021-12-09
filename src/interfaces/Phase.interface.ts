export interface Phase_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
    ordre: number;
}

export interface Phase_Simple_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
}

export interface Phase_Ingredient_Interface {
    id_phase_ingredient: number;
    code: number;
    id_phase: number;
    libelle: string;
}
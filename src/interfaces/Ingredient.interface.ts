export interface Ingredient_Interface {
    code: number;
    libelle: string;
    unite: string;
    prix_unitaire: number;
    stock: number;
    allergene: boolean;
    id_categorie: number;
    id_categorie_allergene: number;
}

export interface Code_Interface {
    code: number;
}
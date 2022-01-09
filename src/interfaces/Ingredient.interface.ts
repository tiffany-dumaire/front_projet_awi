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

export interface Ingredient_Detail_Interface {
    code: number;
    libelle: string;
    unite: string;
    prix_unitaire: number;
    stock: number;
    allergene: boolean;
    id_categorie: number;
    categorie: string;
    id_categorie_allergene: number;
    categorie_allergene: string;
}

export interface Code_Interface {
    code: number;
}

export interface Stock_Interface {
    code: number;
    libelle: string;
    unite: string;
    stock: number;
}

export interface Ingredient_Phase_Interface {
    code: number;
    libelle: string;
}
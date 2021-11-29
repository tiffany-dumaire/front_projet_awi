import { Fiche_Technique_Infos_Interface, Fiche_Technique_Interface } from '../interfaces/Fiche_Technique.interface';

export class Fiche_Technique implements Fiche_Technique_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    id_responsable: number;
    id_categorie_fiche: number;

    constructor(
        id_fiche_technique: number,
        libelle_fiche_technique: string,
        nombre_couverts: number,
        id_responsable: number,
        id_categorie_fiche: number
    ) {
        this.id_fiche_technique = id_fiche_technique;
        this.libelle_fiche_technique = libelle_fiche_technique;
        this.nombre_couverts = nombre_couverts;
        this.id_responsable = id_responsable;
        this.id_categorie_fiche = id_categorie_fiche;
    }
     
}

export class Fiche_Technique_Infos implements Fiche_Technique_Infos_Interface {
    id_fiche_technique: number;
    libelle_fiche_technique: string;
    nombre_couverts: number;
    intitule_responsable: string;
    categorie_fiche: string;

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
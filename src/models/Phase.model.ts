import { Denrees_Phase_Interface } from '../interfaces/Denrees.interface';
import { Phase_Ingredients_Interface, Phase_Ingredient_Interface, Phase_Interface, Phase_Simple_Interface } from '../interfaces/Phase.interface';

export class Phase implements Phase_Interface {
    id_phase: number;
    libelle_phase: string;
    libelle_denrees: string;
    description_phase: string;
    duree_phase: number;
    ordre: number;

  constructor(
    id_phase: number,
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number,
    ordre: number
  ) {
    this.id_phase = id_phase;
    this.libelle_phase = libelle_phase;
    this.libelle_denrees = libelle_denrees;
    this.description_phase = description_phase;
    this.duree_phase = duree_phase;
    this.ordre = ordre;
  }
    
}

export class Phase_Simple implements Phase_Simple_Interface {
  id_phase: number;
  libelle_phase: string;
  libelle_denrees: string;
  description_phase: string;
  duree_phase: number;

  constructor(
    id_phase: number,
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number
  ) {
    this.id_phase = id_phase;
    this.libelle_phase = libelle_phase;
    this.libelle_denrees = libelle_denrees;
    this.description_phase = description_phase;
    this.duree_phase = duree_phase;
  }
}

export class Phase_Ingredient implements Phase_Ingredient_Interface {
  id_phase_ingredient: number;
  code: number;
  id_phase: number;
  libelle: string;

  constructor(
    id_phase_ingredient: number,
    code: number,
    id_phase: number,
    libelle: string
  ) {
    this.id_phase_ingredient = id_phase_ingredient;
    this.code = code;
    this.id_phase = id_phase;
    this.libelle = libelle;
  }
}

export class Phase_Ingredients implements Phase_Ingredients_Interface {
  id_phase: number;
  libelle_phase: string;
  ingredients: Denrees_Phase_Interface[];

  constructor(
    id_phase: number,
    libelle_phase: string,
    ingredients: Denrees_Phase_Interface[]
  ) {
    this.id_phase = id_phase;
    this.libelle_phase = libelle_phase;
    this.ingredients = ingredients;
  }
  
}
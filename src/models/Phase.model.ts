import { Denrees_Phase_Interface, Denree_Interface } from '../interfaces/Denrees.interface';
import { Ingredient_Phase_Interface } from '../interfaces/Ingredient.interface';
import { Phase_Complete_Interface, Phase_Detail_Interface, Phase_Ingredients_Interface, Phase_Ingredient_Interface, Phase_Interface, Phase_Simple_Interface } from '../interfaces/Phase.interface';

/**
 * 
 */
export class Phase implements Phase_Interface {
  id_phase: number;
  libelle_phase: string;
  libelle_denrees: string;
  description_phase: string;
  duree_phase: number;
  ordre: number;

  /**
   * Constructeur de Phase
   * @param id_phase 
   * @param libelle_phase 
   * @param libelle_denrees 
   * @param description_phase 
   * @param duree_phase 
   * @param ordre 
   */
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

/**
 * 
 */
export class Phase_Simple implements Phase_Simple_Interface {
  id_phase: number;
  libelle_phase: string;
  libelle_denrees: string;
  description_phase: string;
  duree_phase: number;

  /**
   * Constructeur de Phase_Simple
   * @param id_phase 
   * @param libelle_phase 
   * @param libelle_denrees 
   * @param description_phase 
   * @param duree_phase 
   */
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

/**
 * 
 */
export class Phase_Ingredient implements Phase_Ingredient_Interface {
  id_phase_ingredient: number;
  code: number;
  id_phase: number;
  libelle: string;

  /**
   * Constructeur de Phase_Ingredient
   * @param id_phase_ingredient 
   * @param code 
   * @param id_phase 
   * @param libelle 
   */
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

/**
 * 
 */
export class Phase_Ingredients implements Phase_Ingredients_Interface {
  id_phase: number;
  libelle_phase: string;
  ingredients: Denrees_Phase_Interface[];

  /**
   * Constructeur de Phase_Ingredients
   * @param id_phase 
   * @param libelle_phase 
   * @param ingredients 
   */
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

/**
 * 
 */
export class Phase_Complete implements Phase_Complete_Interface {
  id_phase: number;
  id_phase_ft: number;
  libelle_phase: string;
  libelle_denrees: string;
  description_phase: string;
  duree_phase: number;
  ordre: number;
  ingredients: Denree_Interface[];

  /**
   * Constructeur de Phase_Complete
   * @param id_phase 
   * @param id_phase_ft
   * @param libelle_phase 
   * @param libelle_denrees 
   * @param description_phase 
   * @param duree_phase 
   * @param ordre 
   * @param ingredients 
   */
  constructor(
    id_phase: number,
    id_phase_ft: number,
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number,
    ordre: number,
    ingredients: Denree_Interface[]
  ) {
    this.id_phase = id_phase;
    this.id_phase_ft = id_phase_ft;
    this.libelle_phase = libelle_phase;
    this.libelle_denrees = libelle_denrees;
    this.description_phase = description_phase;
    this.duree_phase = duree_phase;
    this.ordre = ordre;
    this.ingredients = ingredients;
  }
  
}

/**
 * 
 */
export class Phase_Detail implements Phase_Detail_Interface {
  id_phase: number;
  libelle_phase: string;
  libelle_denrees: string;
  description_phase: string;
  duree_phase: number;
  ingredients: Ingredient_Phase_Interface[];
  
  /**
   * Constructeur de Phase_Detail
   * @param id_phase 
   * @param libelle_phase 
   * @param libelle_denrees 
   * @param description_phase 
   * @param duree_phase 
   * @param ingredients 
   */
  constructor(
    id_phase: number,
    libelle_phase: string,
    libelle_denrees: string,
    description_phase: string,
    duree_phase: number,
    ingredients: Ingredient_Phase_Interface[]
  ) {
    this.id_phase = id_phase;
    this.libelle_phase = libelle_phase;
    this.libelle_denrees = libelle_denrees;
    this.description_phase = description_phase;
    this.duree_phase = duree_phase;
    this.ingredients = ingredients;
  }
  
}
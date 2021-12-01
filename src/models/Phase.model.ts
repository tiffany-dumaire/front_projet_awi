import { Phase_Interface } from '../interfaces/Phase.interface';

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
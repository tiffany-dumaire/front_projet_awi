import { Parameter_Interface } from "../interfaces/Parameter.interface";

/**
 * 
 */
export class Parameter implements Parameter_Interface {
    id_parameters: number;
    libelle_parameters: string;
    value: number;
    value2: number;
    utile: boolean;
  
    /**
     * Constructeur de Parameter
     * @param id_parameters 
     * @param libelle_parameters 
     * @param value 
     * @param value2 
     * @param utile 
     */
    constructor(
        id_parameters: number,
        libelle_parameters: string,
        value: number,
        value2: number,
        utile: boolean
    ) {
        this.id_parameters = id_parameters;
        this.libelle_parameters = libelle_parameters;
        this.value = value;
        this.value2 = value2;
        this.utile = utile;
    }
}
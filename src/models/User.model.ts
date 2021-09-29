import { User_Interface } from '../interfaces/User.interface';

export class User implements User_Interface {
  user_id: number;
  user_email: string;
  password: string;
  prenom: string;
  nom: string;

  constructor(
    user_id: number,
    user_email: string,
    password: string,
    prenom: string,
    nom: string,
  ) {
    this.user_id = user_id;
    this.user_email = user_email;
    this.password = password;
    this.prenom = prenom;
    this.nom = nom;
  }
}
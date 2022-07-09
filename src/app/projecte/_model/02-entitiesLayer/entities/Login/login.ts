import { v4 as uuidv4 } from 'uuid'

export class Login {
    
    // Totes les propietats que estem utilitzant són públiques
    id?: string;
    usuari?: string;
    password?: string;

    constructor() {
        this.id = uuidv4();     // Assignem un nou id a l'objecte
    }
}
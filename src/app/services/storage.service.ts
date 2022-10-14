import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [
    {
      rut: '11111111-1',
      nom: 'Satan',
      ape: 'Lucifer',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'admin123',
      tipo_usuario: 'Administrador',
      email: 'admin@admin.cl'
    },
    {
      rut: '20417394-K',
      nom: 'Roberto',
      ape: 'Gracias',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Alumno',
      email: 'alumno@duoc.cl'
    },
    {
      rut: '11111111-3',
      nom: 'Alan',
      ape: 'Gajardo',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Docente',
      email: 'profesor@profesor.duoc.cl'
    }
  ];

  //variables a utilizar:
  /* datos: any[] = []; */
  dato: any;
  mail: string;
  password: string;
  //VARIABLE DE ESTADO DE LOGIN
  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    storage.create();
  }

  //métodos del crud del storage:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDato(key, dato.rut);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async getDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.rut == identificador);
    return this.dato;
  }

  async getDatologin(key, mail) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.email == mail);
    this.isAuthenticated.next(true);
    return this.dato;
  }
  async getDatos(key): Promise<any[]> {
    this.datos = await this.storage.get(key);
    return this.datos;
  }

  async eliminar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.rut == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }


  async validarEmailPassword(mail,pass,key) {
    var usuLogin: any;
    this.dato= await this.getDatologin(key,mail);
   
   if(this.dato.password == pass){
    usuLogin=this.dato;
    
   }
   

    if(usuLogin !=undefined){
      
      this.isAuthenticated.next(true);
      
      return usuLogin;
    } 
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  
  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    console.log(this.datos)
    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

}

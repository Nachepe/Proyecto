import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
 
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any=[];

  rutasist: [];
  //variables a utilizar:

  dato: any;
  mail: string;
  password: string;
  //VARIABLE DE ESTADO DE LOGIN
  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage,private router:Router) {
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

  async agregarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoclase(key, dato.cod);
    if (this.dato == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }
  async agregarAsistencia(key, dato) {
    this.datos = await this.storage.get(key) || [];

    this.dato = await this.getDatoasis(key, dato.cod_asis);
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

  async getDatoclase(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(clase => clase.cod == identificador);
    return this.dato;
  }
  async getDatoasis(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(asistencia => asistencia.cod_asis == identificador);
    return this.dato;
  }

  async getDatologin(key, mail) {
    this.datos = await this.storage.get(key) || [];
    
    this.dato = this.datos.find(persona => persona.email == mail);
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

  async eliminarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.cod == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }

//validador de email y password
  async validarEmailPassword(mail,pass,key) {
    var usuLogin: any;
    
    this.dato= await this.getDatologin(key,mail);
   
    if(this.dato !=undefined){
        if(this.dato.password == pass){
          usuLogin=this.dato;
          
        }
    }
    if(usuLogin !=undefined){
      
      this.isAuthenticated.next(true);
      
      return usuLogin;
    } else{
      return undefined;
    }
  }



  //Variables de AuthGuard
  getAuth(){
    return this.isAuthenticated.value;
  }


  logout(){
    
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    this.storage.set('usuarios','')
  }



  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    
    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  async actualizarClase(key, dato) {
    this.datos = await this.storage.get(key) || [];
    var index = this.datos.findIndex(clase => clase.cod == dato.cod);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  async asistir(key, dato) {
    this.datos = await this.storage.get(key) || [];




    var index = this.datos.findIndex(asistencia => asistencia.cod_asis == dato[1]);
    if(index == -1){
      return -1
    }
    this.rutasist = this.datos[index].alumnos  
    var encontrado= this.rutasist.findIndex(element => element == dato[0]);

    if (encontrado >=0){
      return 1

    }else{
      
      this.datos[index].alumnos.push(dato[0]); 
      await this.storage.set(key, this.datos);
      return 2
    } 

    /* console.log(this.datos[index].alumnos); */
    /* console.log(this.datos[index].find(a=> a.alumnos == dato[0])); */
     /* this.datos[index].alumnos.push(dato[0]); 
     await this.storage.set(key, this.datos); */ 
  }

}

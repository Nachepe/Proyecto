import { Injectable } from '@angular/core';

//import para utilizar fireStore:
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire: AngularFirestore) { }

  //métodos del CRUD
  agregar(colleccion, value){
    //coleccion: nosotros conociamos como KEY de storage, nombre de una tabla..
    try {
      this.fire.collection(colleccion).add(value);
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  getDatos(colleccion){
    try {
      return this.fire.collection(colleccion).snapshotChanges();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  /* getDatos2(colleccion){
    try {
      this.fire.collection(colleccion).snapshotChanges().subscribe(
        data => {
          this.datos = [];
          for(let d of data){
            this.datos.push(d.payload.doc.data());
          }
        }
      );
    } catch (error) {
      console.log('ERROR: ', error)
    }
  } */

  eliminar(coleccion, identificador){
    try {
      this.fire.collection(coleccion).doc(identificador).delete();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  getDato(coleccion, identificador){
    try {
      return this.fire.collection(coleccion).doc(identificador).get();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  modificar(coleccion, identificador, value){
    try {
      this.fire.collection(coleccion).doc(identificador).set(value);
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }


}
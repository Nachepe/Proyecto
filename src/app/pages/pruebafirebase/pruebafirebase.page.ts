import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-pruebafirebase',
  templateUrl: './pruebafirebase.page.html',
  styleUrls: ['./pruebafirebase.page.scss'],
})
export class PruebafirebasePage implements OnInit {
 //variables de pruebas unitarias:
 v_agregar: boolean = false;

 //variable:
 usuario = new FormGroup({
   id: new FormControl(''),
   rut: new FormControl('',[Validators.required]),
   nombre: new FormControl('',[Validators.required, Validators.minLength(3)])
 });
 usuarios: any[] = [];

 constructor(private fireService: FireService) {}

 ngOnInit(){
   this.listar();
 }

 //métodos del crud:
 agregar(){
   this.fireService.agregar('usuarios', this.usuario.value);
   this.v_agregar = true;
 }

 listar(){
   this.fireService.getDatos('usuarios').subscribe(
     (data:any) => {
       this.usuarios = [];
       for(let u of data){
         let usuarioJson = u.payload.doc.data();
         usuarioJson['id'] = u.payload.doc.id;
         this.usuarios.push(usuarioJson);
         //console.log(u.payload.doc.data());
       }
     }
   );
 }

 eliminar(id){
   this.fireService.eliminar('usuarios', id);
 }

 buscar(id){
   let usuarioEncontrado = this.fireService.getDato('usuarios', id);
   usuarioEncontrado.subscribe(
     (response: any) => {
       //console.log(response.data());
       let usu = response.data();
       usu['id'] = response.id;
       //console.log(usu);

       this.usuario.setValue( usu );
     }
   );
 }

 modificar(){
   let id = this.usuario.controls.id.value;
   let usuModificado = {
     rut: this.usuario.controls.rut.value,
     nombre: this.usuario.controls.nombre.value
   }
   
   //this.usuario.removeControl('id')
   //console.log(this.usuario.value)
   
   this.fireService.modificar('usuarios', id, usuModificado);
   this.usuario.reset();
 }


 login(correo, clave): boolean{
   for(let u of this.usuarios){
     if(u.correo == correo && u.clave == clave){
       return true;
     }
   }
   return false;
 }

}

import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FireService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuarios: any[] = [];

  //vamos a crear las variables necesarias:
  mail: string;
  password: string;

  KEY_USUARIOS = 'usuarios'; 

  constructor(private toastController: ToastController,
                  private router: Router, 
                  private menuCrl:MenuController,
                  private storage : StorageService,
                  private fireService: FireService) { }

  async ngOnInit() {

  this.listar();
     /* var admin = {
      rut: '11111111-1',
      nom: 'Satan',
      ape: 'Lucifer',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Administrador',
      email: 'administrador@admin.cl'
    }; */
    /* var profe = {
      rut: '11111111-3',
      nom: 'Alan',
      ape: 'Gajardo',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Docente',
      email: 'benja@duoc.cl'
    };
    var alumno ={
      rut: '20417394-K',
      nom: 'Roberto',
      ape: 'Gracias',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Alumno',
      email: 'alumno@duoc.cl'
    };
    var alumno2 ={
      rut: '18740127-5',
      nom: 'Nachito',
      ape: 'Nachio',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Alumno',
      email: 'nacho@duoc.cl'
    }; 
    await this.storage.agregar(this.KEY_USUARIOS, admin);
    await this.storage.agregar(this.KEY_USUARIOS, profe);
    await this.storage.agregar(this.KEY_USUARIOS, alumno);
    await this.storage.agregar(this.KEY_USUARIOS, alumno2);  */

   

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

  //método para ingresar a home:
  async login(){



    var log = this.usuarios.find(usuario => usuario.email == this.mail);
    if(log != undefined){
      if(log.password == this.password){
        let navigationExtras : NavigationExtras ={
          state:{
            usuariolog: log
          }
        };
     
        //para enviar el dato que esta cargado
        await this.storage.agregar(this.KEY_USUARIOS, log);
        this.router.navigate(['/tabs/perfil/'+log.rut],navigationExtras);
        
      }

      }else{
        this.tostadaError();
      }  
    

   
    /* var usuarioLogin: any;
  

    usuarioLogin = await  this.storage.validarEmailPassword(this.mail, this.password,this.KEY_USUARIOS);  
    
    
     //validar que al ingresar admin admin en el formulario, me diga hola:
    if (usuarioLogin != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: usuarioLogin
        }
      };
   
      //para enviar el dato que esta cargado
      
      this.router.navigate(['/tabs/perfil/'+usuarioLogin.rut],navigationExtras);
      
    }else{
      this.tostadaError();
    }  */
  }




  toggleMenu(){

    this.menuCrl.toggle();
  }
  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos!!!',
      duration: 3000
    });
    toast.present();
  }

  




}

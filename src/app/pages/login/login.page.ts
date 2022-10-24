import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //vamos a crear las variables necesarias:
  mail: string;
  password: string;

  KEY_USUARIOS = 'usuarios'; 

  constructor(private toastController: ToastController,
                  private router: Router, 
                  private menuCrl:MenuController,
                  private storage : StorageService) { }

  async ngOnInit() {
    var admin = {
      rut: '11111111-1',
      nom: 'Satan',
      ape: 'Lucifer',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Administrador',
      email: 'administrador@admin.cl'
    };
    var profe = {
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
    await this.storage.agregar(this.KEY_USUARIOS, admin);
    await this.storage.agregar(this.KEY_USUARIOS, profe);
    await this.storage.agregar(this.KEY_USUARIOS, alumno);

  }

  //método para ingresar a home:
  async login(){
    var usuarioLogin: any;
  

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
    } 
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

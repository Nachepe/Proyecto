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

  ngOnInit() {
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
      this.router.navigate(['/home/'],navigationExtras);
      
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

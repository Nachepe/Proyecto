import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //vamos a crear las variables necesarias:
  mail: string;
  user: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService,private menuCrl:MenuController) { }

  ngOnInit() {
  }

  //método para ingresar a home:
  login(){
    var usuarioLogin = this.usuarioService.validarEmailPassword(this.mail, this.password);
    console.log(usuarioLogin);
    //validar que al ingresar admin admin en el formulario, me diga hola:
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'administrador'){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/alumno']);
      }
      
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

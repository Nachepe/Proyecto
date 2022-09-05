import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  email: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  recuperar(){
    var usuarioR= this.usuarioService.validarEmail(this.email);
    
    //validar que al ingresar admin admin en el formulario, me diga hola:
    if (usuarioR != undefined) {
      this.tostadaRecuperar();
    }else{
      this.tostadaErrorU();
    }
  }

  async tostadaErrorU() {
    const toast = await this.toastController.create({
      message: 'Email no existe',
      duration: 3000
    });
    toast.present();
  }

  async tostadaRecuperar() {
    const toast = await this.toastController.create({
      message: 'Un correo ha sido enviado para cambiar tu contraseña',
      duration: 3000
    });
    toast.present();
  }
}

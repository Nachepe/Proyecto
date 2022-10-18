import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  email: string;
  KEY_USUARIOS = 'usuarios'

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService,
    private storage: StorageService) { }

  ngOnInit() {
  }

  async recuperar(){
    var usuarioR= await this.storage.getDatologin(this.KEY_USUARIOS,this.email);
    console.log(usuarioR)
    
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

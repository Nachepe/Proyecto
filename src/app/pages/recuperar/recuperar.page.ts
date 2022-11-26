import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fireservice.service';
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
  usuarios: any[] = [];

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UsuarioService,
    private storage: StorageService,
    private fireService:FireService) { }

  ngOnInit() {
    this.listar();

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

  async recuperar(){

   

    var usuarioR= this.usuarios.find(usuario => usuario.email == this.email);

    
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import { ToastController } from '@ionic/angular';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { StorageService } from 'src/app/services/storage.service';
import { FireService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  usuario = new FormGroup({
   /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
    rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nom : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    ape : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('Alumno'),
    email : new FormControl ('',[Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc']+(\.cl)$/), Validators.email]),])
  });
  usuarios: any[] = [];

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  //usuarios: any[] = [];
  verificar_password: string;
  
  KEY_USUARIOS = 'usuarios';  
  constructor(private storage: StorageService,
                 private router: Router,
                private validaciones:ValidacionesService,
                private toast :ToastController,
                private fireService : FireService) { }

  ngOnInit() {
    //this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  
  async registrar(){

    //validacion de rut valido
    if(!this.validaciones.validarRut(this.usuario.controls.rut.value)){
      alert('rut incorrecto!');
      return;
    }

    //validar edad
    if(!this.validaciones.validarEdadMinima(17,this.usuario.controls.fecha_nac.value)){
      alert('no cumple la edad minima');
      return;
    }



    if (this.usuario.controls.password.value != this.verificar_password) {
      this.tostada('¡Contraseñas no coinciden!')
      return;
    }


    var enc = this.obtenerUsuario(this.usuario.value.rut)

    

    if(enc == undefined){
      this.fireService.agregar('usuarios',this.usuario.value)
      this.tostada('¡Usuario Registrado con exito!')
      await this.cargarUsuarios();
      this.usuario.reset();
      this.verificar_password = '';

    }else{
      this.tostada('¡Usuario ya existe!')     
    }

  }


  //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
  async cargarUsuarios(){
    /* this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS); */
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
  obtenerUsuario(rut) {
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  async tostada(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

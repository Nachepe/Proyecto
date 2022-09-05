import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { RutComponent, RutService } from 'rut-chileno';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  
  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
     rut: new FormControl('', [Validators.required, this.rutService.validaRutForm,Validators.maxLength(10)]),
     nom : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     ape : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     fecha_nac: new FormControl('', Validators.required),
     semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
     tipo_usuario: new FormControl('Alumno'),
     email : new FormControl ('',[Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/), Validators.email]),])
   });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;

  handlerMessage = '';
  roleMessage = '';

  constructor(private usuarioService: UsuarioService,
               private menuCtrl : MenuController,
               private rutService : RutService,
               private toast :ToastController,
               private alertController: AlertController) {}

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.tostada('¡Contraseñas no coinciden!')
      return;
    }


    var registrado : boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if(!registrado){
      this.tostada('¡Usuario ya existe!')
      return
    }
    this.tostada('¡Alumno registrado correctamente!');
    this.alumno.reset();
    this.verificar_password = '';
  }

  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
    this.toggleMenu();
  }

  modificar(){
    this.usuarioService.modificarUsuario(this.alumno.value);
    this.limpiar();
    this.tostada('Usuario Modificado Correctamente');
    this.toggleMenu();
    //console.log(this.alumno.value)
  }

  limpiar(){
    this.alumno.reset();
    this.verificar_password = '';
  }
  toggleMenu(){
    this.menuCtrl.toggle('end');
  }

  agregar(){
    this.limpiar();
    this.toggleMenu();
  }
  async tostada(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  async borra(rutEliminar) {
    const alert = await this.alertController.create({
      header: '¡Atencion!',
      subHeader: 'Esta a punto de eliminar al usuario',
      message: '¿Estas seguro?',
      buttons: [
        {
          text: 'si',
          role: 'si',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'No',
          role: 'no',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });
    

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if(role =='no'){
      return
    }
    
    else if(role =='si'){
      this.eliminar(rutEliminar);
    }
    
  }
}


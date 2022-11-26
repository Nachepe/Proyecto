import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';

import { FireService } from 'src/app/services/fireservice.service';
import { StorageService } from 'src/app/services/storage.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  //variable para pruebas unitarias
  v_agregar: boolean = false;
  
  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  usuario = new FormGroup({
    /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
     id: new FormControl(''),
     rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
     nom : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     ape : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     fecha_nac: new FormControl('', Validators.required),
     semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
     tipo_usuario: new FormControl('Alumno'),
     email : new FormControl ('',[Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc']+(\.cl)$/), Validators.email]),])
   });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  standalone = {
    standalone : true
  };

  usuarios: any[] = [];
  verificar_password: string;
  usuariolog: any[]=[];

  handlerMessage = '';
  roleMessage = '';
  KEY_USUARIOS = 'usuarios';  

  constructor(private usuarioService: UsuarioService,
              private loadingCtrl: LoadingController,
              private storage:StorageService,
              private route: ActivatedRoute,
              private router:Router,
               private menuCtrl : MenuController,
                private validaciones: ValidacionesService,
               private toast :ToastController,
               private alertController: AlertController,
               private fireService:FireService) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
                  }
                });     
              }

  async ngOnInit() {
    await this.cargarUsuarios();
   
  }

  //método del formulario
/*   registrar(){

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


    var registrado : boolean = this.usuarioService.agregarUsuario(this.usuario.value);
    if(!registrado){
      this.tostada('¡Usuario ya existe!')
      return
    }
    this.tostada('¡Alumno registrado correctamente!');
    this.usuario.reset();
    this.verificar_password = '';
  } */
  obtenerUsuario(rut) {
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  async registrar2(){

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
      this.menuCtrl.toggle();

    }else{
      this.tostada('¡Usuario ya existe!')     
    }

    /* 
    var respuesta: boolean = await this.storage.agregar(this.KEY_USUARIOS, this.usuario.value);

    if(!respuesta){
      this.tostada('¡Usuario ya existe!')
      this.usuario.reset();
      this.verificar_password = '';
      return
    }
    if (respuesta) {
      this.tostada('¡Usuario Registrado con exito!')
      await this.cargarUsuarios();
    }
    this.usuario.reset();
    this.verificar_password = ''; */
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

  async eliminar(id){
    /*METODO DE STORAGE */
    /* await this.storage.eliminar(this.KEY_USUARIOS, rut); */

/*METODO DE FIREBASE */
    
    this.fireService.eliminar('usuarios', id);

    await this.cargando('eliminando...');
    await this.cargarUsuarios();
  }
  /* eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  } */

 async buscar(id){
    /* var alumnoEncontrado = await this.storage.getDato(this.KEY_USUARIOS, rutBuscar); */
    let alumnoEncontrado = this.fireService.getDato('usuarios', id);
    alumnoEncontrado.subscribe(
      (response: any) => {
        //console.log(response.data());
        let usu = response.data();
        usu['id'] = response.id;
        //console.log(usu);
        this.usuario.setValue( usu );
        this.verificar_password=usu.password
        
      }
    );
   
    this.toggleMenu();
  }

  async modificar(){

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


    /* await this.storage.actualizar(this.KEY_USUARIOS, this.usuario.value); */

    let id = this.usuario.controls.id.value;
   let usuModificado = {
     rut: this.usuario.controls.rut.value,
     nom: this.usuario.controls.nom.value,
     ape: this.usuario.controls.ape.value,
     fecha_nac: this.usuario.controls.fecha_nac.value,
     semestre :this.usuario.controls.semestre.value,
     password:this.usuario.controls.password.value,
     tipo_usuario:this.usuario.controls.tipo_usuario.value,
     email:this.usuario.controls.email.value
   }
   this.fireService.modificar('usuarios', id, usuModificado);



    await this.cargando('actualizando Usuario...');
    await this.cargarUsuarios();
    
    this.limpiar();
    this.tostada('Usuario modificado correctamente');
    this.toggleMenu();
    //console.log(this.alumno.value)
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }
  toggleMenu(){
    this.menuCtrl.toggle('end');
  }

  agregar2(){
    this.fireService.agregar('usuarios',this.usuario.value);
    this.v_agregar = true;
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
      header: '¡Atención!',
      subHeader: 'Está a punto de eliminar al usuario.',
      message: '¿Está seguro?',
      buttons: [
        {
          text: 'sí',
          role: 'si',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'no',
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

   //METODO DE LOADING:
   async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }
}


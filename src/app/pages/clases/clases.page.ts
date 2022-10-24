import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  
  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  clase = new FormGroup({
    /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
     cod: new FormControl('',[Validators.required]),
     nom : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
     sigla : new FormControl('', [Validators.required]),
     semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
     profe: new FormControl('', [Validators.required]),
     modalidad : new FormControl ('',[Validators.required])
   });

   usuarios: any;
  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  clases: any[] = [];
  usuariolog: any = {};

  handlerMessage = '';
  roleMessage = '';
  KEY_CLASES = 'clases';  
  KEY_USUARIOS = 'usuarios'; 
  rut: any;
  

  constructor(private alertcontroller: AlertController,
              private loadingCtrl: LoadingController,
              private storage:StorageService,
              private route: ActivatedRoute,
              private router:Router,
               private menuCtrl : MenuController,
               private toast :ToastController,
               ) {
                 /* this.route.queryParams.subscribe(params => {
        
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
                  }
                  
                });   */
              }

  async ngOnInit() {
    await this.cargarClases(); 
    await this.cargarPersonas(); 

    this.rut = this.route.snapshot.paramMap.get('rut');
    console.log(this.rut);
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut);
    console.log(this.usuariolog);
    /* console.log(this.router.getCurrentNavigation().extras.state.usuariolog) */
     /* this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;  */
  }

  //método del formulario

  prueba(){
    this.usuariolog=this.usuariolog;
    console.log(this.usuariolog)
  }



  async registrar2(){
    
    console.log(this.clase.value)
     var respuesta: boolean = await this.storage.agregarClase(this.KEY_CLASES, this.clase.value);

    if(!respuesta){
      this.tostada('¡Clase ya existe!')
       this.clase.reset() ;
      return
    }
    if (respuesta) {
      this.tostada('¡Clase Registrada con exito!')
      await this.cargarClases();
    }
    this.clase.reset();
    this.toggleMenu();
     
  }
  //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
  async cargarClases(){
    this.clases = await this.storage.getDatos(this.KEY_CLASES);
  }
  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos('usuarios');
  }

   async eliminar(cod){
    await this.storage.eliminarClase(this.KEY_CLASES, cod);
    await this.cargando('eliminando...');
    await this.cargarClases();
  } 


  async buscar(codBuscar){
    var alumnoEncontrado = await this.storage.getDatoclase(this.KEY_CLASES, codBuscar);
    this.clase.setValue(alumnoEncontrado);
    this.toggleMenu();
  } 

   async modificar(){

    await this.storage.actualizar(this.KEY_CLASES, this.clase.value);
    await this.cargando('actualizando Clases...');
     await this.cargarClases();
    
    this.limpiar();
    this.tostada('Clase modificada correctamente');
    this.toggleMenu();
    //console.log(this.alumno.value)
  } 

    limpiar(){
    this.clase.reset();
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


   async borra(codEliminar) {
    const alert = await this.alertcontroller.create({
      header: '¡Atención!',
      subHeader: 'Está a punto de eliminar la clase.',
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
      this.eliminar(codEliminar);
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


   goQr(codigoClase){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog,
          codclase: codigoClase
        }
      };
   
      var datosClase = {
        usuariolog: this.usuariolog,
        codclase: codigoClase
      }

      console.log(datosClase);

      let prueba = JSON.stringify(datosClase);

      console.log(prueba);

      let prueba2 = JSON.parse(prueba);

      console.log(prueba2);
      //para enviar el dato que esta cargado
       //this.router.navigate(['/tabs/qr/'+this.usuariolog.rut],navigationExtras); 


      this.router.navigate(['/tabs/qr/'+ prueba],navigationExtras); 
      
      
    }

  }  

  
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fireservice.service';
import { StorageService } from 'src/app/services/storage.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  v_agregar: boolean = false;

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  clase = new FormGroup({
    /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
    id: new FormControl(''),
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
               private fireService: FireService
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
   
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut);
    
    /* console.log(this.router.getCurrentNavigation().extras.state.usuariolog) */
     /* this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;  */
  }

  //método del formulario
  async registrar2(){

   this.fireService.agregar('clases', this.clase.value);
   
    
   /*  console.log(this.clase.value)
     var respuesta: boolean = await this.storage.agregarClase(this.KEY_CLASES, this.clase.value);

    if(!respuesta){
      this.tostada('¡Clase ya existe!')
       this.clase.reset() ;
      return
    }
    if (respuesta) {
      this.tostada('¡Clase Registrada con exito!')
      await this.cargarClases();
    }*/
    this.clase.reset();
    this.toggleMenu(); 
     
  }
  //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
  async cargarClases(){
    //this.clases = await this.storage.getDatos(this.KEY_CLASES);
    this.fireService.getDatos('clases').subscribe(
      (data:any) => {
        this.clases = [];
        for(let c of data){
          let claseJson = c.payload.doc.data();
          claseJson['id'] = c.payload.doc.id;
          this.clases.push(claseJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }
  async cargarPersonas(){
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
    this.fireService.eliminar('clases', id);
    //await this.storage.eliminarClase(this.KEY_CLASES, cod);
    await this.cargando('eliminando...');
    await this.cargarClases();
  } 

  agregar2(){
    this.fireService.agregar('clase',this.clase.value);
    this.v_agregar = true;
  }

  async buscar(id){

    let claseEncontrado = this.fireService.getDato('clases', id);
    claseEncontrado.subscribe(
      (response: any) => {
        //console.log(response.data());
        let cla = response.data();
        cla['id'] = response.id;
        //console.log(usu);
 
        this.clase.setValue( cla );
      }
    );
    
    this.toggleMenu();
  } 

   async modificar(){

    let id = this.clase.controls.id.value;
   let claModificado = {
    cod: this.clase.controls.cod.value,
    nom : this.clase.controls.nom.value,
    sigla : this.clase.controls.sigla.value ,
    semestre: this.clase.controls.semestre.value,
    profe: this.clase.controls.profe.value,
    modalidad : this.clase.controls.modalidad.value
   }
   this.fireService.modificar('clases', id, claModificado);
   this.clase.reset();
   //this.usuario.removeControl('id')
   //console.log(this.usuario.value)
   
  /*  this.fireService.modificar('usuarios', id, usuModificado);
   this.usuario.reset(); */




    //await this.storage.actualizar(this.KEY_CLASES, this.clase.value);
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

     

      let prueba = JSON.stringify(datosClase);

      

      let prueba2 = JSON.parse(prueba);

     
      //para enviar el dato que esta cargado
       //this.router.navigate(['/tabs/qr/'+this.usuariolog.rut],navigationExtras); 


      this.router.navigate(['/tabs/qr/'+ prueba],navigationExtras); 
      
      
    }

  }  

  
}

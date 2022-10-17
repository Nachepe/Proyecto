import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  elementType = 'canvas';
  value = '';

   //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
     asistencia = new FormGroup({
          cod_asis : new FormControl(''),
          cod_clase: new FormControl(''),
          alumnos : new FormControl([])
     });  

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  clases: any[] = [];
  codclase: any;
  datos: any[] = [];
  usuariolog: any;
  xd = '';
  handlerMessage = '';
  roleMessage = '';
  KEY_ASISTENCIA = 'asistencia';  
     tomaqr: any;
  isDisabled: boolean = false;
  constructor(private storage: StorageService,private router:Router,
              private route:ActivatedRoute,
              private toast:ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
        this.codclase=  this.router.getCurrentNavigation().extras.state.codclase;
      }
    });     
  }

  ngOnInit() {
  }

  //método para generar un código unico para el codigo QR:
  generarCodigo(){
    if (this.value == '') {
      this.value = v4();
      this.xd = this.value;
      this.isDisabled = true;
      console.log(this.isDisabled)
    }
  }
  async prueba(){
    /* var xd = this.storage.agregar(this.value); */
    this.asistencia.value.cod_asis = this.xd;
    this.asistencia.value.cod_clase = this.codclase;
    var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asistencia.value); 
   
     if(!respuesta){
      this.tostada('¡Clase ya existe!')
       
      return
    }
    if (respuesta) {
      this.tostada('¡Clase Registrada con exito!')
      
    }
     
     
    
  }
  async marcarAsistencia(){

    this.datos.push(this.usuariolog.rut);
    this.datos.push(this.tomaqr);
    var prueba = await this.storage.asistir(this.KEY_ASISTENCIA,this.datos);
    if(prueba == true){
      this.tostada('Asistencia marcada con exito')

    }else{
      this.tostada('Usted ya esta presente en esta clase')
    }
   
    /* this.storage.asistir(this.KEY_ASISTENCIA,'hola'); */
  }

  irAdmin(){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog
        }
      };
   
      //para enviar el dato que esta cargado
      this.router.navigate(['/admin/'],navigationExtras);
      
    }
  }

  irHome(){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog
        }
      };
   
      //para enviar el dato que esta cargado
      this.router.navigate(['/home/'],navigationExtras);
      
    }
  }
  irClases(){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog
        }
      };
   
      //para enviar el dato que esta cargado
      this.router.navigate(['/clases/'],navigationExtras);
      
    }
  }

  irPerfil(){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog
        }
      };
   
      //para enviar el dato que esta cargado
      this.router.navigate(['/perfil/'],navigationExtras);
      
    }
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

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
  codclase: any=0;
  datos: any[] = [];
  usuariolog: any ={};
  userprueba:any;
  xd = '';
  handlerMessage = '';
  roleMessage = '';
  KEY_ASISTENCIA = 'asistencia'; 
  KEY_USUARIOS = 'usuarios';  
     tomaqr: any;
  isDisabled: boolean = false;
  rut: string;
  constructor(private storage: StorageService,private router:Router,
              private route:ActivatedRoute,
              private toast:ToastController) {
    /*  this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
        this.codclase=  this.router.getCurrentNavigation().extras.state.codclase;
      }
    });  */   
    

  }

  async ngOnInit() {
    //this.rut = this.route.snapshot.paramMap.get('rut');
    let datos = this.route.snapshot.paramMap.get('rut');
    let datosJson = JSON.parse(datos);
    this.rut = datosJson.usuariolog.rut;
    this.codclase = datosJson.codclase;
    //console.log(this.router.getCurrentNavigation().extras.state.codclase);
  
    
    
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut)

    

   
    
    
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
  
  async tostada(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { BehaviorSubject } from 'rxjs';
import { FireService } from 'src/app/services/fireservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  
  value = '';
  elementType = NgxQrcodeElementTypes.CANVAS;

  v_agregar: boolean = false;

   //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
     asistencia = new FormGroup({
          id : new FormControl(''),
          cod_asis : new FormControl(''),
          cod_clase: new FormControl(''),
          alumnos : new FormControl([])
     });  

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  clases: any[] = [];
  asistencias: any[] = [];
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
  isDisabled2: boolean = false;
  rut: string;
  constructor(private storage: StorageService,private router:Router,
              private route:ActivatedRoute,
              private toast:ToastController,
              private fireService:FireService) {
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
    this.listar();



  
    
    
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut)

    

   
    
    
  }

  //método para generar un código unico para el codigo QR:


  agregar2(){
    this.fireService.agregar('usuarios',this.asistencia.value);
    this.v_agregar = true;
  }

  generarCodigo(){
    
    
     if (this.value == '') {
      this.value = v4();
      this.xd = this.value;
      this.isDisabled = true;
      this.isDisabled2 = true;
      
    } 
  }

  listar(){
    this.fireService.getDatos('asistencia').subscribe(
      (data:any) => {
        this.asistencias = [];
        for(let a of data){
          let asistenciaJson = a.payload.doc.data();
          asistenciaJson['id'] = a.payload.doc.id;
          this.asistencias.push(asistenciaJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }

  async prueba(){
    /* var xd = this.storage.agregar(this.value); */
    this.asistencia.value.cod_asis = this.xd;
    this.asistencia.value.cod_clase = this.codclase;
    await this.listar();


    //this.fireService.agregar('asistencia', this.asistencia.value);

    var enc = this.obtenerAsis(this.asistencia.value.cod_clase)
    

    if(enc == undefined){
      this.fireService.agregar('asistencia',this.asistencia.value)
      this.tostada('Asistencia Registrada con exito!')
      await this.listar();
      this.asistencia.reset();
      if(this.isDisabled2 == true){
        this.isDisabled2= false;
      }
      
    }else{
      this.tostada('¡Usuario ya existe!')     
    } 



    /* 
    var respuesta: boolean = await this.storage.agregarAsistencia(this.KEY_ASISTENCIA, this.asistencia.value); 
   
     if(!respuesta){
      this.tostada('¡Clase ya existe!')
       
      return
    }
    if (respuesta) {
      this.tostada('¡Clase Registrada con exito!')
      
    }
      */
     
    
  }
  
  obtenerAsis(cod_asis) {

    
    return this.asistencias.find(asistencia => asistencia.cod_asis == cod_asis);
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fireservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  v_agregar: boolean = false;

//VAMOS A CREAR EL GRUPO DEL FORMULARIO:
asistencia = new FormGroup({
  id : new FormControl(''),
  cod_asis : new FormControl(''),
  cod_clase: new FormControl(''),
  alumnos : new FormControl([])
});  
asistencias : any=[];
  usuariolog : any=[];
  datos: any[] = [];
  KEY_ASISTENCIA = 'asistencia'; 
  KEY_USUARIOS = 'usuarios';  
  rut: any;
  isDisabled = true

  tomaqr: any;
  constructor(private storage:StorageService,
              private toast:ToastController,
              private route :ActivatedRoute,
              private fireService :FireService) { }

 async  ngOnInit(){
    this.listar()
    this.rut = this.route.snapshot.paramMap.get('rut');
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut)
  }

  listar(){
    this.fireService.getDatos('asistencia').subscribe(
      (data:any) => {
        this.asistencias = [];
        for(let a of data){
          let asiJson = a.payload.doc.data();
          asiJson['id'] = a.payload.doc.id;
          this.asistencias.push(asiJson);
          //console.log(u.payload.doc.data());
        }
      }
    );
  }

  obtenerAsis(cod_asis) {
    return this.asistencias.find(asistencia => asistencia.cod_asis == cod_asis);
  }

  obtenerAlumn(rut) {
    return this.asistencias.alumnos.findIndex(alumnos => alumnos == rut);
  }

  async marcarAsistencia(){
    
    



    var etc = this.obtenerAsis(this.tomaqr);
    if(etc != undefined){
      
      

      var mostrar =etc.alumnos.find(x => x ==this.usuariolog.rut)
      
      if( mostrar == undefined){
          this.datos= etc.alumnos;
          this.datos.push(this.usuariolog.rut);

          let id = etc.id;
          let asisMod = {
            id : etc.id,
            cod_asis : etc.cod_asis,
            cod_clase: etc.cod_clase,
            alumnos : this.datos
          }
          this.fireService.modificar('asistencia', id, asisMod);
          this.isDisabled=false;
          this.tostada("Asistencia marcada con Exito")

      }else{
        this.tostada("Ya estas presente en esta clase")
      }

    }

    
   /*  
     */
    

    /* this.fireService.agregar('asistencia', this.datos); */
    
    /* var asistir = await this.storage.asistir(this.KEY_ASISTENCIA,this.datos);

    
    if(asistir == 2){
      this.tostada('Asistencia marcada con exito')

    }else if(asistir == 1){
      this.tostada('Usted ya esta presente en esta clase')
    }else if(asistir == -1){
      this.tostada('Esta clase no existe')
    } */
   
  
  }

  agregar2(){
    this.fireService.agregar('usuarios',this.asistencia.value);
    this.v_agregar = true;
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

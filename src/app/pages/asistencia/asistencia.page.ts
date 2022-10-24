import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  usuariolog : any=[];
  datos: any[] = [];
  KEY_ASISTENCIA = 'asistencia'; 
  KEY_USUARIOS = 'usuarios';  
  rut: any;

  tomaqr: any;
  constructor(private storage:StorageService,
              private toast:ToastController,
              private route :ActivatedRoute) { }

 async  ngOnInit(){

    this.rut = this.route.snapshot.paramMap.get('rut');
    this.usuariolog= await this.storage.getDato(this.KEY_USUARIOS,this.rut)
  }

  async marcarAsistencia(){
    this.datos= [];
    this.datos.push(this.usuariolog.rut);
    this.datos.push(this.tomaqr);

    console.log(this.datos)
    
    var asistir = await this.storage.asistir(this.KEY_ASISTENCIA,this.datos);

    
    if(asistir == 2){
      this.tostada('Asistencia marcada con exito')

    }else if(asistir == 1){
      this.tostada('Usted ya esta presente en esta clase')
    }else if(asistir == -1){
      this.tostada('Esta clase no existe')
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

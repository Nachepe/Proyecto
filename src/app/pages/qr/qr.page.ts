import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  codclase: any[] = [];

  usuariolog: any[]=[];
  xd = '';
  handlerMessage = '';
  roleMessage = '';
  KEY_CLASES = '';  

  isDisabled: boolean = false;
  constructor(private storage: StorageService,private router:Router,
              private route:ActivatedRoute) {
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
  prueba(){
    /* var xd = this.storage.agregar(this.value); */
    console.log(this.usuariolog);
    
    console.log(this.xd);
  }
}

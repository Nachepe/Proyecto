import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
   /*  clase = new FormGroup({
     rut_profe: new FormControl(''),
     sigla : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     fecha: new FormControl('', Validators.required),
     seccion : new FormControl('',
     
     Validators.required)
   });  */

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  clases: any[] = [];
  
  usuariolog: any[]=[];
  xd: any[]=[]
  handlerMessage = '';
  roleMessage = '';
  KEY_CLASES = '';  

  constructor(private storage: StorageService,private router:Router,
              private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
      }
    });     
  }

  ngOnInit() {
  }

  //método para generar un código unico para el codigo QR:
  generarCodigo(){
    if (this.value == '') {
      this.value = v4();
    }
  }
  prueba(){
    /* var xd = this.storage.agregar(this.value); */
    console.log(this.usuariolog);
    this.xd.push(this.usuariolog);
    console.log(this.xd);
  }
}

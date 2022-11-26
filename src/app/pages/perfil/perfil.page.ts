import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  usuariolog: any=[];
  rut: string;

  constructor(private router: Router,
    private route: ActivatedRoute,) {
   /*  this.route.queryParams.subscribe(params => {
        
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
      }
      
    });      */
  }

  ngOnInit() {
    this.rut = this.route.snapshot.paramMap.get('rut');
   
    this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
  }

  /* irAdmin(){
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

  irQr(){
    if (this.usuariolog != undefined) {
      let navigationExtras : NavigationExtras ={
        state:{
          usuariolog: this.usuariolog
        }
      };
   
      //para enviar el dato que esta cargado
      this.router.navigate(['/qr/'],navigationExtras);
      
    }
  } */

}

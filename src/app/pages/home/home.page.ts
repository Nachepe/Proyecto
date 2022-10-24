import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

usuario: any;
usuariolog: any[]=[];
rut: string;
  constructor(   private router: Router,
               private route: ActivatedRoute,
                private usuarioService: UsuarioService,
                private storage : StorageService) {
                  this.route.queryParams.subscribe(params => {
                      
                    if (this.router.getCurrentNavigation().extras.state) {
                      this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
                    }
                    
                  });     
                }
  ngOnInit() {


  }


  logout(){
    this.usuarioService.logout();
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
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

usuario: any;
usuariolog: any[]=[];

  constructor(   private router: Router,
               private route: ActivatedRoute,
                private usuarioService: UsuarioService) {
                  this.route.queryParams.subscribe(params => {
                      
                    if (this.router.getCurrentNavigation().extras.state) {
                      this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
                    }
                    
                  });     
                }
  ngOnInit() {
    /* this.usuario = this.router.getCurrentNavigation().extras.state.usuario; */
  }

  logout(){
    this.usuarioService.logout();
  }
  prueba(){
    console.log(this.usuariolog)
  }
}

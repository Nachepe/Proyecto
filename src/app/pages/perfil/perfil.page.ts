import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  usuariolog: any[]=[];
  constructor(private router: Router,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
        
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
      }
      
    });     
  }

  ngOnInit() {
  }

}

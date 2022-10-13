import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  usuariolog: any[]=[];

  constructor(private route: ActivatedRoute,
    private router:Router) {
      
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
      }
    });     
  }

  ngOnInit() {}

}

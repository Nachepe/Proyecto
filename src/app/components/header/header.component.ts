import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: String;
  usuariolog: any[]=[];
  constructor(private menuCtrl:MenuController,
              private route: ActivatedRoute,
              private router:Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
      }
    });     
  }

  ngOnInit() {}

  toggleMenu(){
    this.menuCtrl.toggle();
  }
}

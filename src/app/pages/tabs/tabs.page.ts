import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
usuariolog:any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usuariolog= this.router.getCurrentNavigation().extras.state.usuariolog;
   
    
  }

}

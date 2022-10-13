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
      
     
  }

  ngOnInit() {}

}

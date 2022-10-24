import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

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
              private router:Router,
              private storage:StorageService) {
    
  }

  ngOnInit() {}

  toggleMenu(){
    this.menuCtrl.toggle();
  }
  logOut(){
    this.storage.logout(); 
  }
}

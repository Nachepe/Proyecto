import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  public digi: any[] = []

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getDigi()
  }
  getDigi() {
    this.api.getDigi().subscribe((data: any) => this.digi = data)
   }
  

}

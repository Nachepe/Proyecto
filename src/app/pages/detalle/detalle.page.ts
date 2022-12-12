import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id: number = 0;
  pokemons: any[] = [];
  pokemons2: any[] = [];
  pokemon: any = {};

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { } 

  ngOnInit() {
    
  }
  }




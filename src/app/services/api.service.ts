import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDigi(){
    return this.http.get('https://digimon-api.vercel.app/api/digimon')
  }

  /* getPokemon(id){
    return this.http.get('https://pokeapi.co/api/v2/pokemon' + '/' + id)
  }

  getInfo(url){
    return this.http.get(url);
  } */
 
}

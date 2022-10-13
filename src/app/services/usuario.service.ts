import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables necesarias para el trabajo del CRUD:
  usuarios: any[] = [
    {
      rut: '11111111-1',
      nom: 'Satan',
      ape: 'Lucifer',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'admin123',
      tipo_usuario: 'Administrador',
      email: 'admin@admin.cl'
    },
    {
      rut: '20417394-K',
      nom: 'Roberto',
      ape: 'Gracias',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Alumno',
      email: 'alumno@duoc.cl'
    },
    {
      rut: '11111111-3',
      nom: 'Alan',
      ape: 'Gajardo',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Docente',
      email: 'profesor@profesor.duoc.cl'
    }
  ];

//VARIABLE DE ESTADO DE LOGIN
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router:Router) { }

  //métodos del CRUD:
  agregarUsuario(usuario): boolean {

    if (this.obtenerUsuario(usuario.rut) == undefined && this.obtenerUsuarioEmail(usuario.email) == undefined ) {
      this.usuarios.push(usuario);

      return true;

    }
    return false
  }


  eliminarUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  modificarUsuario(usuario) {
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut) {
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarioEmail(email) {
    return this.usuarios.find(usuario => usuario.email == email);
  }
  obtenerUsuarios() {
    return this.usuarios;
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario

  getAuth(){
    return this.isAuthenticated.value;
  }
  
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validarRutPassword(rut, pass) {
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarEmailPassword(email, pass) {
    var usuLogin: any;
    usuLogin = this.usuarios.find(u => u.email == email && u.password == pass);
    if(usuLogin !=undefined){
      this.isAuthenticated.next(true);
      return usuLogin;
    }
  }

  validarEmail(email){
    return this.usuarios.find(u => u.email == email);
  }
}

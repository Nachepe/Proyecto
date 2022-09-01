import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables necesarias para el trabajo del CRUD:
  usuarios: any[] = [
    {
      rut: '11.111.111-1',
      nom: 'Satan',
      ape: 'Lucifer',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'alan12',
      tipo_usuario: 'Administrador',
      email: 'admin@profesor.duoc.cl'
    },
    {
      rut: '11.111.111-2',
      nom: 'Satan',
      ape: 'Gracias',
      fecha_nac: '1990-03-24',
      semestre: 1,
      password: 'asd123',
      tipo_usuario: 'Alumno',
      email: 'alumno@duoc.cl'
    }
  ];

  constructor() { }

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
  validarRutPassword(rut, pass) {
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarEmailPassword(email, pass) {
    return this.usuarios.find(u => u.email == email && u.password == pass);
  }

  validarEmail(email){
    return this.usuarios.find(u => u.email == email);
  }
}

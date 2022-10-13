import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {

  persona = new FormGroup({
    /*  rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]), */
     rut: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
     nom : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     ape : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
     fecha_nac: new FormControl('', Validators.required),
     semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
     tipo_usuario: new FormControl('Alumno'),
     email : new FormControl ('',[Validators.compose([Validators.required, Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc']+(\.cl)$/), Validators.email]),])
   });
  //VARIABLES PARA PROBAR EL STORAGE:

  verificar_password: string;
  personas: any[] = [];

  //LLAVE:
  KEY_PERSONAS = 'personas';  

  constructor(private storage: StorageService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.cargarPersonas();
  }
  
  //CARGAR TODAS LAS PERSONAS QUE VIENEN DESDE EL STORAGE:
  async cargarPersonas(){
    this.personas = await this.storage.getDatos(this.KEY_PERSONAS);
  }

  async registrar(){
    console.log(this.persona.value)
    var respuesta: boolean = await this.storage.agregar(this.KEY_PERSONAS, this.persona.value);
    if (respuesta) {
      alert('Registrado');
      await this.cargarPersonas();
    }
  }

  async eliminar(rut){
    await this.storage.eliminar(this.KEY_PERSONAS, rut);
    await this.cargando('eliminando...');
    await this.cargarPersonas();
  }

  async buscar(rut){
    this.persona = await this.storage.getDato(this.KEY_PERSONAS, rut);
  }

  async modificar(){
    await this.storage.actualizar(this.KEY_PERSONAS, this.persona);
    await this.cargando('actualizando personas...');
    await this.cargarPersonas();
  }



  //METODO DE LOADING:
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

}

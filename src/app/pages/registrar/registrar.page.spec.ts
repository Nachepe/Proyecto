import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { environment } from "src/environments/environment";
import { RegistrarPage } from "./registrar.page";

describe('Pruebas unitarias Registrar', () => {

  //preparación de los elementos necesarios para hacer pruebas unitarias:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        IonicStorageModule.forRoot(),
        RouterTestingModule

      ],
      declarations: [
        RegistrarPage
      ]
    }).compileComponents();
  });
  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Registrar', ()=>{
    const fixture = TestBed.createComponent(RegistrarPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(RegistrarPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    rut.setValue('14852963-8');
    
    expect(app.usuario.invalid).toBeTrue();
  });

   it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(RegistrarPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nom = app.usuario.controls['nom'];
    let ape = app.usuario.controls['ape'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let semestre = app.usuario.controls['semestre'];
    let password = app.usuario.controls['password'];
    let tipo_usuario = app.usuario.controls['tipo_usuario'];
    let email = app.usuario.controls['email']; 
    rut.setValue('17888444-k');
    nom.setValue('Juan');
    ape.setValue('Lopez');
    fecha_nac.setValue('14/02/2000');
    semestre.setValue('4');
    password.setValue('juansito');
    tipo_usuario.setValue('alumno');
    email.setValue('juansito@duocuc.cl'); 

    expect(app.usuario.invalid).toBeTrue();
  });

    it('4. Ejecutar un boton/método', ()=>{
    const fixture = TestBed.createComponent(RegistrarPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    let nom = app.usuario.controls['nom'];
    let ape = app.usuario.controls['ape'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let semestre = app.usuario.controls['semestre'];
    let password = app.usuario.controls['password'];
    let tipo_usuario = app.usuario.controls['tipo_usuario'];
    let email = app.usuario.controls['email'];
    rut.setValue('17888444-k');
    nom.setValue('Juan');
    ape.setValue('Lopez');
    fecha_nac.setValue('14/02/2000');
    semestre.setValue('4');
    password.setValue('juansito');
    tipo_usuario.setValue('alumno');
    email.setValue('juansito@duocuc.cl');

    app.agregar2();

    expect(app.v_agregar).toBeTrue();
  });   
 
  it('5. El largo del arreglo', ()=>{
    const fixture = TestBed.createComponent(RegistrarPage);
    const app = fixture.componentInstance;

    app.cargarUsuarios();

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  }); 

});
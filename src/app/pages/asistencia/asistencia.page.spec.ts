import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { environment } from "src/environments/environment";
import { AsistenciaPage } from "./asistencia.page";

//creación del archivo de pruebas con su título:
describe('Pruebas unitarias Asistencia', () => {

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
        AsistenciaPage
      ]
    }).compileComponents();
  });

  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Asistencia', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;
    
    let id = app.asistencia.controls['id'];
    id.setValue('14852963-8');
    
    expect(app.asistencia.valid).toBeTrue();
  });

  it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;
    
    let id = app.asistencia.controls['id'];
    let cod_asis = app.asistencia.controls['cod_asis'];
    let cod_clase = app.asistencia.controls['cod_clase'];
    
   
    id.setValue('17888444-k');
    cod_asis.setValue('Juan');
    cod_clase.setValue('Lopez');
    


    expect(app.asistencia.valid).toBeTrue();
  });

  it('4. Ejecutar un boton/método', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;

    let rut = app.asistencia.controls['id'];
    let nom = app.asistencia.controls['cod_asis'];
    let ape = app.asistencia.controls['cod_clase'];
  
    rut.setValue('17888444-k');
    nom.setValue('Juan');
    ape.setValue('Lopez');
   

    app.agregar2();

    expect(app.v_agregar).toBeTrue();
  });

  it('5. El largo del arreglo', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;

    app.listar();

    expect(app.asistencias.length).toBeGreaterThanOrEqual(0);
  }); 

});

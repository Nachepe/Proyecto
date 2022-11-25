import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { environment } from "src/environments/environment";
import { ClasesPage } from "./clases.page";

describe('Pruebas unitarias Clases', () => {

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
        ClasesPage
      ]
    }).compileComponents();
  });
  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Clases', ()=>{
    const fixture = TestBed.createComponent(ClasesPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(ClasesPage);
    const app = fixture.componentInstance;
    
    let rut = app.clase.controls['cod'];
    rut.setValue('14852963-8');
    
    expect(app.clase.invalid).toBeTrue();
  });

    it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(ClasesPage);
    const app = fixture.componentInstance;
    
    let rut = app.clase.controls['cod'];
    let nom = app.clase.controls['nom'];
    let sigla = app.clase.controls['sigla'];
    let semestre = app.clase.controls['semestre'];
    let profe = app.clase.controls['profe'];
    let alumno = app.clase.controls['modalidad'];
    
    rut.setValue('17888444-k');
    nom.setValue('Juan');
    sigla.setValue('Lopez');
    semestre.setValue('4');
    profe.setValue('juansito');
    alumno.setValue('alumno');


    expect(app.clase.valid).toBeTrue();
  }); 

    it('4. Ejecutar un boton/método', ()=>{
    const fixture = TestBed.createComponent(ClasesPage);
    const app = fixture.componentInstance;

    let cod = app.clase.controls['cod'];
    let nom = app.clase.controls['nom'];
    let sigla = app.clase.controls['sigla'];
    let semestre = app.clase.controls['semestre'];
    let profe = app.clase.controls['profe'];
    let alumno = app.clase.controls['modalidad'];
    
    cod.setValue('17888444-k');
    nom.setValue('Juan');
    sigla.setValue('Lopez');
    semestre.setValue('4');
    profe.setValue('juansito');
    alumno.setValue('alumno');

    app.agregar2();

    expect(app.clase.valid).toBeTrue();
  });   
  
  it('5. El largo del arreglo', ()=>{
    const fixture = TestBed.createComponent(ClasesPage);
    const app = fixture.componentInstance;

    app.cargarPersonas();

    expect(app.clases.length).toBeGreaterThanOrEqual(0);
  }); 

});
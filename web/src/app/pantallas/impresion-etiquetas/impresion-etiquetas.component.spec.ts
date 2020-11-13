import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionEtiquetasComponent } from './impresion-etiquetas.component';

describe('ImpresionEtiquetasComponent', () => {
  let component: ImpresionEtiquetasComponent;
  let fixture: ComponentFixture<ImpresionEtiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpresionEtiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresionEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

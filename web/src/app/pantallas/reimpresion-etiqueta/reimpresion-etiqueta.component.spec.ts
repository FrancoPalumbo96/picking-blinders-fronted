import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimpresionEtiquetaComponent } from './reimpresion-etiqueta.component';

describe('ReimpresionEtiquetaComponent', () => {
  let component: ReimpresionEtiquetaComponent;
  let fixture: ComponentFixture<ReimpresionEtiquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimpresionEtiquetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimpresionEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

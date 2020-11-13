import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFaltanteComponent } from './producto-faltante.component';

describe('ProductoFaltanteComponent', () => {
  let component: ProductoFaltanteComponent;
  let fixture: ComponentFixture<ProductoFaltanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFaltanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFaltanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

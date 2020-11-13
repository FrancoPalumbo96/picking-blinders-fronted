import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanearProductoComponent } from './escanear-producto.component';

describe('EscanearProductoComponent', () => {
  let component: EscanearProductoComponent;
  let fixture: ComponentFixture<EscanearProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanearProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

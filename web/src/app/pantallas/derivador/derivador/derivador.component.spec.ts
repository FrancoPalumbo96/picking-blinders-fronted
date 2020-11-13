import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivadorComponent } from './derivador.component';

describe('DerivadorComponent', () => {
  let component: DerivadorComponent;
  let fixture: ComponentFixture<DerivadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerivadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

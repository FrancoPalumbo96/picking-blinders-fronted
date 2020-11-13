import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPickingListComponent } from './vista-picking-list.component';

describe('VistaPickingListComponent', () => {
  let component: VistaPickingListComponent;
  let fixture: ComponentFixture<VistaPickingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPickingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPickingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

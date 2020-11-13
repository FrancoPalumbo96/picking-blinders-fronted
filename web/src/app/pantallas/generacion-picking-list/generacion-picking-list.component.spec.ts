import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionPickingListComponent } from './generacion-picking-list.component';

describe('GeneracionPickingListComponent', () => {
  let component: GeneracionPickingListComponent;
  let fixture: ComponentFixture<GeneracionPickingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionPickingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionPickingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

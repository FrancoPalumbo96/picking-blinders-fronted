import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDialogComponent } from './multiple-dialog.component';

describe('MultipleDialogComponent', () => {
  let component: MultipleDialogComponent;
  let fixture: ComponentFixture<MultipleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretakerCreationDialogComponent } from './caretaker-creation-dialog.component';

describe('CaretakerCreationDialogComponent', () => {
  let component: CaretakerCreationDialogComponent;
  let fixture: ComponentFixture<CaretakerCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaretakerCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretakerCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

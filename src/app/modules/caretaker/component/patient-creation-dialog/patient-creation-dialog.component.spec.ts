import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreationDialogComponent } from './patient-creation-dialog.component';

describe('PatientCreationDialogComponent', () => {
  let component: PatientCreationDialogComponent;
  let fixture: ComponentFixture<PatientCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

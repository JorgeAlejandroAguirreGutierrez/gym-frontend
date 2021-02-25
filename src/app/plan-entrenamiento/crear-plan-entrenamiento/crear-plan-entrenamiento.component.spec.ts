import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanEntrenamientoComponent } from './crear-plan-entrenamiento.component';

describe('CrearPlanEntrenamientoComponent', () => {
  let component: CrearPlanEntrenamientoComponent;
  let fixture: ComponentFixture<CrearPlanEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPlanEntrenamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

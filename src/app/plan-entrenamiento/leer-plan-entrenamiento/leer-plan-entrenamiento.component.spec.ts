import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerPlanEntrenamientoComponent } from './leer-plan-entrenamiento.component';

describe('LeerPlanEntrenamientoComponent', () => {
  let component: LeerPlanEntrenamientoComponent;
  let fixture: ComponentFixture<LeerPlanEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerPlanEntrenamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerPlanEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

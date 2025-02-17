import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionnalitiesSectionComponent } from './fonctionnalities-section.component';

describe('FonctionnalitiesSectionComponent', () => {
  let component: FonctionnalitiesSectionComponent;
  let fixture: ComponentFixture<FonctionnalitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionnalitiesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionnalitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

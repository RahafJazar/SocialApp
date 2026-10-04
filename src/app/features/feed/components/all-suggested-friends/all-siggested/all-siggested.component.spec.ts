import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSiggestedComponent } from './all-siggested.component';

describe('AllSiggestedComponent', () => {
  let component: AllSiggestedComponent;
  let fixture: ComponentFixture<AllSiggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSiggestedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSiggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

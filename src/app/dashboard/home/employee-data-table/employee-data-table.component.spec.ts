import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataTableComponent } from './employee-data-table.component';

describe('EmployeeDataTableComponent', () => {
  let component: EmployeeDataTableComponent;
  let fixture: ComponentFixture<EmployeeDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

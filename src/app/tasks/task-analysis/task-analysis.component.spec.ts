import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAnalysisComponent } from './task-analysis.component';

describe('TaskAnalysisComponent', () => {
  let component: TaskAnalysisComponent;
  let fixture: ComponentFixture<TaskAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBranchComponent } from './project-branch.component';

describe('ProjectBranchComponent', () => {
  let component: ProjectBranchComponent;
  let fixture: ComponentFixture<ProjectBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectBranchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

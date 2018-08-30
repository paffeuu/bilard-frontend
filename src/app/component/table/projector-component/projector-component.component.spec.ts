import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorComponentComponent } from './projector-component.component';

describe('ProjectorComponentComponent', () => {
  let component: ProjectorComponentComponent;
  let fixture: ComponentFixture<ProjectorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

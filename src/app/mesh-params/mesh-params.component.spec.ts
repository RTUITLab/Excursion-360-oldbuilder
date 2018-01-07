import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshParamsComponent } from './mesh-params.component';

describe('MeshParamsComponent', () => {
  let component: MeshParamsComponent;
  let fixture: ComponentFixture<MeshParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

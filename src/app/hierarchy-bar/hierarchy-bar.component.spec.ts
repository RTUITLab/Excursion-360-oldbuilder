import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyBarComponent } from './hierarchy-bar.component';

describe('HierarchyBarComponent', () => {
  let component: HierarchyBarComponent;
  let fixture: ComponentFixture<HierarchyBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

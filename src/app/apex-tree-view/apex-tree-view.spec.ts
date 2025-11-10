import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexTreeView } from './apex-tree-view';

describe('ApexTreeView', () => {
  let component: ApexTreeView;
  let fixture: ComponentFixture<ApexTreeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexTreeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexTreeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesListDialogComponent } from './activities-list-dialog.component';

describe('ActivitiesListDialogComponent', () => {
  let component: ActivitiesListDialogComponent;
  let fixture: ComponentFixture<ActivitiesListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

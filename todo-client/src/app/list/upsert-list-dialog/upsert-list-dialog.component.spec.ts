import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertListDialogComponent } from './upsert-list-dialog.component';

describe('UpsertListDialogComponent', () => {
  let component: UpsertListDialogComponent;
  let fixture: ComponentFixture<UpsertListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

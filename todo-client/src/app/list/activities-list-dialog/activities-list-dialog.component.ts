import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityEntityService} from "../services/activity-entity.service";
import {IList} from "../interfaces/list";
import {IActivity} from "../interfaces/activity";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-activities-list-dialog',
  templateUrl: './activities-list-dialog.component.html',
  styleUrls: ['./activities-list-dialog.component.scss']
})
export class ActivitiesListDialogComponent implements OnInit {
  list: IList;
  form: FormGroup
  activities$: Observable<IActivity[]>;
  activity: IActivity;

  constructor(
    private dialogRef: MatDialogRef<ActivitiesListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activityEntityService: ActivityEntityService
  ) {
    this.list = data;
  }

  ngOnInit(): void {
    this.getActivityList();
    this.initForm();
  }

  getActivityList(): void {
    this.activities$ = this.activityEntityService.getWithQuery(this.list._id).pipe(
      switchMap(() => this.activityEntityService.entities$)
    );
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      description: [null, Validators.required]
    })
  }

  edit(activity: IActivity): void {
    this.activity = activity;
    this.form.setValue({
      description: [activity.description]
    });
  }

  reset() {
    this.activity = null;
    this.form.reset();
  }

  upsert(mode: string): void {
    if (mode === 'insert') {
      const activity: IActivity = {
        listId: this.list._id,
        description: this.form.value.description,
        done: false
      };
      this.activityEntityService.add(activity).subscribe(
        () => {
          this.snackBar.open('Activity successfully insert', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          });
          this.reset();
        }, () => {
          this.snackBar.open('Error while inserting', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          });
        }
      );
    } else {
      const activity: IActivity = {
        _id: this.activity._id,
        description: this.form.value.description,
        listId: this.list._id,
        done: this.activity.done
      };
      this.activityEntityService.update(activity).subscribe(
        () => {
          this.snackBar.open('Activity edited successfully', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          });
          this.reset();
        }, () => {
          this.snackBar.open('Error while editing', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          });
        }
      );
    }
  }
}

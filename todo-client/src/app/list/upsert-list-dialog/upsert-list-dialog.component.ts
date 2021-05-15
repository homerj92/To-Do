import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ListEntityService} from "../services/list-entity.service";
import {getUserAuth} from "../../auth/auth.selectors";
import {IList} from "../interfaces/list";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";



@Component({
  selector: 'app-upsert-list-dialog',
  templateUrl: './upsert-list-dialog.component.html',
  styleUrls: ['./upsert-list-dialog.component.scss']
})
export class UpsertListDialogComponent implements OnInit {
  loading$: Observable<boolean>;
  userId: string;
  list: IList;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpsertListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private listEntityService: ListEntityService
  ) {
    this.list = data;
    this.loading$ = this.listEntityService.loading$;
  }

  ngOnInit(): void {
    this.getUserId();
    this.initForm();
  }

  getUserId(): void {
    this.store.pipe(
      select(getUserAuth),
      map(auth => auth.id)
    ).subscribe(userId => this.userId = userId);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.list?.name, Validators.required],
      description: [this.list?.description, Validators.required]
    });
  }

  upsert(): void {
    const formValue = this.form.value;
    if (!this.list) {
      const list: IList = {
        name: formValue.name,
        description: formValue.description,
        userId: this.userId
      }
      this.listEntityService.add(list).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('List successfully insert', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          })
        }, () => {
          this.snackBar.open('Error while inserting', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          })
        }
      );

    } else {
      const list: IList = {
        _id: this.list._id,
        name: formValue.name,
        description: formValue.description,
        userId: this.userId
      }
      this.listEntityService.update(list).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('List edited successfully', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          })
        }, () => {
          this.snackBar.open('Error while editing', '' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000
          })
        }
      );
    }
  }

}

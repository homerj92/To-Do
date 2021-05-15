import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";
import {updateUser} from "../actions/user.actions";
import {getUsername} from "../selectors/user.selectors";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  userId: string;
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userId = data;
  }

  ngOnInit(): void {
    this.store.pipe(
      select(getUsername),
      tap(username => {
        this.form = this.formBuilder.group({
          username: [username, Validators.required]
        })
      })
    ).subscribe()
  }

  update() {
    this.userService.updateUser(this.userId, this.form.value.username).pipe(
      tap(username => this.store.dispatch(updateUser({username: username})))
    ).subscribe(
      () => {
        this.dialogRef.close();
        this.snackBar.open('Profile modification successful', '' ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      },
      error => {
        this.snackBar.open('Edit Profile Error', '' ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      }
    )
  }

}

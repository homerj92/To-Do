import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {login, showSignupForm, signup} from "../auth.actions";
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  showSignup: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.showSignup = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      username: [null, Validators.required]
    })
  }

  showSignUpForm(): void {
    this.showSignup =  !this.showSignup;
    this.store.dispatch(showSignupForm({showSignupForm: this.showSignup}))
  }

  onSubmit(action: string): void {
    if(action === 'Signup') {
      this.authService.signUp(this.signupForm.value).pipe(
        tap(() => {
          this.store.dispatch(signup());
          this.showSignUpForm();
        })
      ).subscribe(() => {
        this.snackBar.open('Registration was successful', '' ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      }, error => {
        this.snackBar.open(error.error.message, null ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      })
    } else {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(
        tap( auth => {
          this.store.dispatch(login({userAuth: auth}))
        })
      ).subscribe(user => {
        this.router.navigateByUrl('/list');
      }, error => {
        this.snackBar.open(error.error.message, null ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      })
    }
  }

}

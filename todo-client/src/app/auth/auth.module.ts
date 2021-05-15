import {ModuleWithProviders, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth.effects";
import {authReducer} from "./auth.reducer";
import {AuthService} from "./services/auth.service";
import {AuthRoutingModule} from "./auth-routing.module";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}

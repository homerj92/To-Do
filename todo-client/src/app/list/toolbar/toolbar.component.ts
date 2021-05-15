import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ListEntityService} from "../services/list-entity.service";
import {logout} from "../../auth/auth.actions";
import {getUsername} from "../selectors/user.selectors";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {EditProfileDialogComponent} from "../edit-profile-dialog/edit-profile-dialog.component";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  username$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private listEntityService: ListEntityService
  ) { }

  ngOnInit(): void {
    this.username$ = this.store.pipe(
      select(getUsername),
      map(username => username )
    );
  }

  editProfile(): void{
    this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: JSON.parse(sessionStorage.getItem('userAuth')).id,
      disableClose: true,
      autoFocus: false,
    });
  }

  logout(): void {
    this.listEntityService.clearCache();
    this.store.dispatch(logout());
  }
}

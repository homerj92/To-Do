import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ListEntityService} from "../services/list-entity.service";
import {IList} from "../interfaces/list";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UpsertListDialogComponent} from "../upsert-list-dialog/upsert-list-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  lists$: Observable<IList[]>;

  constructor(
    private dialog: MatDialog,
    private listEntityService: ListEntityService
  ) {
    this.loading$ = this.listEntityService.loading$;
  }

  ngOnInit(): void {
    const userAuth = sessionStorage.getItem('userAuth');
    this.lists$ = this.listEntityService.getWithQuery(JSON.parse(userAuth).id).pipe(
      switchMap(() => this.listEntityService.entities$)
    );
  }

  upsertList(list?: IList) {
    this.dialog.open(UpsertListDialogComponent, {
      width: '400px',
      data: list,
      disableClose: true,
      autoFocus: false,
    });
  }

}

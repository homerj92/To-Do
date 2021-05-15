import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ListEntityService} from "../services/list-entity.service";
import {IList} from "../interfaces/list";
import {Observable} from "rxjs";
import {ActivitiesListDialogComponent} from "../activities-list-dialog/activities-list-dialog.component";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input('list') list: IList;
  @Output() editList = new EventEmitter<IList>();
  loading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private listEntityService: ListEntityService
  ) {
    this.loading$ = this.listEntityService.loading$;
  }

  ngOnInit(): void {}

  activityList(): void {
    this.dialog.open(ActivitiesListDialogComponent, {
      width: '900px',
      height: '600px',
      data: this.list,
      panelClass: 'activity-dialog-class',
      disableClose: true,
      autoFocus: false,
    });
  }

  delete() : void {
    this.listEntityService.delete(this.list).subscribe(
      () => {
        this.snackBar.open('List deleted successfully', '' ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      }, () => {
        this.snackBar.open('Error', '' ,{
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      }
    )
  }

}

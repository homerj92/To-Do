import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityEntityService} from "../services/activity-entity.service";
import {IActivity} from "../interfaces/activity";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input('activity') activity: IActivity;
  @Output() editActivity = new EventEmitter<IActivity>();

  constructor(
    private snackBar: MatSnackBar,
    private activityEntityService: ActivityEntityService
  ) { }

  ngOnInit(): void {}

  changeEvent(checked: boolean) : void {
    const activity: IActivity = {
      _id: this.activity._id,
      description: this.activity.description,
      listId: this.activity.listId,
      done: checked
    };
    this.activityEntityService.update(activity)
  }

  delete() : void {
    this.activityEntityService.delete(this.activity._id).subscribe(
      () => {
        this.snackBar.open('Activity deleted successfully', '' ,{
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

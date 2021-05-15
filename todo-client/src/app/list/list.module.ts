import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./effects/user.effects";
import {EntityDataService, EntityDefinitionService, EntityMetadataMap} from "@ngrx/data";
import {userReducer} from "./reducers/user.reducer";
import {UserService} from "./services/user.service";
import {ListEntityService} from "./services/list-entity.service";
import {ListDataService} from "./services/list-data.service";
import {IList} from "./interfaces/list";
import {ActivityEntityService} from "./services/activity-entity.service";
import {ActivityDataService} from "./services/activity-data.service";
import {IActivity} from "./interfaces/activity";
import {ListRoutingModule} from "./list-routing.module";
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListComponent } from './list/list.component';
import { ActivityComponent } from './activity/activity.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { UpsertListDialogComponent } from './upsert-list-dialog/upsert-list-dialog.component';
import { ActivitiesListDialogComponent } from './activities-list-dialog/activities-list-dialog.component';

const entityMetadata: EntityMetadataMap = {
  List: {
    selectId: (list: IList) => list._id,
    entityDispatcherOptions: {
      // optimisticUpdate: true
    }
  },
  Activity: {
    selectId: (activity: IActivity) => activity._id
  }
};

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    ListComponent,
    ActivityComponent,
    SpinnerComponent,
    EditProfileDialogComponent,
    UpsertListDialogComponent,
    ActivitiesListDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
    ListRoutingModule
  ],
  providers: [
    UserService,
    ListEntityService,
    ListDataService,
    ActivityEntityService,
    ActivityDataService
  ],
  entryComponents: [
    EditProfileDialogComponent,
    UpsertListDialogComponent,
    ActivitiesListDialogComponent
  ]
})
export class ListModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private listDataService: ListDataService,
    private activityDataService: ActivityDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('List', listDataService);
    entityDataService.registerService('Activity', activityDataService )
  }
}

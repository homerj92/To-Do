import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IActivity} from "../interfaces/activity";

@Injectable()
export class ActivityEntityService extends EntityCollectionServiceBase<IActivity> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Activity', serviceElementFactory);
  }
}

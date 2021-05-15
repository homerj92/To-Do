import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IList} from "../interfaces/list";

@Injectable()
export class ListEntityService extends EntityCollectionServiceBase<IList> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('List', serviceElementFactory);
  }
}

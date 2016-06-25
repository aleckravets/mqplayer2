import { Injectable } from '@angular/core';
import { DriveItem } from './drive-item';
import { ITEMS } from './mock-items';

@Injectable()
export class DriveService {
    getItems(parent: DriveItem) {
        return Promise.resolve(ITEMS.filter(i => parent ? i.parent == parent.id : !i.parent));
    }
}
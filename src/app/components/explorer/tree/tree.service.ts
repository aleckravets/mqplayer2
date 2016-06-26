import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node/tree-node';
import { DriveItem } from 'app/services/drive/drive-item';
import { DriveService } from 'app/services/drive/drive.service';

@Injectable()
export class TreeService {
    driveService: DriveService;

    constructor() {
        this.driveService = new DriveService();
    }

    getChildNodes(node?: any) {
        return this.driveService.getItems(node ? node.item : null)
            .then(items => items.map(item => this.getNode(item)));
    }

    private getNode(item: DriveItem) : TreeNode {
        return new TreeNode(item);
    }
}
import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node/tree-node';
import { DriveFile } from 'app/services/drive/drive-file';
import { DriveService } from 'app/services/drive/drive-service';

@Injectable()
export class TreeService {

    constructor(private driveService: DriveService) {
    }

    getChildNodes(node?: TreeNode) {
        return this.driveService.getFiles(node ? node.file : null)
            .then(files => {
                let nodes = files.map(file => this.getNode(file));
                if (node) {
                    node.children = nodes;
                }
                return nodes;
            });
    }

    private getNode(file: DriveFile): TreeNode {
        return new TreeNode(file);
    }
}
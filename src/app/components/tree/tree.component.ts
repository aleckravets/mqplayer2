import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeNode } from './tree-node/tree-node';
import { DriveFile } from 'app/services/drive/drive-file';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
    selector: 'tree',
    moduleId: module.id,
    templateUrl: './tree.html',
    providers: [TreeService],
    directives: [TreeNodeComponent],
    inputs: ['roots']
})
export class TreeComponent implements OnInit {
    roots: TreeNode[];

    constructor(private treeService: TreeService) {
    }

    ngOnInit() {
        // this.root = new TreeNode(new DriveFile());
        // this.root.name = 'Root';

        // this.treeService.getChildNodes()
        //     .then(nodes => {
        //         this.root.children = nodes;
        //     });
    }
}
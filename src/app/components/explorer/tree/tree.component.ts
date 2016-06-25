import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeNode } from './tree-node/tree-node';
import { DriveItem } from 'app/services/drive/drive-item';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
    selector: 'tree',
    moduleId: module.id,
    templateUrl: './tree.html',
    providers: [TreeService],
    directives: [TreeNodeComponent]
})
export class TreeComponent implements OnInit {
    root: TreeNode;

    constructor(private treeService: TreeService) {
    }

    ngOnInit() {
        this.root = new TreeNode(new DriveItem());
        this.root.name = 'Root';

        this.treeService.getChildNodes()
            .then(nodes => {
                this.root.children = nodes;
            });
    }
}
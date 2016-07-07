import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { TreeService } from './tree.service';
import { TreeNode } from './tree-node/tree-node';
import { DriveFile } from 'app/services/drive/drive-file';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
    selector: 'tree',
    moduleId: module.id,
    templateUrl: './tree.html',
    styleUrls: ['./tree.css'],
    providers: [TreeService],
    directives: [TreeNodeComponent]
})
export class TreeComponent implements OnInit {
    roots: TreeNode[];
    selectedNode: TreeNodeComponent;
    @Output() onSelectNode = new EventEmitter<TreeNode>();

    constructor(private treeService: TreeService) {
    }

    ngOnInit() {
        this.getRoots();
    }
    
    selectNode(node: TreeNodeComponent) {
        if (this.selectedNode) {
            this.selectedNode.selected = false;
        }
        this.selectedNode = node;
        this.onSelectNode.emit(node.node);
    }

    private getRoots() {
        this.roots = [];

        let root = new TreeNode(new DriveFile('root', 'My Drive', true));
        this.roots.push(root);

        // get playlists here...
    }
}
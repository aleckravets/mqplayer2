import {Component, OnInit} from '@angular/core';
// import { TreeComponent } from './tree/tree.component';
import {TreeComponent, TreeNode} from 'angular2-tree-component';
import {TreeService} from "./tree/tree.service";

@Component({
    selector: 'explorer',
    moduleId: module.id,
    templateUrl: 'explorer.html',
    directives: [TreeComponent],
    providers: [TreeService]
})
export class ExplorerComponent implements OnInit{
    nodes: any[];
    treeOptions: any;

    constructor(private treeService: TreeService) {
    }

    ngOnInit() {
        this.treeService.getChildNodes()
            .then(nodes => {
                this.nodes = nodes;
            });
        this.treeOptions = this.getTreeOptions();
    }

    getChildren(node: TreeNode) {
        return this.treeService.getChildNodes(node);
    }

    getTreeOptions() {
        return {
            getChildren: this.getChildren.bind(this)
        };
    }
}
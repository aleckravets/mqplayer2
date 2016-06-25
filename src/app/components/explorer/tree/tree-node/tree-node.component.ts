import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TreeNode } from './tree-node';
import { TreeService } from '../tree.service';

@Component({
    selector: 'tree-node',
    moduleId: module.id,
    templateUrl: './tree-node.html',
    inputs: ['node', 'isExpanded'],
    directives: [TreeNodeComponent, NgIf]
})
export class TreeNodeComponent {
    node: TreeNode;
    isLoading: boolean = false;
    isExpanded: boolean = false;

    constructor(private treeService: TreeService) {

    }

    toggle(e) {
        e.stopPropagation();

        this.isExpanded = !this.isExpanded;

        if (!this.node.children) {
            this.treeService.getChildNodes(this.node)
                .then(nodes => this.node.children = nodes);
        }
    }

}
import {Component, forwardRef, Inject} from '@angular/core';
import { NgIf } from '@angular/common';
import { TreeNode } from './tree-node';
import { TreeService } from '../tree.service';
import {TreeComponent} from "../tree.component";

@Component({
    selector: 'tree-node',
    moduleId: module.id,
    templateUrl: './tree-node.html',
    styleUrls: ['./tree-node.css'],
    inputs: ['node'],
    directives: [TreeNodeComponent, NgIf]
})
export class TreeNodeComponent {
    node: TreeNode;
    loading: boolean = false;
    expanded: boolean = false;
    selected: boolean = false;

    constructor(@Inject(forwardRef(() => TreeComponent)) private tree: TreeComponent, private treeService: TreeService) {

    }

    toggle() {
        this.expanded = !this.expanded;

        if (!this.node.children) {
            this.loading = true;
            this.treeService.getChildNodes(this.node)
                .finally(() => this.loading = false);
        }
    }

    select() {
        this.selected = true;
        this.tree.selectNode(this);
    }

    click(e) {
        e.stopPropagation();
    }

}
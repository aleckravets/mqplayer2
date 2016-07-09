import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {TreeNodeComponent} from './tree-node/tree-node.component';
import {ITreeNode} from "./tree-node/tree-node";

@Component({
    selector: 'tree',
    moduleId: module.id,
    templateUrl: './tree.html',
    styleUrls: ['./tree.css'],
    directives: [TreeNodeComponent]
})
export class TreeComponent implements OnInit {
    @Input() roots: ITreeNode[];
    @Input() options;
    @Output() onSelectNode = new EventEmitter<TreeNodeComponent>();
    @Output() onToggleNode = new EventEmitter<TreeNodeComponent>();
    selectedNode: TreeNodeComponent;
    private getChildren: Function;

    constructor() {
    }

    ngOnInit() {
        this.getChildren = this.options ? this.options.getChildren : undefined;
    }
    
    selectNode(node: TreeNodeComponent) {
        if (this.selectedNode) {
            this.selectedNode.isSelected = false;
        }
        node.isSelected = true;
        this.selectedNode = node;
        this.onSelectNode.emit(node);
    }

    toggleNode(node: TreeNodeComponent) {
        node.isExpanded = !node.isExpanded;
        this.onToggleNode.emit(node);

        if (!node.model.children && this.getChildren) {
            let res = this.getChildren(node.model);

            if (res instanceof Promise) {
                node.isLoading = true;
                res.then(children => {
                    node.model.children = children;
                    node.isLoading = false;
                });
            }
            else {
                node.model.children = res;
            }
        }
    }
}
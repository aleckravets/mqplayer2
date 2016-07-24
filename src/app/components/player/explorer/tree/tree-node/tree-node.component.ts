import {Component, forwardRef, Inject, Input, Output, EventEmitter} from '@angular/core';
import {NgIf} from '@angular/common';
import {TreeComponent} from "../tree.component";
import {ITreeNode} from "./tree-node";

@Component({
    selector: 'tree-node',
    moduleId: module.id,
    templateUrl: './tree-node.html',
    styleUrls: ['./tree-node.css'],
    directives: [TreeNodeComponent, NgIf]
})
export class TreeNodeComponent {
    @Input() model: ITreeNode;
    @Output() onToggle = new EventEmitter<TreeNodeComponent>();
    @Output() onSelect = new EventEmitter<TreeNodeComponent>();
    isLoading: boolean = false;
    isExpanded: boolean = false;
    isSelected: boolean = false;

    constructor(@Inject(forwardRef(() => TreeComponent)) public tree: TreeComponent) {
    }

    isExpandable() {
        return this.model.hasChildren || (this.model.children && this.model.children.length);
    }

    toggle() {
        this.tree.toggleNode(this);
        this.onToggle.emit(this);
    }

    select() {
        this.tree.selectNode(this);
        this.onSelect.emit(this);
    }

    click(e) {
        e.stopPropagation();
    }
}
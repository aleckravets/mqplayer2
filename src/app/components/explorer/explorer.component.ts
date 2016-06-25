import {Component, OnInit} from '@angular/core';
// import { TreeComponent } from './tree/tree.component';
import { TreeComponent } from 'angular2-tree-component';
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

    constructor(private treeService: TreeService) {
    }

    ngOnInit() {
        this.treeService.getChildNodes()
            .then(nodes => {
                this.nodes = nodes;
            });
    }
}
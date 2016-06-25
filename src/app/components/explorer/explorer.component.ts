import { Component, OnInit } from '@angular/core';
import { TreeComponent } from './tree/tree.component';

@Component({
    selector: 'explorer',
    moduleId: module.id,
    templateUrl: 'explorer.html',
    directives: [TreeComponent]
})
export class ExplorerComponent {
    constructor() {
    }
}
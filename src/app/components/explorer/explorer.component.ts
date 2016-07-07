import {Component, OnInit, forwardRef, Inject, ViewChild} from '@angular/core';
import {TreeComponent} from "./tree/tree.component";
import {ContentComponent} from "./content/content.component";
import {AppComponent} from "app/components/app.component";
import {TreeNode} from "./tree/tree-node/tree-node";
import {DriveFile} from "../../services/drive/drive-file";

@Component({
    selector: 'explorer',
    moduleId: module.id,
    templateUrl: './explorer.html',
    styleUrls: ['./explorer.css'],
    directives: [TreeComponent, ContentComponent]
})
export class ExplorerComponent implements OnInit{
    currentDir: DriveFile;
    
    @ViewChild(ContentComponent)
    content: ContentComponent;

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent) {
    }

    ngOnInit() {
        // watch tree.selectedNode and update content
    }
    
    onSelectNode(node: TreeNode) {
        this.content.showDir(node.file);
    }
}
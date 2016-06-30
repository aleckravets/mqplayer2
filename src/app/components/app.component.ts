import {Component, OnInit} from "@angular/core";
import {PlaylistComponent} from "./playlist/playlist.component"
import {PlaylistManagerComponent} from "./playlist-manager/playlist-manager.component"
import {PlayerComponent} from "./player/player.component"
import {DriveService} from "app/services/drive/drive-service";
import {TreeComponent} from "./tree/tree.component";
import {TreeNode} from "./tree/tree-node/tree-node";
import {TreeService} from "./tree/tree.service";

@Component({
    selector: "app",
    moduleId: module.id,
    templateUrl: "./app.html",
    directives: [TreeComponent, PlayerComponent, PlaylistComponent, PlaylistManagerComponent],
    providers: [TreeService, DriveService]
})
export class AppComponent implements OnInit {
    rootNodes: TreeNode[];

    constructor(private treeService: TreeService, private driveService: DriveService) {
    }

    ngOnInit() {
        console.log("Application component initialized...");
    }

    login() {
        this.driveService.authorize()
            .then(() => {
                this.treeService.getChildNodes()
                    .then(nodes => {
                        this.rootNodes = nodes;
                    });
            });
    }
}
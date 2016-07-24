import {Component, OnInit} from "@angular/core";
import {DriveService} from "../../services/drive/drive-service";
import {ExplorerComponent} from "./explorer/explorer.component";
import {ControlsComponent} from "./controls/controls.component";
import {PlaylistComponent} from "./playlist/playlist.component";

@Component({
    selector: "player",
    moduleId: module.id,
    templateUrl: "./player.html",
    directives: [ExplorerComponent, ControlsComponent, PlaylistComponent]
})
export class PlayerComponent implements OnInit {
    constructor(private driveService: DriveService) {
    }

    ngOnInit() {
    }
}
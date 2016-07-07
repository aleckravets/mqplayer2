import {Component, OnInit} from "@angular/core";
import {PlaylistComponent} from "./playlist/playlist.component"
import {PlayerComponent} from "./player/player.component"
import {DriveService} from "app/services/drive/drive-service";
import {ExplorerComponent} from "./explorer/explorer.component";

@Component({
    selector: "app",
    moduleId: module.id,
    templateUrl: "./app.html",
    directives: [ExplorerComponent, PlayerComponent, PlaylistComponent],
    providers: [DriveService]
})
export class AppComponent implements OnInit {
    isAuthorized: boolean = false;

    constructor(private driveService: DriveService) {
    }

    ngOnInit() {
    }

    login() {
        this.driveService.authorize()
            .then(() => {
                this.isAuthorized = true;
            });
    }
}
import {Component, OnInit} from "@angular/core";
import {ExplorerComponent} from "./explorer/explorer.component"
import {PlaylistComponent} from "./playlist/playlist.component"
import {PlaylistManagerComponent} from "./playlist-manager/playlist-manager.component"
import {PlayerComponent} from "./player/player.component"

@Component({
    selector: "app",
    moduleId: module.id,
    templateUrl: "./app.html",
    directives: [ExplorerComponent, PlayerComponent, PlaylistComponent, PlaylistManagerComponent]
})
export class AppComponent implements OnInit {

    ngOnInit() {
        console.log("Application component initialized...");
    }
}
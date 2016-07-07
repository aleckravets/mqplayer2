import {Component} from "@angular/core";
import {Record} from "./record";
import {Playlist} from "./playlist";

@Component({
    selector: "playlist",
    moduleId: module.id,
    templateUrl: "playlist.html"
})
export class PlaylistComponent {
    playlist: Playlist;
    
    constructor() {
        this.playlist = new Playlist();
    }
}
import {Component} from "@angular/core";
import {Record} from "./record";

@Component({
    selector: "playlist",
    moduleId: module.id,
    templateUrl: "playlist.html"
})
export class PlaylistComponent {
    records: Record[];
    
    constructor() {
    }
}
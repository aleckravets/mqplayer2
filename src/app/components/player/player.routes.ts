import {RouterConfig} from '@angular/router';
import {FolderComponent} from "./explorer/folder/folder.component";
import {SearchResultsComponent} from "./explorer/search-results/search-results.component";
import {PlayerComponent} from "./player.component";
import {AuthGuard} from "../../services/auth-guard";

export const playerRoutes: RouterConfig = [
    {
        path: '',
        component: PlayerComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '',  component: FolderComponent },
            { path: 'folders/:id',  component: FolderComponent },
            { path: 'search', component: SearchResultsComponent }
        ]
    }
];
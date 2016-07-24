import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {DriveService} from "./drive/drive-service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {
    redirectUrl: string;

    constructor(private driveService: DriveService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let p = this.driveService.login(true)
            .then(() => true)
            .catch(() => {
                this.redirectUrl = state.url;
                this.router.navigate(['/login']);
                return false;
            });

        return Observable.fromPromise(p);
    }
}

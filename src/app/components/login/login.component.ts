import {Component} from "@angular/core";
import {DriveService} from "../../services/drive/drive-service";
import {Router} from "@angular/router";
import {AuthGuard} from "../../services/auth-guard";

@Component({
    moduleId: module.id,
    templateUrl: "./login.html"
})
export class LoginComponent {

    constructor(public driveService: DriveService,
                private authGuard: AuthGuard,
                private router: Router) {
    }

    login() {
        this.driveService.login()
            .then(() => {
                let redirectUrl = this.authGuard.redirectUrl ? this.authGuard.redirectUrl : '/';
                this.router.navigate([redirectUrl]);
            });
    }
    
    logout() {
        this.driveService.logout();
    }
}
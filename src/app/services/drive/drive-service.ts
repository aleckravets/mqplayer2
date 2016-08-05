import { Injectable } from '@angular/core';
import { DriveFile } from './drive-file';
import {Deferred} from "../../tools/deferred";

@Injectable()
export class DriveService {
    CLIENT_ID = '97071318931-0pqadkdeov03b36bhthnri1n3h64eg7d.apps.googleusercontent.com';
    SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
    isLoggedIn: boolean;
    token: any;
    user: any;
    files = {};
    filePromises = {};
    childrenPromises = {};

    constructor() {
    }

    getFile(id: string): Promise<DriveFile> {
        if (!this.filePromises[id]) {
            if (this.files[id]) {
                this.filePromises[id] = Promise.resolve(this.files[id]);
            }
            else {
                var deferred = new Deferred();

                var request = gapi.client.drive.files.get({
                    fileId: id,
                    fields: 'id, name, mimeType, parents'
                });

                request.execute(resp => {
                    if (resp.error) {
                        var error = resp.error.code + " " + resp.error.message;
                        deferred.reject(error);
                        console.log(error);
                    }
                    else {
                        this.processFile(resp)
                        this.checkSubfolders([resp])
                            .then(() => {
                                this.files[id] = resp;
                                deferred.resolve(resp);
                            });
                    }
                });

                this.filePromises[id] = deferred.promise;
            }
        }

        return this.filePromises[id];
    }

    getChildren(parent: DriveFile): Promise<DriveFile[]> {
        if (!this.childrenPromises[parent.id]) {
            var query = `'${parent.id}' in parents`;

            if (!parent) {
                query = `(sharedWithMe or ${query})`;
            }

            this.childrenPromises[parent.id] = this.query(query)
                .then(files => this.processFiles(files))
                .then(files => parent.children = files);
        }

        return this.childrenPromises[parent.id];
    }

    getParents(file: DriveFile) {
        let parents = [];
        
        let getParent = f => {
            if (f.parents && f.parents[0]) {
                return this.getFile(f.parents[0])
                    .then(p => {
                        parents.unshift(p);
                        return getParent(p);
                    });
            }
            else {
                return Promise.resolve(parents);
            }
        };
        
        return getParent(file);
    }

    private processFiles(files) {
        files.forEach(file => {
            this.files[file.id] = file;
            this.filePromises[file.id] = undefined;
        });
        return this.checkSubfolders(files)
            .then(files => {
                files.forEach(this.processFile);
                files.sort(this.fileComparator);
                return files;
            });
    }

    private processFile(file) {
        file.isFolder = file.mimeType == 'application/vnd.google-apps.folder';
    }

    private checkSubfolders(files) {
        var parents = {};

        files.forEach(f => {
            if (f.mimeType == 'application/vnd.google-apps.folder') {
                parents[f.id] = f;
            }
        });

        var parentIds = Object.keys(parents);

        if (!parentIds.length) {
            return Promise.resolve(files);
        }

        var query = parentIds
            .map(id => `'${id}' in parents`)
            .join(' or ');

        query = `(${query}) and mimeType = 'application/vnd.google-apps.folder'`;

        return this.query(query).then(subfolders => {
            subfolders.forEach(f => {
                f.parents.forEach(p => {
                    if (parents[p]) {
                        parents[p].hasSubfolders = true;
                    }
                })
            });
            return files;
        });
    }

    login(immediate = false) {
        console.log('Logging in...');
        return new Promise((resolve, reject) => {
            gapi.auth.authorize({
                client_id: this.CLIENT_ID,
                scope: this.SCOPES.join(' '),
                immediate
                },
                resp => {
                    if (resp && !resp.error) {
                        this.isLoggedIn = true;
                        this.token = gapi.auth.getToken();
                        console.log('Successfuly logged in');
                        setTimeout(() => this.login(true), this.token.expires_in * 1000);
                        resolve();
                    }
                    else {
                        this.isLoggedIn = false;
                        console.log('Failed to log in: ' + resp.error);
                        reject(resp && resp.error);
                    }
                });
            })
            .then(() => this.getUserInfo());
    }

    logout() {

    }

    private getUserInfo() {
        return new Promise((resolve, reject) => {
            gapi.client.drive.about.get({
                fields: 'user/*,storageQuota/*'
            }).execute(resp => {
                if (resp.error) {
                    reject(`${resp.error.code} ${resp.error.message}`);
                }
                else {
                    this.user = {
                        name: resp.user.displayName,
                        email: resp.user.emailAddress,
                        storage: resp.storageQuota
                    };
                    resolve(this.user);
                }
            });
        });
    }

    private query(query) {
        query = query + ' and trashed = false';

        var deferred = new Deferred();

        this.getPageOfFiles(query, [], deferred, null);

        return deferred.promise;
    }

    private getPageOfFiles(query, result, deferred, pageToken) {
        var request = gapi.client.drive.files.list({
            q: query,
            fields: 'nextPageToken, files(id, name, mimeType, parents)',
            pageToken: pageToken
        });

        request.execute(resp => {
            if (!resp.error) {
                if (resp.files) {
                    result.push(...resp.files);
                }

                if (resp.nextPageToken) {
                    this.getPageOfFiles(query, result, deferred, resp.nextPageToken);
                }
                else {
                    deferred.resolve(result);
                }
            }
            else {
                if (0 && resp.error.code == 401) {
                    // trying to refresh token and execute the same request again
                    // console.log(new Date(), 'Refreshing the token...');
                    // this.login(true)
                    //     .then(() => {
                    //         this.getPageOfFiles(query, result, deferred, pageToken)
                    //     })
                    //     .catch(() => {
                    //         var error = resp.error.code + " " + resp.error.message;
                    //         deferred.reject('Failed to refresh token:' + error);
                    //     });
                }
                else {
                    var error = resp.error.code + " " + resp.error.message;
                    deferred.reject(error);
                }
            }
        });
    }

    private refreshToken() {
        var deferred = new Deferred();

        gapi.auth.authorize({client_id: this.CLIENT_ID, scope: this.SCOPES.join(' '), immediate: true}, resp => {
            if (!resp.error) {
                deferred.resolve();
            }
            else {
                deferred.reject(resp.error.code + " " + resp.error.message);
            }
        });

        return deferred.promise;
    }

    // private processFile(rawFile) {
    //     return new DriveFile(rawFile.id, rawFile.name, rawFile.mimeType == 'application/vnd.google-apps.folder', rawFile.hasSubfolders);
    // }

    private fileComparator(a: DriveFile, b: DriveFile) {
        if (a.isFolder === b.isFolder) {
            return a.name < b.name ? -1 : 1;
        }
        else {
            return a.isFolder ? -1 : 1;
        }
    }
}

export function loadDriveAPI() {
    return new Promise((resolve, reject) => {
        window.gapi_loaded = function() {
            gapi.client.load('drive', 'v3', function() {
                resolve();
            });
        };
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://apis.google.com/js/client.js?onload=gapi_loaded';
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}
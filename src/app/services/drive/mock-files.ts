import { DriveFile } from './drive-file';

export var DRIVE_FILES = [
    { id: 1, name: 'One', type: 'folder', parent: null },
    { id: 2, name: 'Two', type: 'folder', parent: null },
    { id: 3, name: 'Three', type: 'folder', parent: null },
    { id: 4, name: 'Item 1', type: 'file', parent: 1 },
    { id: 5, name: 'Item 2', type: 'file', parent: 1 }
];
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.PERMISSIONS = void 0;
exports.PERMISSIONS = new Map([
    ['create-note', { name: 'create note', description: 'Create' }],
    ['read-note', { name: 'read note', description: 'Read' }],
    ['update-note', { name: 'update note', description: 'Update' }],
    ['delete-note', { name: 'delete note', description: 'Delete' }],
    ['all-note', { name: 'all', description: 'All' }],
]);
exports.ROLES = new Map([
    ['admin', { name: 'admin', description: 'Admin', permissions: [exports.PERMISSIONS.get('all')] }],
    ['user', { name: 'user', description: 'User', permissions: [exports.PERMISSIONS.get('read')] }],
]);

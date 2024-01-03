import { Permission, Role } from "../models/user.model";


export const PERMISSIONS = new Map<string, Permission>([
    ['create-note', { name: 'create note', description: 'Create' }],
    ['read-note', { name: 'read note', description: 'Read' }],
    ['update-note', { name: 'update note', description: 'Update' }],
    ['delete-note', { name: 'delete note', description: 'Delete' }],
    ['all-note', { name: 'all', description: 'All' }],
    
]);

export const ROLES = new Map<string, Role>([
    ['admin', { name: 'admin', description: 'Admin', permissions: [PERMISSIONS.get('all')!] }],
    ['user', { name: 'user', description: 'User', permissions: [PERMISSIONS.get('read')!] }],
]);
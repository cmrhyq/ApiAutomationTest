export interface User {
    id: number;
    username: string;
    nickname: string;
    roles: Role[];
    permissions: string[];
}

export interface Role {
    id: number;
    name: string;
    key: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    key: string;
    type: 'menu' | 'button';
    parentId?: number;
}

export interface MenuItem {
    name: string;
    path: string;
    redirect: string;
    meta?: {
        icon?: string;
        link: string;
        noCache: boolean;
        title: string;
    };
    children?: MenuItem[];
    hidden?: boolean;
    component?: string;
    alwaysShow?: boolean;
}
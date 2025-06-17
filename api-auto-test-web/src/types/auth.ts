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

export interface RouteConfig {
    path: string;
    name: string;
    component: React.ComponentType;
    meta?: {
        title: string;
        icon?: string;
        roles?: string[];
        permissions?: string[];
        hidden?: boolean;
    };
    children?: RouteConfig[];
}

export interface MenuItem {
    id: number;
    name: string;
    path: string;
    component?: string;
    icon?: string;
    permission?: string;
    children?: MenuItem[];
    hidden?: boolean;
}
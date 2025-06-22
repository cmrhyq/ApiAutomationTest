import {getToken} from "../../plugins/cache/tokenCache.ts";

export interface User {
    id: number;
    userName: string;
    nickName: string;
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

export interface UserState {
    user: User | null;
    token: string | null;
    roles: string[];
    permissions: string[];
    loading: boolean;
    error: string | null;
}

export const initialState: UserState = {
    user: null,
    token: getToken() || null,
    roles: [],
    permissions: [],
    loading: false,
    error: null,
};
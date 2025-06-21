import React from "react";

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

export interface DynamicIconProps {
    iconName: string;
    style?: React.CSSProperties;
    className?: string;
}
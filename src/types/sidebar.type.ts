import { ReactNode } from "react";

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    icon?: ReactNode;
    children?: TSidebarItem[];
};

export type TRoutes = {
    path: string;
    element: ReactNode;
};

export type TUserPath = {
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[];
    icon?: ReactNode;
    role?:string;
};
import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const sidebarItemsGenerator = (paths: TUserPath[]) => {
  const sidebarItems = paths.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
      });
    }

    // if (item.children) {
    //   acc.push({
    //     key: item.name as string,
    //     label: item.name,
    //     children: item.children.map((child) => {
    //       if (child.name) {
    //         return {
    //           key: child.name,
    //           label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
    //         };
    //       }
    //     }),
    //   });
    // }

    return acc;
  }, []);

  return sidebarItems;
};

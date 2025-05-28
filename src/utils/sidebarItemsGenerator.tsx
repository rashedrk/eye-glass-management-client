import { MenuProps } from "antd";
import { TUserPath } from "../types";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";

// Convert to a custom hook to fix the React Hook usage error
export const useSidebarItemsGenerator = (paths: TUserPath[]) => {
  const user = useAppSelector(selectCurrentUser);

  const sidebarItems = paths.reduce((acc: MenuProps["items"], item) => {
    // Skip items that require a role the user doesn't have
    if (item.role && item.role !== user?.role) {
      return acc;
    }

    if (item.name && item.path && item.icon) {
      acc?.push({
        key: item.name,
        icon: item.icon,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc?.push({
        key: item.name || "",
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
        children: item.children.map((child) => ({
          key: child.name || "", 
          icon: child.icon,
          label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

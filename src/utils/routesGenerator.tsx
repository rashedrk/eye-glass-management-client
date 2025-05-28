import { TRoutes, TUserPath } from "../types";
import RoleBasedRoute from "../components/layout/RoleBasedRoute";


export const routeGenerator = (paths: TUserPath[]) => {

    const routes = paths.reduce((acc: TRoutes[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.role ? (
                    <RoleBasedRoute role={item.role}>
                        {item.element}
                    </RoleBasedRoute>
                ) : item.element,
            });
        }

        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path!,
                    element: child.role ? (
                        <RoleBasedRoute role={child.role}>
                            {child.element}
                        </RoleBasedRoute>
                    ) : child.element,
                });
            });
        }

        return acc;
    }, []);

    return routes;
}
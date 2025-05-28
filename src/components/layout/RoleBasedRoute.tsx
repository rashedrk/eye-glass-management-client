import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

type TRoleBasedRoute = {
    children: ReactNode;
    role?: string;
};

const RoleBasedRoute = ({ children, role }: TRoleBasedRoute) => {
    const user = useAppSelector(selectCurrentUser);

    if (role && user?.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleBasedRoute;
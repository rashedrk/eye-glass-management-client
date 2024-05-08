import { ReactNode } from "react";

import { TAuthUser, logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import verifyToken from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRoute = {
    children: ReactNode,
    role: string
}

const ProtectedRoute = ({children, role} : TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();

    let user;
    if(token){
        user = verifyToken(token) as TAuthUser
    }

    

    if (role !== undefined && role !== user?.role ) {
        dispatch(logout())
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    
    if(!token) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    return children
};

export default ProtectedRoute;
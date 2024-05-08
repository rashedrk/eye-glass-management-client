import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../pages/Auth/Login/Login";





const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute role="manager">
        <App />
      // </ProtectedRoute>
    ),
    children: routeGenerator(userPaths)
  },
{
  path: '/login',
  element: <Login/>
}

]);

export default router;

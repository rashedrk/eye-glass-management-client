import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";





const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths)
  },
{
  path: '/login',
  element: <Login/>
},
{
  path: '/register',
  element: <Register/>
}

]);

export default router;

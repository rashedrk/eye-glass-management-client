import AddEyeglass from "../pages/EyeglassManagement/AddEyeglass/AddEyeglass";
import DuplicateAndEdit from "../pages/EyeglassManagement/DuplicateAndEdit/DuplicateAndEdit";
import Inventory from "../pages/EyeglassManagement/Inventory/Inventory";
import SalesHistory from "../pages/SalesHistory/SalesHistory";

export const userPaths = [
  {
    name: "Add Eyeglass",
    path: "add-eyeglass",
    element: <AddEyeglass />,
  },
  {
    name: "Inventory",
    path: "inventory",
    element: <Inventory />,
  },
  
  {
    name: "Sales",
    path: "sales",
    element: <AddEyeglass />,
  },
  {
    name: "Sales History",
    path: "sales-history",
    element: <SalesHistory />,
  },
  {
    path: '/duplicate_edit',
    element: <DuplicateAndEdit />
  },
];

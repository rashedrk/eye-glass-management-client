import Dashboard from "../pages/Dashboard/Dashboard";
import AddEyeglass from "../pages/EyeglassManagement/AddEyeglass/AddEyeglass";
import DuplicateAndEdit from "../pages/EyeglassManagement/DuplicateAndEdit/DuplicateAndEdit";
import Inventory from "../pages/EyeglassManagement/Inventory/Inventory";
import SalesHistory from "../pages/SalesHistory/SalesHistory";
import Sell from "../pages/Sell/Sell";
import {
  DashboardOutlined,
  PlusCircleOutlined,
  ShoppingOutlined,
  DollarOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
    icon: <DashboardOutlined style={{ fontSize: "16px" }} />,
  },
  {
    name: "Add Eyeglass",
    path: "add-eyeglass",
    element: <AddEyeglass />,
    icon: <PlusCircleOutlined style={{ fontSize: "16px" }}/>,
  },
  {
    name: "Inventory",
    path: "inventory",
    element: <Inventory />,
    icon: <ShoppingOutlined style={{ fontSize: "16px" }}/>,
  },
  {
    name: "Sell",
    path: "sell",
    element: <Sell />,
    icon: <DollarOutlined style={{ fontSize: "16px" }}/>,
  },
  {
    name: "Sales History",
    path: "sales-history",
    element: <SalesHistory />,
    icon: <HistoryOutlined style={{ fontSize: "16px" }}/>,
  },
  {
    path: "/duplicate_edit",
    element: <DuplicateAndEdit />,
  },
];

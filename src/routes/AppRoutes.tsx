import { Route, Routes } from "react-router";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
import { dashboardRoutes } from "./DashboardRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<MainLayout />}>
        {dashboardRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

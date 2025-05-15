import { Route, Routes } from "react-router"
import Login from "@/pages/Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "@/pages/Dashboard"
import DashboardRoutes from "./DashboardRoutes"
import MainLayout from "@/layout/MainLayout"

type Props = {}

export default function AppRoutes({}: Props) {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<MainLayout />} />
    </Routes>
  )
}
import MainLayout from '@/layout/MainLayout'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import { Route, Routes } from 'react-router'

type Props = {}

export default function DashboardRoutes({}: Props) {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}
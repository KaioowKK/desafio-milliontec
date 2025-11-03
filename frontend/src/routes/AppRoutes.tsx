import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ClientList from "../pages/Clients/ClientList";
import ClientForm from "../pages/Clients/ClientForm";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><ClientList /></ProtectedRoute>} />
    <Route path="/clients/new" element={<ProtectedRoute><ClientForm /></ProtectedRoute>} />
    <Route path="/clients/:id" element={<ProtectedRoute><ClientForm /></ProtectedRoute>} />
  </Routes>
);

export default AppRoutes;

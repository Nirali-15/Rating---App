import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Navbar
import Navbar from "./components/NavBar";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import StoresList from "./pages/admin/StoresList";
import AddStore from "./pages/admin/AddStore";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import CreateUserPage from "./pages/admin/CreateUserPage";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import Stores from "./pages/user/Stores";

// Owner pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Navbar for authenticated users */}
      {user && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:userId"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <CreateUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <StoresList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AddStore />
            </ProtectedRoute>
          }
        />

        {/* User routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/stores"
          element={
            <ProtectedRoute roles={["USER"]}>
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* Owner routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared: Update Password */}
        <Route
          path="/update-password"
          element={
            <ProtectedRoute roles={["USER", "OWNER"]}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={
            user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

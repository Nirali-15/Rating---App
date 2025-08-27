import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Store, Shield, UserRound, Key, Plus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">⭐ Roxiler Ratings</div>
      
      <div className="flex gap-6 items-center">
        {user && (
          <span className="mr-4 font-semibold">
            {user.role}: Hello {user.name}
          </span>
        )}

        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin" className="hover:text-yellow-400 flex items-center gap-1">
              <Shield size={18} /> Admin
            </Link>
            <Link to="/admin/users" className="hover:text-yellow-400 flex items-center gap-1">
              <UserRound size={18} /> Users
            </Link>
            <Link to="/admin/create-user" className="hover:text-yellow-400 flex items-center gap-1">
              <Plus size={18} /> Create User
            </Link>
            <Link to="/admin/stores" className="hover:text-yellow-400 flex items-center gap-1">
              <Store size={18} /> Stores
            </Link>
            <Link to="/admin/add-store" className="hover:text-yellow-400 flex items-center gap-1">
              <Plus size={18} /> Add Store
            </Link>
          </>
        )}
        {user?.role === "OWNER" && (
          <>
            <Link to="/owner/stores" className="hover:text-yellow-400 flex items-center gap-1">
              <Store size={18} /> My Store
            </Link>
            <Link to="/update-password" className="hover:text-yellow-400 flex items-center gap-1">
              <Key size={18} /> Update Password
            </Link>
          </>
        )}

        {user?.role === "USER" && (
          <>
            <Link to="/user/stores" className="hover:text-yellow-400 flex items-center gap-1">
              <UserRound size={18} /> Stores
            </Link>
            <Link to="/update-password" className="hover:text-yellow-400 flex items-center gap-1">
              <Key size={18} /> Update Password
            </Link>
          </>
        )}


        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
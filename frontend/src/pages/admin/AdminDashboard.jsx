import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-700 text-lg font-medium animate-pulse">
          Loading metrics...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Users */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-sm font-medium text-gray-600">Users</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {metrics.totalUsers}
            </p>
            <Link
              to="/admin/users"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              Manage Users
            </Link>
          </div>

          {/* Stores */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-sm font-medium text-gray-600">Stores</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {metrics.totalStores}
            </p>
            <Link
              to="/admin/stores"
              className="mt-4 inline-block text-sm text-blue-600 hover:underline"
            >
              Manage Stores
            </Link>
          </div>

          {/* Ratings */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-sm font-medium text-gray-600">Ratings</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {metrics.totalRatings}
            </p>
            <span className="mt-4 inline-block text-sm text-gray-500">
              (Read-only)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

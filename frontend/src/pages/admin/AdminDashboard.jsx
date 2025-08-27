import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        setStats({
          users: data.totalUsers,
          stores: data.totalStores,
          ratings: data.totalRatings,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Fetching dashboard info...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>

   
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Users */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 font-medium text-sm">Total Users</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">
              {stats.users}
            </p>
            <Link
              to="/admin/users"
              className="mt-4 block text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              View / Manage Users →
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 font-medium text-sm">Total Stores</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">
              {stats.stores}
            </p>
            <Link
              to="/admin/stores"
              className="mt-4 block text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              View / Manage Stores →
            </Link>
          </div>
{/* Ratings */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-gray-500 font-medium text-sm">Total Ratings</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">
              {stats.ratings}
            </p>
            <span className="mt-4 block text-gray-400 text-sm">
              (Read-only data)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

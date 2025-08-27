// src/pages/admin/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

const UserProfile = () => {
  const { userId } = useParams();
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const getUserDetails = async () => {
    try {
      const { data } = await api.get(`/admin/users/${userId}`);
      setDetails(data);
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  if (isFetching) {
    return (
      <div className="p-6 text-gray-600 text-lg">Fetching user info...</div>
    );
  }

  if (!details) {
    return (
      <div className="p-6 text-red-600 font-medium">⚠️ User not found</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      {/* Back Navigation */}
      <Link
        to="/admin/users"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to User List
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-6">
        User Information
      </h1>

      {/* User Info Card */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <p><span className="font-semibold">ID:</span> {details.id}</p>
        <p><span className="font-semibold">Name:</span> {details.name}</p>
        <p><span className="font-semibold">Email:</span> {details.email}</p>
        <p><span className="font-semibold">Address:</span> {details.address}</p>
        <p><span className="font-semibold">Role:</span> {details.role}</p>
      </div>

      {/* Stores Owned */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Owned Stores
        </h2>
        {details.stores?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">ID</th>
                  <th className="px-4 py-2 text-left border-b">Name</th>
                  <th className="px-4 py-2 text-left border-b">Address</th>
                </tr>
              </thead>
              <tbody>
                {details.stores.map((store, i) => (
                  <tr
                    key={store.id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-2 border-b">{store.id}</td>
                    <td className="px-4 py-2 border-b font-medium">{store.name}</td>
                    <td className="px-4 py-2 border-b">{store.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No stores owned</p>
        )}
      </div>

      {/* Ratings */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Ratings Submitted
        </h2>
        {details.ratings?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">ID</th>
                  <th className="px-4 py-2 text-left border-b">Score</th>
                  <th className="px-4 py-2 text-left border-b">Comment</th>
                </tr>
              </thead>
              <tbody>
                {details.ratings.map((rating, i) => (
                  <tr
                    key={rating.id}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-yellow-50 transition`}
                  >
                    <td className="px-4 py-2 border-b">{rating.id}</td>
                    <td className="px-4 py-2 border-b font-semibold text-yellow-600">
                      ⭐ {rating.score}
                    </td>
                    <td className="px-4 py-2 border-b">{rating.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No ratings submitted</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

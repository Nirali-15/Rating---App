import React, { useEffect, useState } from "react";
import api from "../../api/api";

const StoresList = () => {
  const [storeData, setStoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/admin/stores");
      setStoreData(data);
    } catch (error) {
      console.error("Could not load stores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-lg font-medium text-gray-600">Loading store records...</div>
    );
  }

  if (storeData.length === 0) {
    return (
      <div className="p-6 text-lg font-medium text-gray-600">No stores available.</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Stores</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left border-b">ID</th>
              <th className="px-4 py-3 text-left border-b">Name</th>
              <th className="px-4 py-3 text-left border-b">Email</th>
              <th className="px-4 py-3 text-left border-b">Address</th>
              <th className="px-4 py-3 text-left border-b">Owner</th>
              <th className="px-4 py-3 text-left border-b">Ratings</th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((store, idx) => (
              <tr
                key={store.id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-4 py-3 border-b">{store.id}</td>
                <td className="px-4 py-3 border-b font-medium">{store.name}</td>
                <td className="px-4 py-3 border-b text-blue-600">{store.email}</td>
                <td className="px-4 py-3 border-b">{store.address}</td>
                <td className="px-4 py-3 border-b">{store.ownerName}</td>
                <td className="px-4 py-3 border-b font-semibold">⭐ {store.ratingsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresList;

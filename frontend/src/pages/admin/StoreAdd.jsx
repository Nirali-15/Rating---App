import React, { useState } from "react";
import api from "../../api/api";

const AddStore = () => {
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");

  const handleAddStore = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      if (storeName.trim().length < 20 || storeName.trim().length > 60) {
        return setError("⚠️ Store name must be between 20–60 characters");
      }
      if (storeAddress.length > 400) {
        return setError("⚠️ Address must not exceed 400 characters");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(storeEmail)) {
        return setError("⚠️ Invalid email format");
      }

      await api.post("/admin/stores", {
        name: storeName,
        email: storeEmail,
        address: storeAddress,
        ownerId: owner,
      });

      e.target.reset(); // reset via form
      setStoreName("");
      setStoreEmail("");
      setStoreAddress("");
      setOwner("");

      alert("✅ Store successfully added!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-5 text-center">
          Register Store
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleAddStore} onReset={() => setError("")} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Store Name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none text-sm"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Store Email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none text-sm"
            value={storeEmail}
            onChange={(e) => setStoreEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Store Address (max 400 chars)"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none text-sm"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />

          <input
            type="number"
            placeholder="Owner ID"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none text-sm"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition"
            >
              Add Store
            </button>
            <button
              type="reset"
              className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-xl hover:bg-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStore;

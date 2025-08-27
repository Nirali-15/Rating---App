import React, { useState } from "react";
import api from "../../api/api";

const AddStore = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      if (name.length < 20 || name.length > 60)
        throw new Error("Store name must be 20–60 chars");
      if (address.length > 400)
        throw new Error("Address too long (max 400 chars)");

      await api.post("/admin/stores", { name, email, address, ownerId });

      setName("");
      setEmail("");
      setAddress("");
      setOwnerId("");
      alert("Store added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Add New Store
        </h1>
        <form onSubmit={handleAddStore} className="space-y-4">
          <input
            type="text"
            placeholder="Store Name (20–60 chars)"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-400 focus:border-gray-500 outline-none text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Store Email"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-400 focus:border-gray-500 outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Address (max 400 chars)"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-400 focus:border-gray-500 outline-none text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Owner ID"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-gray-400 focus:border-gray-500 outline-none text-sm"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-medium py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;

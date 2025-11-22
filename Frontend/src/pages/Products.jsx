import React, { useState } from "react";
import { Eye, Plus } from "lucide-react";

const Products = () => {
  // Product list with categories
  const products = [
    { name: "Laptop Pro", sku: "SKU-001", stock: 45, unit: "pcs", category: "Electronics" },
    { name: "Wireless Mouse", sku: "SKU-002", stock: 120, unit: "pcs", category: "Accessories" },
    { name: "USB-C Cable", sku: "SKU-003", stock: 8, unit: "pcs", category: "Accessories" },
    { name: 'Monitor 27"', sku: "SKU-004", stock: 32, unit: "pcs", category: "Electronics" },
    { name: "Office Chair", sku: "SKU-005", stock: 15, unit: "pcs", category: "Furniture" },
    { name: "Standing Desk", sku: "SKU-006", stock: 5, unit: "pcs", category: "Furniture" },
    { name: "Keyboard Pro", sku: "SKU-007", stock: 67, unit: "pcs", category: "Accessories" },
    { name: "Webcam HD", sku: "SKU-008", stock: 24, unit: "pcs", category: "Electronics" },
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Search state
  const [search, setSearch] = useState("");

  // Filter logic (name + SKU + category)
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white w-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-400 mt-1">Manage your inventory items</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 cursor-pointer bg-[#111111] hover:bg-[#1a1a1a] px-4 py-2 rounded-lg font-medium"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search bar */}
      <input
        placeholder="Search by name, SKU, or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#1c1c1c] border border-gray-700 rounded-lg px-4 py-3 mb-6 text-gray-300 placeholder-gray-500 focus:outline-none"
      />

      {/* Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#222] text-gray-300 border-b border-gray-700">
            <tr>
              <th className="py-4 px-6 font-semibold">Product Name</th>
              <th className="py-4 px-6 font-semibold">SKU</th>
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold">Stock</th>
              <th className="py-4 px-6 font-semibold">Unit</th>
              <th className="py-4 px-6 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-[#262626] transition"
                >
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item.sku}</td>

                  {/* Category Badge */}
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700 text-sm">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-4 px-6">{item.stock}</td>
                  <td className="py-4 px-6">{item.unit}</td>

                  <td className="py-4 px-6">
                    <button className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] w-full max-w-xl p-6 rounded-xl border border-gray-700 shadow-xl">

            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">

              <div>
                <label className="block text-gray-300 mb-1">Product Name</label>
                <input
                  type="text"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">SKU</label>
                <input
                  type="text"
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none"
                  placeholder="e.g., SKU-001"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-gray-300 mb-1">Category</label>
                <select className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300">
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Furniture</option>
                  <option>Others</option>
                </select>
              </div>

              {/* FLEX ROW */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Unit</label>
                  <select className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300">
                    <option>Pieces (pcs)</option>
                    <option>Kilograms (kg)</option>
                    <option>Boxes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                    defaultValue={0}
                  />
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(false)} // Replace with save logic later
                className="px-4 py-2 rounded-lg bg-[#111111] hover:[#1a1a1a] text-white"
              >
                Save Product
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Products;

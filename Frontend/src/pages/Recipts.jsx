import React, { useState } from "react";
import { Eye, Plus, CheckCircle, Clock, X } from "lucide-react";

const Receipts = () => {
  // Dummy receipt data
  const receipts = [
    {
      id: "REC-001",
      supplier: "Tech Supplies Inc",
      items: 12,
      status: "Validated",
      date: "2024-01-15",
    },
    {
      id: "REC-002",
      supplier: "Global Electronics",
      items: 8,
      status: "Draft",
      date: "2024-01-14",
    },
    {
      id: "REC-003",
      supplier: "Prime Distributor",
      items: 15,
      status: "Validated",
      date: "2024-01-13",
    },
  ];

  const statusStyles = {
    Validated: "bg-green-900/40 text-green-300 border border-green-700",
    Draft: "bg-yellow-900/40 text-yellow-300 border border-yellow-700",
  };

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Form States
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: "" },
  ]);

  // Add another product row
  const addItemRow = () => {
    setItems([...items, { product: "", quantity: "" }]);
  };

  // Remove item row
  const removeItemRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="text-white w-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Receipts</h1>
          <p className="text-gray-400 mt-1">Manage incoming stock receipts</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 cursor-pointer bg-[#111111] hover:bg-[#1a1a1a] px-4 py-2 rounded-lg font-medium"
        >
          <Plus size={18} /> Create Receipt
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#222] text-gray-300 border-b border-gray-700">
            <tr>
              <th className="py-4 px-6 font-semibold">Receipt ID</th>
              <th className="py-4 px-6 font-semibold">Supplier</th>
              <th className="py-4 px-6 font-semibold">Items Count</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold">Date</th>
              <th className="py-4 px-6 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-[#262626] transition"
              >
                <td className="py-4 px-6">{item.id}</td>
                <td className="py-4 px-6">{item.supplier}</td>
                <td className="py-4 px-6">{item.items}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${statusStyles[item.status]}`}
                  >
                    {item.status === "Validated" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6">{item.date}</td>
                <td className="py-4 px-6">
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
                    <Eye size={18} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =======================
          CREATE RECEIPT MODAL
      ==========================*/}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] w-full max-w-3xl p-6 rounded-xl border border-gray-700 shadow-xl">

            <h2 className="text-2xl font-semibold mb-4">Create Receipt</h2>

            {/* FORM */}
            <div className="flex flex-col gap-6">

              {/* Supplier */}
              <div>
                <label className="block text-gray-300 mb-1">Supplier Name</label>
                <input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none"
                  placeholder="Enter supplier name"
                />
              </div>

              {/* Products */}
              <div>
                <label className="block text-gray-300 mb-2">Products</label>

                {items.map((row, index) => (
                  <div key={index} className="flex items-center gap-4 mb-3">

                    {/* Product Select */}
                    <select
                      value={row.product}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index].product = e.target.value;
                        setItems(updated);
                      }}
                      className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                    >
                      <option value="">Select product</option>
                      <option value="Laptop Pro">Laptop Pro</option>
                      <option value="Wireless Mouse">Wireless Mouse</option>
                      <option value="USB-C Cable">USB-C Cable</option>
                      <option value="Monitor 27">Monitor 27"</option>
                    </select>

                    {/* Quantity */}
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index].quantity = e.target.value;
                        setItems(updated);
                      }}
                      placeholder="Quantity"
                      className="w-32 bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                    />

                    {/* Delete Row */}
                    <button onClick={() => removeItemRow(index)}>
                      <X className="text-red-500 hover:text-red-600" size={22} />
                    </button>
                  </div>
                ))}

                {/* Add Row Button */}
                <button
                  onClick={addItemRow}
                  className="mt-2 flex items-center gap-2 bg-gray-700/40 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-200"
                >
                  <Plus size={16} /> Add Another Item
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
              >
                Save Draft
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] text-white"
              >
                Validate Receipt
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Receipts;

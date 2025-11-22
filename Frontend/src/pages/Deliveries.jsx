import React from "react";
import { Eye, Plus, CheckCircle, Clock } from "lucide-react";

const Deliveries = () => {
  // Dummy data (replace with API later)
  const deliveries = [
    {
      id: "DEL-001",
      customer: "Acme Corp",
      items: 6,
      status: "Validated",
      date: "2024-01-15",
    },
    {
      id: "DEL-002",
      customer: "TechStart Ltd",
      items: 4,
      status: "Draft",
      date: "2024-01-14",
    },
    {
      id: "DEL-003",
      customer: "Global Services",
      items: 10,
      status: "Validated",
      date: "2024-01-13",
    },
  ];

  const statusStyles = {
    Validated: "bg-green-900/40 text-green-300 border border-green-700",
    Draft: "bg-yellow-900/40 text-yellow-300 border border-yellow-700",
  };

  return (
    <div className="text-white w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Deliveries</h1>
          <p className="text-gray-400 mt-1">Manage outgoing stock deliveries</p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium">
          <Plus size={18} /> Create Delivery
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#222] text-gray-300 border-b border-gray-700">
            <tr>
              <th className="py-4 px-6 font-semibold">Delivery ID</th>
              <th className="py-4 px-6 font-semibold">Customer</th>
              <th className="py-4 px-6 font-semibold">Items Count</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold">Date</th>
              <th className="py-4 px-6 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-[#262626] transition"
              >
                <td className="py-4 px-6">{item.id}</td>
                <td className="py-4 px-6">{item.customer}</td>
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
    </div>
  );
};

export default Deliveries;

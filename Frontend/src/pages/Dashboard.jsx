import React from "react";
import { Package, ClipboardCheck, Truck, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full text-gray-900">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-400">Your inventory insights are ready to explore.</p>
      </div>

      <div className=" p-6 rounded-xl  shadow-lg bg-[#ffe5f8]   items-center mb-10">

      <div className="grid grid-cols-1 text-white   md:grid-cols-2 xl:grid-cols-2 gap-6 ">

        
        <div className="bg-[#6a2658] p-6 rounded-xl border  border-gray-800 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total Stock</h2>

            <Package className="text-red-400" size={22} />
          </div>
          <p className="text-4xl font-bold mt-3">2,745</p>
          <p className="text-sm text-gray-400 mt-2">
            From last 276 stock added (7 days)
          </p>
        </div>

        <div className="bg-[#6a2658] p-6 rounded-xl border border-gray-800 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total Receipts</h2>
            <ClipboardCheck className="text-green-400" size={22} />
          </div>
          <p className="text-4xl font-bold mt-3">482</p>
          <p className="text-sm text-gray-400 mt-2">
            From last 16 receipts (7 days)
          </p>
        </div>

        
        <div className="bg-[#6a2658] p-6 rounded-xl border border-gray-800 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Deliveries</h2>
            <Truck className="text-yellow-400" size={22} />
          </div>
          <p className="text-4xl font-bold mt-3">96%</p>
          <p className="text-sm text-gray-400 mt-2">
            Delivery success rate over last 7 days
          </p>
        </div>

        <div className="bg-[#6a2658] p-6 rounded-xl border border-gray-800 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Low Stock Items</h2>
            <AlertTriangle className="text-red-400" size={22} />
          </div>
          <p className="text-4xl font-bold mt-3">14</p>
          <p className="text-sm text-gray-400 mt-2">
            Items need restocking soon
          </p>
        </div>

      </div>

</div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="bg-[#6a2658] p-6 rounded-xl border border-gray-800 shadow xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Items In & Out</h2>

          <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center text-gray-500">
            (Chart Placeholder)
          </div>
        </div>

        
        <div className="bg-[#6a2658] p-6 rounded-xl border border-gray-800 shadow">
          <h2 className="text-xl font-semibold mb-4">What are you looking for?</h2>
          <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center text-gray-500">
            (Image / Insights)
          </div>
        </div>

      </div>

      {/* Table Section */}
      <div className="bg-[#6a2658] mt-8 p-6 rounded-xl border border-gray-800 shadow">
        <h2 className="text-xl font-semibold text-white mb-4">Top Category Items</h2>

        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-[#ffe5f8]">
              <th className="py-2">Item Code</th>
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Stock</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#ffe5f8]">
              <td className="py-3">SM-001</td>
              <td className="py-3">Iphone 16</td>
              <td className="py-3">Smartphones</td>
              <td className="py-3">40</td>
              <td className="py-3 text-green-400">In Stock</td>
            </tr>

            <tr className="border-b border-[#ffe5f8]">
              <td className="py-3">SM-002</td>
              <td className="py-3">Samsung S23</td>
              <td className="py-3">Smartphones</td>
              <td className="py-3">0</td>
              <td className="py-3 text-red-400">Out of Stock</td>
            </tr>

            <tr>
              <td className="py-3">SM-003</td>
              <td className="py-3">iPad Mini</td>
              <td className="py-3">Tablets</td>
              <td className="py-3">5</td>
              <td className="py-3 text-yellow-400">Low Stock</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;

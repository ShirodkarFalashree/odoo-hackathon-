import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, Truck } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64  bg-[#121212] border-r border-gray-800 p-6 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 tracking-wider">IMS</h1>

      {/* Menu Links */}
      <nav className="flex flex-col gap-4 text-gray-300">
        
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-300"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-300"
            }`
          }
        >
          <Package size={20} />
          Products
        </NavLink>

        <NavLink
          to="/receipts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-300"
            }`
          }
        >
          <ClipboardList size={20} />
          Receipts
        </NavLink>

        <NavLink
          to="/deliveries"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
              isActive ? "bg-gray-800 text-white" : "text-gray-300"
            }`
          }
        >
          <Truck size={20} />
          Deliveries
        </NavLink>

      </nav>

      {/* Footer bottom section */}
    

    </aside>
  );
};

export default Sidebar;

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Recipts from "./pages/Recipts";
import Deliveries from "./pages/Deliveries";
import Footer from "./components/Footer";

// Pages


// const Layout = () => {
//   return (
//     <div className="flex bg-[#0f0f0f] text-white min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <main className="flex-1 p-6 overflow-y-auto bg-[#111]">
//         <Outlet />
//       </main>

//       <Footer/>
//     </div>
//   );
// };

const Layout = () => {
  return (
    <div className="flex bg-[#17181C] text-white min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT COLUMN */}
      <div className="flex flex-col flex-1 bg-[#17181C]">

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/receipts",
        element: <Recipts />,
      },
      {
        path: "/deliveries",
        element: <Deliveries />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

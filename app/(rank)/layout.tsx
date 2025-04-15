import HeaderStats from "@/components/Headers/HeaderStats";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/global.css"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
})  {
  return (
    <>
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64 bg-blueGray-100 relative">
          <AdminNavbar />
          <div className="px-4 md:px-10 mx-auto w-full m-24 relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

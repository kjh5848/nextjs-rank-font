import HeaderStats from "@/src/components/Headers/HeaderStats";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import "@/styles/global.css"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
})  {
  return (
    <>
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64 bg-blueGray-100 relative">
          <div className="px-4 md:px-10 mx-auto w-full m-24 relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

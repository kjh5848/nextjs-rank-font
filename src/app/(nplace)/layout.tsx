import HeaderStats from "@/src/components/common/Headers/HeaderStats";
import Sidebar from "@/src/components/common/Sidebar/Sidebar";
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
        <div className="lg:ml-60 relative">
          <div className="px-2 md:px-10 mx-auto w-full m-10 relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

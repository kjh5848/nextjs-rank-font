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
        <div className="relative xl:ml-60">
          <div className="relative m-10 mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

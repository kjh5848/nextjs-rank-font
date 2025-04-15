import IndexNavbar from "@/components/Navbar/IndexNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-rank-primary to-rank-secondary flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <div className="w-full">
        <IndexNavbar />
      </div>

      {/* 가운데 폼 정렬 */}
      <main className="flex flex-1 items-center justify-center w-full px-4">
        {children}
      </main>
    </div>
  );
}

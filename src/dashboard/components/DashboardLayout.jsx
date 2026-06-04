import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-6 md:p-8 space-y-6">

          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Reset search on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery("");
  }, [location.pathname]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}

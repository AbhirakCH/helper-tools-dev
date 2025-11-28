import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { categories } from "@/config/tools";
import { LayoutGrid, Box, FileCode, Globe, Terminal } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Crypto: Box,
  Converter: FileCode,
  Web: Globe,
  Development: Terminal,
};

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <LayoutGrid className="h-6 w-6" />
          <span>Dev-Tools</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              )
            }
          >
            <LayoutGrid className="h-4 w-4" />
            All Tools
          </NavLink>
          <div className="my-4 border-t" />
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
              Categories
            </h3>
            <div className="grid gap-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || Box;
                return (
                  <NavLink
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        isActive
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {category}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

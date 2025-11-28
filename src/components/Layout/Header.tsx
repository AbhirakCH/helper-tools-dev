import { Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
      <div className="w-full flex-1">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools... (Ctrl+K)"
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}

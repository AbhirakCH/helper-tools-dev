import { useOutletContext, Link, useParams } from "react-router-dom";
import { tools } from "@/config/tools";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const { category } = useParams<{ category?: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = category
      ? tool.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sort: Favorites first, then alphabetical
  const sortedTools = [...filteredTools].sort((a, b) => {
    const aFav = isFavorite(a.id);
    const bFav = isFavorite(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedTools.map((tool) => (
        <div key={tool.id} className="relative group">
          <Link to={`/tool/${tool.id}`}>
            <Card className="h-full cursor-pointer hover:border-primary/50 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tool.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
              isFavorite(tool.id) &&
                "opacity-100 text-yellow-500 hover:text-yellow-600"
            )}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(tool.id);
            }}
          >
            <Star
              className={cn("h-4 w-4", isFavorite(tool.id) && "fill-current")}
            />
            <span className="sr-only">Toggle favorite</span>
          </Button>
        </div>
      ))}
      {sortedTools.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-10">
          No tools found matching your criteria.
        </div>
      )}
    </div>
  );
}

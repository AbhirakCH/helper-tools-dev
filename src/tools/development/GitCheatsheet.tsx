import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GitCommand {
  command: string;
  description: string;
  category: string;
}

const commands: GitCommand[] = [
  {
    command: "git init",
    description: "Initialize a local Git repository",
    category: "Setup",
  },
  {
    command: "git clone [url]",
    description: "Clone a repository into a new directory",
    category: "Setup",
  },
  {
    command: "git status",
    description: "Check the status of the working tree",
    category: "Basic Snapshotting",
  },
  {
    command: "git add [file]",
    description: "Add a file to the staging area",
    category: "Basic Snapshotting",
  },
  {
    command: "git commit -m '[message]'",
    description: "Commit changes to the repository",
    category: "Basic Snapshotting",
  },
  {
    command: "git push",
    description: "Push changes to remote repository",
    category: "Sharing & Updating",
  },
  {
    command: "git pull",
    description:
      "Fetch from and integrate with another repository or a local branch",
    category: "Sharing & Updating",
  },
  {
    command: "git branch",
    description: "List, create, or delete branches",
    category: "Branching & Merging",
  },
  {
    command: "git checkout [branch]",
    description: "Switch branches or restore working tree files",
    category: "Branching & Merging",
  },
  {
    command: "git merge [branch]",
    description: "Join two or more development histories together",
    category: "Branching & Merging",
  },
  {
    command: "git log",
    description: "Show commit logs",
    category: "Inspection & Comparison",
  },
  {
    command: "git diff",
    description: "Show changes between commits, commit and working tree, etc",
    category: "Inspection & Comparison",
  },
  {
    command: "git stash",
    description: "Stash the changes in a dirty working directory away",
    category: "Patching",
  },
  {
    command: "git stash pop",
    description:
      "Apply the changes recorded in the stash to the working directory",
    category: "Patching",
  },
];

export default function GitCheatsheet() {
  const [search, setSearch] = useState("");

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(
    new Set(filteredCommands.map((cmd) => cmd.category))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Git Cheatsheet</CardTitle>
        <CardDescription>Common Git commands and their usage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Search Commands</Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by command, description, or category..."
          />
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold text-lg">{category}</h3>
              <div className="grid gap-2">
                {filteredCommands
                  .filter((cmd) => cmd.category === category)
                  .map((cmd) => (
                    <div
                      key={cmd.command}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <code className="font-mono text-sm bg-muted px-2 py-1 rounded mb-2 sm:mb-0">
                        {cmd.command}
                      </code>
                      <span className="text-sm text-muted-foreground text-right">
                        {cmd.description}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No commands found matching "{search}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

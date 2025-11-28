import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export default function BasicAuthGenerator() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (!username && !password) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeader("");
      return;
    }

    const token = btoa(`${username}:${password}`);
    setHeader(`Authorization: Basic ${token}`);
  }, [username, password]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(header);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Auth Generator</CardTitle>
        <CardDescription>
          Generate HTTP Basic Authentication header.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
        </div>

        {header && (
          <div className="space-y-2">
            <Label>Header</Label>
            <div className="flex gap-2">
              <Input value={header} readOnly className="font-mono" />
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

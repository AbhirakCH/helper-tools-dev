import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";

export default function JwtParser() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeader("");
      setPayload("");
      setError("");
      return;
    }

    try {
      const decodedHeader = jwtDecode(input, { header: true });
      const decodedPayload = jwtDecode(input);

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError("");
    } catch {
      setError("Invalid JWT token");
      setHeader("");
      setPayload("");
    }
  }, [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>JWT Parser</CardTitle>
        <CardDescription>
          Decode JWT tokens (header, payload) without verification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>JWT Token</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="min-h-[100px] font-mono"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Header</Label>
            <Textarea
              value={header}
              readOnly
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label>Payload</Label>
            <Textarea
              value={payload}
              readOnly
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

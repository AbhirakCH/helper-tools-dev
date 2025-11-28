import { useState } from "react";
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

export default function IntegerBaseConverter() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [hex, setHex] = useState("");

  const updateValues = (value: string, base: number) => {
    if (!value) {
      setDecimal("");
      setBinary("");
      setOctal("");
      setHex("");
      return;
    }

    try {
      const num = parseInt(value, base);
      if (isNaN(num)) return;

      if (base !== 10) setDecimal(num.toString(10));
      if (base !== 2) setBinary(num.toString(2));
      if (base !== 8) setOctal(num.toString(8));
      if (base !== 16) setHex(num.toString(16).toUpperCase());
    } catch {
      // Ignore errors
    }
  };

  const handleChange = (value: string, base: number) => {
    switch (base) {
      case 10:
        setDecimal(value);
        break;
      case 2:
        setBinary(value);
        break;
      case 8:
        setOctal(value);
        break;
      case 16:
        setHex(value);
        break;
    }
    updateValues(value, base);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integer Base Converter</CardTitle>
        <CardDescription>
          Convert numbers between Decimal, Binary, Octal, and Hexadecimal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Decimal (Base 10)</Label>
            <div className="flex gap-2">
              <Input
                value={decimal}
                onChange={(e) => handleChange(e.target.value, 10)}
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(decimal)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Binary (Base 2)</Label>
            <div className="flex gap-2">
              <Input
                value={binary}
                onChange={(e) => handleChange(e.target.value, 2)}
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(binary)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Octal (Base 8)</Label>
            <div className="flex gap-2">
              <Input
                value={octal}
                onChange={(e) => handleChange(e.target.value, 8)}
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(octal)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hexadecimal (Base 16)</Label>
            <div className="flex gap-2">
              <Input
                value={hex}
                onChange={(e) => handleChange(e.target.value, 16)}
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(hex)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
import { colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import namesPlugin from "colord/plugins/names";

extend([cmykPlugin, namesPlugin]);

export default function ColorConverter() {
  const [input, setInput] = useState("#000000");
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");
  const [cmyk, setCmyk] = useState("device-cmyk(0% 0% 0% 100%)");
  const [name, setName] = useState("black");

  useEffect(() => {
    const color = colord(input);
    if (color.isValid()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHex(color.toHex());
      setRgb(color.toRgbString());
      setHsl(color.toHslString());
      setCmyk(color.toCmykString());
      setName(color.toName({ closest: true }) || "Unknown");
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
        <CardDescription>
          Convert colors between HEX, RGB, HSL, CMYK, and Name.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div
            className="w-24 h-24 rounded-md border shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1 space-y-2">
            <Label>Input Color</Label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="#000000 or rgb(0,0,0) or black"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>HEX</Label>
            <div className="flex gap-2">
              <Input value={hex} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(hex)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>RGB</Label>
            <div className="flex gap-2">
              <Input value={rgb} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(rgb)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>HSL</Label>
            <div className="flex gap-2">
              <Input value={hsl} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(hsl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>CMYK</Label>
            <div className="flex gap-2">
              <Input value={cmyk} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(cmyk)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Name (Closest)</Label>
            <div className="flex gap-2">
              <Input value={name} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(name)}
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

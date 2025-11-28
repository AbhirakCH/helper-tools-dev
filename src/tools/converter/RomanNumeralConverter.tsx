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
import { Copy, ArrowRightLeft } from "lucide-react";

export default function RomanNumeralConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toRoman" | "toNumber">("toRoman");

  const toRoman = (num: number) => {
    if (num < 1 || num > 3999) return "Error: Number out of range (1-3999)";
    const lookup: { [key: string]: number } = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let roman = "";
    for (const i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const fromRoman = (str: string) => {
    const lookup: { [key: string]: number } = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1,
    };
    let num = 0;
    let i = 0;
    while (i < str.length) {
      const current = lookup[str[i]];
      const next = lookup[str[i + 1]];
      if (next && current < next) {
        num += next - current;
        i += 2;
      } else {
        num += current;
        i += 1;
      }
    }
    return isNaN(num) ? "Error: Invalid Roman Numeral" : num.toString();
  };

  const convert = () => {
    if (!input) {
      setOutput("");
      return;
    }

    if (mode === "toRoman") {
      const num = parseInt(input);
      if (isNaN(num)) {
        setOutput("Error: Invalid number");
      } else {
        setOutput(toRoman(num));
      }
    } else {
      setOutput(fromRoman(input.toUpperCase()));
    }
  };

  const toggleMode = () => {
    setMode(mode === "toRoman" ? "toNumber" : "toRoman");
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roman Numeral Converter</CardTitle>
        <CardDescription>
          Convert integers to Roman numerals and vice versa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch to{" "}
            {mode === "toRoman" ? "Roman to Number" : "Number to Roman"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toRoman" ? "Number" : "Roman Numeral"}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(input)}
                disabled={!input}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "toRoman" ? "e.g. 2023" : "e.g. MMXXIII"}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toRoman" ? "Roman Numeral" : "Number"}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(output)}
                disabled={!output}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Input
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="bg-muted"
            />
          </div>
        </div>

        <Button onClick={convert} className="w-full">
          Convert
        </Button>
      </CardContent>
    </Card>
  );
}

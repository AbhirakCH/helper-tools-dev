import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DeviceInformation() {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const getInfo = () => {
      setInfo({
        "Screen Width": `${window.screen.width}px`,
        "Screen Height": `${window.screen.height}px`,
        "Window Width": `${window.innerWidth}px`,
        "Window Height": `${window.innerHeight}px`,
        "Color Depth": `${window.screen.colorDepth} bits`,
        "Pixel Ratio": `${window.devicePixelRatio}`,
        "User Agent": navigator.userAgent,
        Language: navigator.language,
        Platform: navigator.platform,
        "Cookies Enabled": navigator.cookieEnabled ? "Yes" : "No",
      });
    };

    getInfo();
    window.addEventListener("resize", getInfo);
    return () => window.removeEventListener("resize", getInfo);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Information</CardTitle>
        <CardDescription>
          Display current device information (screen size, pixel ratio, user
          agent).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(info).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label>{key}</Label>
              <Input value={value} readOnly />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

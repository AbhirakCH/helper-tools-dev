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
import { Progress } from "@/components/ui/progress";
// import * as OTPAuth from "otpauth";

export default function OtpGenerator() {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!secret) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeLeft(0);
      return;
    }

    const generate = () => {
      try {
        // Clean secret (remove spaces)
        // const cleanSecret = secret.replace(/\s/g, "");
        // const totp = new OTPAuth.TOTP({
        //   secret: cleanSecret,
        //   algorithm: "SHA1",
        //   digits: 6,
        //   period: 30,
        // });

        // setToken(totp.generate());
        setToken("DISABLED");

        const period = 30;
        const epoch = Math.floor(Date.now() / 1000);
        const count = epoch % period;
        setTimeLeft(period - count);
      } catch {
        setToken("Invalid Secret");
        setTimeLeft(0);
      }
    };

    generate();
    const interval = setInterval(generate, 1000);
    return () => clearInterval(interval);
  }, [secret]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>OTP Code Generator</CardTitle>
        <CardDescription>
          Generate TOTP codes based on a secret key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Secret Key (Base32)</Label>
          <Input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="JBSWY3DPEHPK3PXP"
            className="font-mono"
          />
        </div>

        {token && (
          <div className="space-y-4 text-center">
            <div className="text-4xl font-mono font-bold tracking-widest">
              {token}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Expires in</span>
                <span>{timeLeft}s</span>
              </div>
              <Progress value={(timeLeft / 30) * 100} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

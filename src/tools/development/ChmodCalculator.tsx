import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ChmodCalculator() {
  const [owner, setOwner] = useState({ r: false, w: false, x: false });
  const [group, setGroup] = useState({ r: false, w: false, x: false });
  const [public_, setPublic] = useState({ r: false, w: false, x: false });
  const [octal, setOctal] = useState("000");
  const [symbolic, setSymbolic] = useState("---------");

  useEffect(() => {
    const calculateOctal = (p: { r: boolean; w: boolean; x: boolean }) => {
      let val = 0;
      if (p.r) val += 4;
      if (p.w) val += 2;
      if (p.x) val += 1;
      return val;
    };

    const o = calculateOctal(owner);
    const g = calculateOctal(group);
    const p = calculateOctal(public_);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOctal(`${o}${g}${p}`);

    const calculateSymbolic = (p: { r: boolean; w: boolean; x: boolean }) => {
      return `${p.r ? "r" : "-"}${p.w ? "w" : "-"}${p.x ? "x" : "-"}`;
    };
    setSymbolic(
      `${calculateSymbolic(owner)}${calculateSymbolic(
        group
      )}${calculateSymbolic(public_)}`
    );
  }, [owner, group, public_]);

  const handleOctalChange = (val: string) => {
    if (val.length > 3) return;
    if (!/^[0-7]*$/.test(val)) return;

    setOctal(val);
    if (val.length === 3) {
      const parse = (char: string) => {
        const n = parseInt(char);
        return {
          r: (n & 4) !== 0,
          w: (n & 2) !== 0,
          x: (n & 1) !== 0,
        };
      };
      setOwner(parse(val[0]));
      setGroup(parse(val[1]));
      setPublic(parse(val[2]));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chmod Calculator</CardTitle>
        <CardDescription>
          Calculate chmod permissions in octal and symbolic formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="font-semibold"></div>
          <div className="font-semibold">Owner</div>
          <div className="font-semibold">Group</div>
          <div className="font-semibold">Public</div>

          <div className="text-left font-medium">Read (4)</div>
          <div className="flex justify-center">
            <Checkbox
              checked={owner.r}
              onCheckedChange={(c: boolean | string) =>
                setOwner({ ...owner, r: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={group.r}
              onCheckedChange={(c: boolean | string) =>
                setGroup({ ...group, r: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={public_.r}
              onCheckedChange={(c: boolean | string) =>
                setPublic({ ...public_, r: !!c })
              }
            />
          </div>

          <div className="text-left font-medium">Write (2)</div>
          <div className="flex justify-center">
            <Checkbox
              checked={owner.w}
              onCheckedChange={(c: boolean | string) =>
                setOwner({ ...owner, w: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={group.w}
              onCheckedChange={(c: boolean | string) =>
                setGroup({ ...group, w: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={public_.w}
              onCheckedChange={(c: boolean | string) =>
                setPublic({ ...public_, w: !!c })
              }
            />
          </div>

          <div className="text-left font-medium">Execute (1)</div>
          <div className="flex justify-center">
            <Checkbox
              checked={owner.x}
              onCheckedChange={(c: boolean | string) =>
                setOwner({ ...owner, x: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={group.x}
              onCheckedChange={(c: boolean | string) =>
                setGroup({ ...group, x: !!c })
              }
            />
          </div>
          <div className="flex justify-center">
            <Checkbox
              checked={public_.x}
              onCheckedChange={(c: boolean | string) =>
                setPublic({ ...public_, x: !!c })
              }
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-4 border-t">
          <div className="space-y-2">
            <Label>Octal</Label>
            <Input
              value={octal}
              onChange={(e) => handleOctalChange(e.target.value)}
              className="font-mono text-2xl text-center tracking-widest"
              maxLength={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Symbolic</Label>
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xl text-center tracking-widest items-center justify-center">
              {symbolic}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

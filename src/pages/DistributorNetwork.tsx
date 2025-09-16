import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, FarmerRecord, RetailerRecord } from "@/lib/db";

const DistributorNetwork = () => {
  const [farmers, setFarmers] = useState<FarmerRecord[]>([]);
  const [retailers, setRetailers] = useState<RetailerRecord[]>([]);

  useEffect(() => {
    const load = async () => {
      const f = await db.farmers.orderBy("createdAt").reverse().toArray();
      setFarmers(f);
      const r = await db.retailers.orderBy("createdAt").reverse().toArray();
      setRetailers(r);
      if (r.length === 0) {
        // Seed a couple of retailers if none exist
        const seed: RetailerRecord[] = [
          { name: "Odisha Fresh Mart", town: "Bhubaneswar", pincode: "751001", createdAt: Date.now() },
          { name: "Jagannath Grocers", town: "Puri", pincode: "752001", createdAt: Date.now() },
        ];
        await db.retailers.bulkAdd(seed);
        setRetailers(await db.retailers.orderBy("createdAt").reverse().toArray());
      }
    };
    load();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Distributor Network</h1>
            <p className="text-muted-foreground">Your connected farmers and retailers</p>
          </div>
          <Link to="/distributor">
            <Button variant="outline">Back to Distributor</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Farmers</CardTitle>
              <CardDescription>Farmers you supply to or collect from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {farmers.length === 0 && (
                  <div className="text-sm text-muted-foreground">No farmers yet. Add one from the Distributor page.</div>
                )}
                {farmers.map((f) => (
                  <div key={f.id} className="flex items-center justify-between p-3 rounded-md border bg-background">
                    <div>
                      <div className="font-medium">{f.name}</div>
                      <div className="text-sm text-muted-foreground">Qty {f.quantity} • Fert {f.fertilizerAmount} • PIN {f.pincode}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[60ch]">{f.address}</div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retailers</CardTitle>
              <CardDescription>Retail partners receiving your batches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {retailers.length === 0 && (
                  <div className="text-sm text-muted-foreground">No retailers yet. Seeded examples will appear after refresh.</div>
                )}
                {retailers.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-md border bg-background">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{r.town} • PIN {r.pincode}</div>
                    </div>
                    <Badge variant="blockchain">Verified</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DistributorNetwork;


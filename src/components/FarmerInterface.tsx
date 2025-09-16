import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Upload, Coins, FileText, QrCode, CheckCircle, Activity, Brain, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DigitalTwin } from "./DigitalTwin";
import { AIDecisionLayer } from "./AIDecisionLayer";

interface Batch {
  id: string;
  cropType: string;
  quantity: number;
  status: 'registered' | 'in-transit' | 'delivered' | 'paid';
  qrCode: string;
  payment: number;
}

export const FarmerInterface = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<Batch[]>([
    { id: "BATCH001", cropType: "Tomatoes", quantity: 100, status: "paid", qrCode: "QR001", payment: 5000 },
    { id: "BATCH002", cropType: "Rice", quantity: 500, status: "in-transit", qrCode: "QR002", payment: 0 },
  ]);
  
  const [newBatch, setNewBatch] = useState({
    cropType: "",
    quantity: "",
    quality: "",
    pesticides: ""
  });

  const handleCreateBatch = () => {
    if (!newBatch.cropType || !newBatch.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in crop type and quantity",
        variant: "destructive"
      });
      return;
    }

    const batchId = `BATCH${String(batches.length + 1).padStart(3, '0')}`;
    const newBatchData: Batch = {
      id: batchId,
      cropType: newBatch.cropType,
      quantity: parseInt(newBatch.quantity),
      status: 'registered',
      qrCode: `QR${String(batches.length + 1).padStart(3, '0')}`,
      payment: 0
    };

    setBatches(prev => [...prev, newBatchData]);
    setNewBatch({ cropType: "", quantity: "", quality: "", pesticides: "" });
    
    toast({
      title: "Batch Registered Successfully!",
      description: `Batch ${batchId} registered on blockchain`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'delivered': return 'blockchain';
      case 'in-transit': return 'warning';
      default: return 'secondary';
    }
  };

  const totalEarnings = batches.reduce((sum, batch) => sum + batch.payment, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sprout className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
        <span className="text-sm text-muted-foreground">କୃଷକ ଡ୍ୟାସବୋର୍ଡ</span>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <Sprout className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="digital-twin">
            <Activity className="h-4 w-4 mr-2" />
            Digital Twin
          </TabsTrigger>
          <TabsTrigger value="ai-decisions">
            <Brain className="h-4 w-4 mr-2" />
            AI Decisions
          </TabsTrigger>
          <TabsTrigger value="community">
            <Users className="h-4 w-4 mr-2" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-xl font-bold">₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <QrCode className="h-5 w-5 text-blockchain" />
              <div>
                <p className="text-sm text-muted-foreground">Active Batches</p>
                <p className="text-xl font-bold">{batches.filter(b => b.status !== 'paid').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completed Orders</p>
                <p className="text-xl font-bold">{batches.filter(b => b.status === 'paid').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Register New Batch */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Register New Batch
          </CardTitle>
          <CardDescription>
            Create a new batch and upload quality certificates to blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cropType">Crop Type / ଫସଲ ପ୍ରକାର</Label>
              <Input 
                id="cropType"
                value={newBatch.cropType}
                onChange={(e) => setNewBatch(prev => ({ ...prev, cropType: e.target.value }))}
                placeholder="e.g., Tomatoes, Rice, Wheat"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity (kg) / ପରିମାଣ</Label>
              <Input 
                id="quantity"
                type="number"
                value={newBatch.quantity}
                onChange={(e) => setNewBatch(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="Enter quantity in kg"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="quality">Quality Certificate / ଗୁଣବତ୍ତା ପ୍ରମାଣପତ୍ର</Label>
            <Textarea 
              id="quality"
              value={newBatch.quality}
              onChange={(e) => setNewBatch(prev => ({ ...prev, quality: e.target.value }))}
              placeholder="Describe quality standards, organic certification, etc."
            />
          </div>
          
          <div>
            <Label htmlFor="pesticides">Pesticide Report / କୀଟନାଶକ ରିପୋର୍ଟ</Label>
            <Textarea 
              id="pesticides"
              value={newBatch.pesticides}
              onChange={(e) => setNewBatch(prev => ({ ...prev, pesticides: e.target.value }))}
              placeholder="List pesticides used, application dates, safety compliance"
            />
          </div>
          
          <Button onClick={handleCreateBatch} variant="farmer" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Register Batch on Blockchain
          </Button>
        </CardContent>
      </Card>

      {/* Existing Batches */}
      <Card>
        <CardHeader>
          <CardTitle>My Batches</CardTitle>
          <CardDescription>Track your registered batches and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {batches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{batch.id}</p>
                    <p className="text-sm text-muted-foreground">{batch.cropType} - {batch.quantity}kg</p>
                  </div>
                  <Badge variant={getStatusColor(batch.status) as any}>
                    {batch.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{batch.payment.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{batch.qrCode}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="digital-twin">
          <DigitalTwin batchId="BATCH001" />
        </TabsContent>

        <TabsContent value="ai-decisions">
          <AIDecisionLayer batchId="BATCH001" />
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Features
              </CardTitle>
              <CardDescription>
                Connect with other farmers and agricultural experts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Share Knowledge</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Post your farming tips and success stories
                    </p>
                    <Button variant="outline" size="sm">Share Your Experience</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Get Expert Help</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Consult with agricultural experts for personalized advice
                    </p>
                    <Button variant="outline" size="sm">Ask an Expert</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Market Insights</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get real-time market prices and demand forecasts
                    </p>
                    <Button variant="outline" size="sm">View Market Data</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Weather Alerts</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Receive AI-powered weather predictions and farming recommendations
                    </p>
                    <Button variant="outline" size="sm">Get Weather Alerts</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

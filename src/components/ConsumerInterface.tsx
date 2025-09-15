import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Smartphone, QrCode, Leaf, Shield, MapPin, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupplyChainStep {
  role: string;
  name: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
}

interface ProductInfo {
  batchId: string;
  cropType: string;
  quantity: number;
  farmer: {
    name: string;
    location: string;
    contact: string;
  };
  quality: {
    organic: boolean;
    pesticides: string[];
    certifications: string[];
  };
  journey: SupplyChainStep[];
}

const mockProductData: ProductInfo = {
  batchId: "BATCH001",
  cropType: "Organic Tomatoes",
  quantity: 100,
  farmer: {
    name: "Ramesh Kumar",
    location: "Bhubaneswar, Odisha",
    contact: "+91 98765 43210"
  },
  quality: {
    organic: true,
    pesticides: ["Neem Oil", "Organic Spray"],
    certifications: ["Organic India", "Government Quality Seal"]
  },
  journey: [
    {
      role: "Farmer",
      name: "Ramesh Kumar",
      location: "Bhubaneswar Farm",
      timestamp: "2024-01-15 08:00",
      status: 'completed'
    },
    {
      role: "Distributor", 
      name: "Green Supply Co.",
      location: "Cuttack Warehouse",
      timestamp: "2024-01-16 14:30",
      status: 'completed'
    },
    {
      role: "Retailer",
      name: "Fresh Market",
      location: "Bhubaneswar Store",
      timestamp: "2024-01-17 10:15",
      status: 'active'
    }
  ]
};

export const ConsumerInterface = () => {
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState("");
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanQR = () => {
    if (!qrCode.trim()) {
      toast({
        title: "Enter QR Code",
        description: "Please enter a QR code to scan",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setProductInfo(mockProductData);
      setIsScanning(false);
      toast({
        title: "Product Found!",
        description: "Supply chain information loaded successfully"
      });
    }, 1500);
  };

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'blockchain';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Smartphone className="h-6 w-6 text-success" />
        <h2 className="text-2xl font-bold">Consumer Portal</h2>
        <span className="text-sm text-muted-foreground">ଗ୍ରାହକ ପୋର୍ଟାଲ</span>
      </div>

      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Scan Product QR Code
          </CardTitle>
          <CardDescription>
            Enter or scan the QR code on your product to trace its journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Enter QR code (try: QR001)"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleScanQR} 
              variant="success"
              disabled={isScanning}
            >
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Try entering "QR001" to see sample data
          </p>
        </CardContent>
      </Card>

      {/* Product Information */}
      {productInfo && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Batch ID</Label>
                  <p className="font-mono text-lg">{productInfo.batchId}</p>
                </div>
                <div>
                  <Label>Product</Label>
                  <p className="text-lg">{productInfo.cropType}</p>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <p>{productInfo.quantity} kg</p>
                </div>
                <div>
                  <Label>Quality Status</Label>
                  <div className="flex gap-2 mt-1">
                    {productInfo.quality.organic && (
                      <Badge variant="success">Organic Certified</Badge>
                    )}
                    <Badge variant="blockchain">Blockchain Verified</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farmer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Farmer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Farmer Name</Label>
                  <p>{productInfo.farmer.name}</p>
                </div>
                <div>
                  <Label>Farm Location</Label>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {productInfo.farmer.location}
                  </p>
                </div>
                <div>
                  <Label>Contact</Label>
                  <p>{productInfo.farmer.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality & Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Quality & Safety Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Pesticides Used</Label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {productInfo.quality.pesticides.map((pesticide, index) => (
                    <Badge key={index} variant="outline">{pesticide}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Certifications</Label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {productInfo.quality.certifications.map((cert, index) => (
                    <Badge key={index} variant="success">{cert}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supply Chain Journey */}
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Journey</CardTitle>
              <CardDescription>Trace the complete path from farm to your table</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productInfo.journey.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        step.status === 'completed' ? 'bg-success' :
                        step.status === 'active' ? 'bg-blockchain' : 'bg-muted'
                      }`} />
                      {index < productInfo.journey.length - 1 && (
                        <div className="w-0.5 h-8 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{step.role}: {step.name}</p>
                        <Badge variant={getStepStatus(step.status) as any}>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {step.location}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {step.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm font-medium text-muted-foreground mb-1 ${className}`}>{children}</p>
);
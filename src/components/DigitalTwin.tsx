import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Leaf, 
  TrendingUp, 
  Eye, 
  Brain,
  Layers,
  AlertTriangle,
  Target
} from "lucide-react";

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  pH: number;
  light: number;
  timestamp: string;
}

interface CropHealth {
  overall: number;
  growth: number;
  disease: number;
  stress: number;
}

interface Predictions {
  harvestDate: string;
  estimatedYield: number;
  qualityScore: number;
  marketPrice: number;
  recommendations: string[];
}

export const DigitalTwin = ({ batchId }: { batchId: string }) => {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 72,
    pH: 6.8,
    light: 85,
    timestamp: new Date().toLocaleString()
  });

  const [cropHealth, setCropHealth] = useState<CropHealth>({
    overall: 87,
    growth: 92,
    disease: 5,
    stress: 12
  });

  const [predictions, setPredictions] = useState<Predictions>({
    harvestDate: "2024-02-15",
    estimatedYield: 95,
    qualityScore: 88,
    marketPrice: 45,
    recommendations: [
      "Increase irrigation by 15% in next 3 days",
      "Apply organic fertilizer next week",
      "Monitor for pest activity near flowering stage",
      "Optimal harvest window: Feb 12-18"
    ]
  });

  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: 25 + Math.random() * 8,
        humidity: 60 + Math.random() * 20,
        soilMoisture: 65 + Math.random() * 20,
        pH: 6.5 + Math.random() * 0.8,
        light: 80 + Math.random() * 20,
        timestamp: new Date().toLocaleString()
      }));

      setCropHealth(prev => ({
        ...prev,
        overall: Math.max(80, Math.min(95, prev.overall + (Math.random() - 0.5) * 2)),
        growth: Math.max(85, Math.min(98, prev.growth + (Math.random() - 0.5) * 1)),
        disease: Math.max(0, Math.min(15, prev.disease + (Math.random() - 0.5) * 2)),
        stress: Math.max(5, Math.min(25, prev.stress + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const getSensorStatus = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return "success";
    if (value > max * 1.1 || value < min * 0.9) return "destructive";
    return "warning";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Digital Twin - {batchId}</h2>
          <Badge variant="blockchain">Multi-Layered System</Badge>
        </div>
        <Button 
          variant={isLiveMode ? "destructive" : "success"}
          onClick={() => setIsLiveMode(!isLiveMode)}
        >
          <Activity className="h-4 w-4 mr-2" />
          {isLiveMode ? "Stop Live Data" : "Start Live Data"}
        </Button>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="physical">
            <Thermometer className="h-4 w-4 mr-2" />
            Physical
          </TabsTrigger>
          <TabsTrigger value="digital">
            <Activity className="h-4 w-4 mr-2" />
            Digital
          </TabsTrigger>
          <TabsTrigger value="predictive">
            <Brain className="h-4 w-4 mr-2" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="consumer">
            <Eye className="h-4 w-4 mr-2" />
            Consumer View
          </TabsTrigger>
        </TabsList>

        {/* Physical Layer */}
        <TabsContent value="physical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                Real-Time IoT Sensor Data
              </CardTitle>
              <CardDescription>
                Live environmental conditions from field sensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Temperature</span>
                    <Badge variant={getSensorStatus(sensorData.temperature, 20, 35) as any}>
                      {sensorData.temperature.toFixed(1)}°C
                    </Badge>
                  </div>
                  <Progress value={(sensorData.temperature / 40) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Humidity</span>
                    <Badge variant={getSensorStatus(sensorData.humidity, 50, 80) as any}>
                      {sensorData.humidity.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={sensorData.humidity} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Soil Moisture</span>
                    <Badge variant={getSensorStatus(sensorData.soilMoisture, 60, 85) as any}>
                      {sensorData.soilMoisture.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={sensorData.soilMoisture} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Soil pH</span>
                    <Badge variant={getSensorStatus(sensorData.pH, 6.0, 7.5) as any}>
                      {sensorData.pH.toFixed(1)}
                    </Badge>
                  </div>
                  <Progress value={(sensorData.pH / 10) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Light Intensity</span>
                    <Badge variant={getSensorStatus(sensorData.light, 70, 95) as any}>
                      {sensorData.light.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={sensorData.light} className="h-2" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Last updated: {sensorData.timestamp}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Crop Health Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">
                    {cropHealth.overall}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Health</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {cropHealth.growth}%
                  </div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-2">
                    {cropHealth.disease}%
                  </div>
                  <p className="text-sm text-muted-foreground">Disease Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">
                    {cropHealth.stress}%
                  </div>
                  <p className="text-sm text-muted-foreground">Stress Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Digital Layer */}
        <TabsContent value="digital" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Records</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Batch Registration</span>
                  <Badge variant="success">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Quality Certificate</span>
                  <Badge variant="blockchain">On IPFS</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Ownership Transfer</span>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Initial Value:</span>
                    <span className="font-mono">₹4,750</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Premium:</span>
                    <span className="font-mono text-success">+₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport Cost:</span>
                    <span className="font-mono text-destructive">-₹250</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Current Value:</span>
                    <span className="font-mono">₹5,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictive Layer */}
        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blockchain" />
                AI Predictions & Insights
              </CardTitle>
              <CardDescription>
                Machine learning models analyze patterns to forecast outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Optimal Harvest Date</Label>
                    <p className="text-lg font-semibold text-primary">{predictions.harvestDate}</p>
                  </div>
                  <div>
                    <Label>Estimated Yield</Label>
                    <div className="flex items-center gap-2">
                      <Progress value={predictions.estimatedYield} className="flex-1" />
                      <span className="text-sm font-semibold">{predictions.estimatedYield}%</span>
                    </div>
                  </div>
                  <div>
                    <Label>Quality Score</Label>
                    <div className="flex items-center gap-2">
                      <Progress value={predictions.qualityScore} className="flex-1" />
                      <span className="text-sm font-semibold">{predictions.qualityScore}/100</span>
                    </div>
                  </div>
                  <div>
                    <Label>Predicted Market Price</Label>
                    <p className="text-lg font-semibold text-success">₹{predictions.marketPrice}/kg</p>
                  </div>
                </div>

                <div>
                  <Label>AI Recommendations</Label>
                  <div className="space-y-2 mt-2">
                    {predictions.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                        <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-2">Low</div>
                  <p className="text-sm text-muted-foreground">Weather Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-2">Medium</div>
                  <p className="text-sm text-muted-foreground">Market Risk</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-2">Low</div>
                  <p className="text-sm text-muted-foreground">Disease Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consumer View */}
        <TabsContent value="consumer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-success" />
                Consumer AR Visualization
              </CardTitle>
              <CardDescription>
                Augmented reality view of the crop journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/10 to-success/10 rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🌱</div>
                  <h3 className="text-xl font-semibold">3D Crop Journey</h3>
                  <p className="text-muted-foreground">
                    Interactive AR visualization showing crop growth from seed to harvest
                  </p>
                  <Button variant="success" className="mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    Launch AR View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">A+</div>
                  <p className="text-sm text-muted-foreground">Environmental Impact</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carbon Footprint</span>
                      <Badge variant="success">Minimal</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Water Usage</span>
                      <Badge variant="success">Efficient</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Organic Compliance</span>
                      <Badge variant="success">Certified</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutritional Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Vitamin C</span>
                    <span className="text-sm font-semibold">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Antioxidants</span>
                    <span className="text-sm font-semibold">Very High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fiber Content</span>
                    <span className="text-sm font-semibold">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pesticide Residue</span>
                    <span className="text-sm font-semibold text-success">None Detected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-muted-foreground mb-1">{children}</p>
);
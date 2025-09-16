import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap,
  Calendar,
  DollarSign,
  Bug,
  Droplets,
  ThermometerSun
} from "lucide-react";

interface OptimalDecision {
  type: 'harvest' | 'irrigation' | 'fertilizer' | 'pest_control';
  confidence: number;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
  timing: string;
  reasoning: string[];
}

interface MarketForecast {
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  demand: 'high' | 'medium' | 'low';
  competition: number;
  bestSellDate: string;
}

interface RiskAlert {
  type: 'weather' | 'disease' | 'market' | 'quality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  description: string;
  preventiveMeasures: string[];
}

export const AIDecisionLayer = ({ batchId }: { batchId: string }) => {
  const [decisions, setDecisions] = useState<OptimalDecision[]>([
    {
      type: 'harvest',
      confidence: 92,
      recommendation: 'Harvest in 5-7 days for optimal quality and price',
      impact: 'high',
      timing: '2024-02-12 to 2024-02-18',
      reasoning: [
        'Crop maturity index at 95%',
        'Weather forecast shows clear conditions',
        'Market price projected to peak next week',
        'Quality degradation risk increases after Feb 20'
      ]
    },
    {
      type: 'irrigation',
      confidence: 87,
      recommendation: 'Increase irrigation by 20% for next 3 days',
      impact: 'medium',
      timing: 'Next 72 hours',
      reasoning: [
        'Soil moisture dropping below optimal range',
        'Temperature expected to rise by 3°C',
        'Critical growth phase requires adequate water',
        'Cost-benefit analysis shows positive ROI'
      ]
    },
    {
      type: 'pest_control',
      confidence: 78,
      recommendation: 'Apply organic neem treatment as preventive measure',
      impact: 'medium',
      timing: 'Within 48 hours',
      reasoning: [
        'Neighboring farms report aphid activity',
        'Current weather conditions favor pest reproduction',
        'Preventive treatment 60% more cost-effective',
        'Maintains organic certification status'
      ]
    }
  ]);

  const [marketForecast, setMarketForecast] = useState<MarketForecast>({
    currentPrice: 42,
    predictedPrice: 48,
    priceChange: 14.3,
    demand: 'high',
    competition: 23,
    bestSellDate: '2024-02-15'
  });

  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>([
    {
      type: 'weather',
      severity: 'medium',
      probability: 35,
      description: 'Possible heavy rainfall in 5-7 days may delay harvest',
      preventiveMeasures: [
        'Prepare drainage systems',
        'Consider early harvest if quality permits',
        'Ensure storage facilities are ready'
      ]
    },
    {
      type: 'disease',
      severity: 'low',
      probability: 15,
      description: 'Low risk of fungal infection based on current conditions',
      preventiveMeasures: [
        'Continue regular monitoring',
        'Maintain proper air circulation',
        'Keep organic fungicide ready'
      ]
    }
  ]);

  const [aiInsights, setAiInsights] = useState({
    yieldPrediction: 94,
    qualityScore: 89,
    profitMargin: 23.5,
    sustainabilityIndex: 91
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'harvest': return <Calendar className="h-4 w-4" />;
      case 'irrigation': return <Droplets className="h-4 w-4" />;
      case 'fertilizer': return <Zap className="h-4 w-4" />;
      case 'pest_control': return <Bug className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-blockchain" />
        <h2 className="text-2xl font-bold">AI Decision Layer - {batchId}</h2>
        <Badge variant="blockchain">Intelligent Assistant</Badge>
      </div>

      <Tabs defaultValue="decisions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="decisions">
            <Target className="h-4 w-4 mr-2" />
            Decisions
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market
          </TabsTrigger>
          <TabsTrigger value="risks">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risks
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* AI Decisions */}
        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Optimal Decision Recommendations
              </CardTitle>
              <CardDescription>
                AI-powered recommendations for maximizing yield and profit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decisions.map((decision, index) => (
                  <Card key={index} className="border-l-4 border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getDecisionIcon(decision.type)}
                          <h4 className="font-semibold capitalize">
                            {decision.type.replace('_', ' ')} Recommendation
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getImpactColor(decision.impact) as any}>
                            {decision.impact} impact
                          </Badge>
                          <div className="text-right">
                            <div className="text-sm font-semibold">
                              {decision.confidence}% confident
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm font-medium mb-3">{decision.recommendation}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Optimal Timing:</p>
                          <p className="text-sm font-medium">{decision.timing}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Confidence Level:</p>
                          <Progress value={decision.confidence} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground mb-2">AI Reasoning:</p>
                        <ul className="text-xs space-y-1">
                          {decision.reasoning.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="default">
                          Apply Recommendation
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule Task
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Forecast */}
        <TabsContent value="market" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  Price Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Price:</span>
                    <span className="text-lg font-bold">₹{marketForecast.currentPrice}/kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Predicted Price:</span>
                    <span className="text-lg font-bold text-success">₹{marketForecast.predictedPrice}/kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expected Change:</span>
                    <Badge variant="success">+{marketForecast.priceChange}%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Best Sell Date:</span>
                    <span className="font-semibold">{marketForecast.bestSellDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blockchain" />
                  Market Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Market Demand</span>
                      <Badge variant="success">{marketForecast.demand}</Badge>
                    </div>
                    <Progress value={marketForecast.demand === 'high' ? 85 : 60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Competition Level</span>
                      <span className="text-sm font-semibold">{marketForecast.competition} suppliers</span>
                    </div>
                    <Progress value={100 - marketForecast.competition * 2} className="h-2" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">AI Market Insight:</p>
                    <p className="text-sm">
                      Strong demand expected due to festival season. Competition is moderate. 
                      Recommended to harvest and sell within optimal window for maximum profit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Analysis */}
        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Risk Assessment & Alerts
              </CardTitle>
              <CardDescription>
                Predictive risk analysis with preventive measures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((risk, index) => (
                  <Card key={index} className="border-l-4 border-warning">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold capitalize">{risk.type} Risk</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(risk.severity) as any}>
                            {risk.severity}
                          </Badge>
                          <span className="text-sm font-semibold">{risk.probability}%</span>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-3">{risk.description}</p>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Preventive Measures:</p>
                        <ul className="text-xs space-y-1">
                          {risk.preventiveMeasures.map((measure, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3">
                        <Progress value={risk.probability} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {aiInsights.yieldPrediction}%
                </div>
                <p className="text-sm text-muted-foreground">Predicted Yield</p>
                <p className="text-xs text-muted-foreground mt-1">vs Expected</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  {aiInsights.qualityScore}
                </div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-xs text-muted-foreground mt-1">out of 100</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blockchain mb-2">
                  {aiInsights.profitMargin}%
                </div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-xs text-muted-foreground mt-1">Above Average</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  {aiInsights.sustainabilityIndex}
                </div>
                <p className="text-sm text-muted-foreground">Sustainability</p>
                <p className="text-xs text-muted-foreground mt-1">Index Score</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blockchain" />
                Intelligent Farming Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water Efficiency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-sm font-semibold">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nutrient Optimization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pest Management</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="text-sm font-semibold">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">AI Learning Insights</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-sm">
                      <strong>Pattern Recognition:</strong> Your farming practices show 23% improvement over last season.
                    </p>
                    <p className="text-sm">
                      <strong>Optimization Opportunity:</strong> Adjusting irrigation timing could increase yield by 8%.
                    </p>
                    <p className="text-sm">
                      <strong>Market Alignment:</strong> Your crop quality matches premium market requirements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
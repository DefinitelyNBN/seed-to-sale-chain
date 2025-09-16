import { useState } from "react";
import { RoleSelector } from "./RoleSelector";
import { FarmerInterface } from "./FarmerInterface";
import { ConsumerInterface } from "./ConsumerInterface";
import { BlockchainSimulator } from "./BlockchainSimulator";
import { CommunityPage } from "./CommunityPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Users, ShoppingCart, Tractor } from "lucide-react";
import heroImage from "@/assets/agri-blockchain-hero.jpg";

interface StatsData {
  farmers: number;
  batches: number;
  transactions: number;
  value: string;
}

const stats: StatsData = {
  farmers: 12567,
  batches: 8934,
  transactions: 45678,
  value: "₹2.4 Cr"
};

export const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setShowBlockchain(false);
    setShowCommunity(false);
  };

  const handleBackToDashboard = () => {
    setSelectedRole("");
    setShowBlockchain(false);
    setShowCommunity(false);
  };

  const renderRoleInterface = () => {
    switch (selectedRole) {
      case "farmer":
        return <FarmerInterface />;
      case "consumer":
        return <ConsumerInterface />;
      case "distributor":
        return <DistributorPlaceholder />;
      case "retailer":
        return <RetailerPlaceholder />;
      default:
        return null;
    }
  };

  if (showCommunity) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <CommunityPage />
        </div>
      </div>
    );
  }

  if (showBlockchain) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <BlockchainSimulator />
        </div>
      </div>
    );
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button variant="blockchain" onClick={() => setShowBlockchain(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Blockchain Explorer
            </Button>
            <Button variant="success" onClick={() => setShowCommunity(true)}>
              <Users className="h-4 w-4 mr-2" />
              Community Hub
            </Button>
          </div>
          {renderRoleInterface()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat min-h-[60vh] flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-center text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Agricultural Supply Chain
              <span className="block text-3xl md:text-4xl text-primary-glow mt-2">
                Powered by Blockchain
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Transparent, traceable, and trusted food journey from farm to table
            </p>
            <p className="text-lg text-gray-300">
              ଚାଷ ଠାରୁ ମେଜ ପର୍ଯ୍ୟନ୍ତ ସ୍ୱଚ୍ଛ, ଅନୁସରଣୀୟ ଏବଂ ବିଶ୍ୱସ୍ତ ଖାଦ୍ୟ ଯାତ୍ରା
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="success" className="text-sm px-4 py-2">
                Government Approved
              </Badge>
              <Badge variant="blockchain" className="text-sm px-4 py-2">
                Blockchain Verified
              </Badge>
              <Badge variant="warning" className="text-sm px-4 py-2">
                Smart India Hackathon 2024
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Tractor className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary">{stats.farmers.toLocaleString()}</p>
              <p className="text-muted-foreground">Registered Farmers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <ShoppingCart className="h-8 w-8 text-blockchain mx-auto mb-2" />
              <p className="text-3xl font-bold text-blockchain">{stats.batches.toLocaleString()}</p>
              <p className="text-muted-foreground">Tracked Batches</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-3xl font-bold text-success">{stats.transactions.toLocaleString()}</p>
              <p className="text-muted-foreground">Blockchain Transactions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-3xl font-bold text-accent">{stats.value}</p>
              <p className="text-muted-foreground">Total Value Tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Role Selection */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Choose Your Role</CardTitle>
            <CardDescription className="text-lg">
              Access the platform based on your role in the supply chain
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <RoleSelector onRoleSelect={handleRoleSelect} selectedRole={selectedRole} />
          </CardContent>
        </Card>

        {/* Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔗 Blockchain Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every transaction is recorded on Ethereum testnet with smart contracts ensuring transparency and automatic payments.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📱 QR Code Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Consumers can scan QR codes to view complete supply chain journey from farm to retail store.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🌾 Quality Assurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Farmers upload quality certificates and pesticide reports, stored securely on IPFS with blockchain verification.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💰 Automatic Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Smart contracts automatically release payments to farmers when deliveries are confirmed by retailers.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚚 Real-time Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track produce movement through distributors with transport logs and delivery confirmations in real-time.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏛️ Government Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integrated with government schemes for subsidies, certifications, and compliance with Odisha agricultural policies.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="blockchain" 
              size="lg" 
              onClick={() => setShowBlockchain(true)}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Explore Blockchain
            </Button>
            <Button 
              variant="success" 
              size="lg"
              onClick={() => setShowCommunity(true)}
            >
              <Users className="h-5 w-5 mr-2" />
              Community Hub
            </Button>
            <Button variant="harvest" size="lg">
              View Demo Flow
            </Button>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Experience the future of agriculture with AI-powered digital twins, blockchain transparency, 
            and community-driven knowledge sharing
          </p>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for distributor and retailer
const DistributorPlaceholder = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Distributor Interface (Coming Soon)</h2>
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground">
          Distributor interface for managing batch transfers and transport logs will be available in the full implementation.
        </p>
      </CardContent>
    </Card>
  </div>
);

const RetailerPlaceholder = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Retailer Interface (Coming Soon)</h2>
    <Card>
      <CardContent className="p-8 text-center">
        <p className="text-muted-foreground">
          Retailer interface for confirming deliveries and triggering payments will be available in the full implementation.
        </p>
      </CardContent>
    </Card>
  </div>
);
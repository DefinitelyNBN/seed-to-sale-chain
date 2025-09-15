import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Truck, Store, Smartphone, Leaf, Shield } from "lucide-react";

interface Role {
  id: string;
  title: string;
  titleOdia: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const roles: Role[] = [
  {
    id: "farmer",
    title: "Farmer",
    titleOdia: "କୃଷକ",
    description: "Register crops, view payments, upload quality certificates",
    icon: <Sprout className="h-8 w-8" />,
    color: "farmer"
  },
  {
    id: "distributor", 
    title: "Distributor",
    titleOdia: "ବିତରଣକାରୀ",
    description: "Receive batches, update transport logs, manage deliveries",
    icon: <Truck className="h-8 w-8" />,
    color: "blockchain"
  },
  {
    id: "retailer",
    title: "Retailer", 
    titleOdia: "ଖୁଚୁରା ବ୍ୟବସାୟୀ",
    description: "Confirm deliveries, trigger automatic payments",
    icon: <Store className="h-8 w-8" />,
    color: "harvest"
  },
  {
    id: "consumer",
    title: "Consumer",
    titleOdia: "ଗ୍ରାହକ",
    description: "Scan QR codes, track produce journey, view safety reports", 
    icon: <Smartphone className="h-8 w-8" />,
    color: "success"
  }
];

interface RoleSelectorProps {
  onRoleSelect: (roleId: string) => void;
  selectedRole?: string;
}

export const RoleSelector = ({ onRoleSelect, selectedRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Agricultural Supply Chain
          </h2>
          <Shield className="h-6 w-6 text-blockchain" />
        </div>
        <p className="text-muted-foreground">
          Select your role to access the blockchain-powered supply chain platform
        </p>
        <p className="text-sm text-muted-foreground">
          ବ୍ଲକଚେନ ଚାଳିତ ଯୋଗାଣ ଶୃଙ୍ଖଳା ପ୍ଲାଟଫର୍ମକୁ ପ୍ରବେଶ ପାଇଁ ଆପଣଙ୍କର ଭୂମିକା ଚୟନ କରନ୍ତୁ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <Card 
            key={role.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedRole === role.id ? 'ring-2 ring-primary shadow-primary' : 'hover:shadow-md'
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full bg-${role.color}/10 text-${role.color}`}>
                  {role.icon}
                </div>
              </div>
              <CardTitle className="text-lg">
                {role.title}
                <span className="block text-sm font-normal text-muted-foreground mt-1">
                  {role.titleOdia}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                {role.description}
              </CardDescription>
              <Button 
                variant={selectedRole === role.id ? role.color as any : "outline"}
                className="w-full mt-4"
                size="sm"
              >
                {selectedRole === role.id ? "Selected" : "Select Role"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
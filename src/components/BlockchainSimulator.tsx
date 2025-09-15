import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Clock, CheckCircle, Coins, Hash } from "lucide-react";

interface Transaction {
  id: string;
  type: 'batch_created' | 'transfer' | 'delivery' | 'payment';
  from: string;
  to: string;
  batchId: string;
  timestamp: string;
  blockHash: string;
  gasUsed: string;
  status: 'pending' | 'confirmed' | 'failed';
}

interface Block {
  number: number;
  hash: string;
  timestamp: string;
  transactions: number;
  miner: string;
}

export const BlockchainSimulator = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "0x1a2b3c...",
      type: "batch_created",
      from: "0xFarmer123...",
      to: "AgriContract",
      batchId: "BATCH001",
      timestamp: "2024-01-17 10:30:15",
      blockHash: "0x7d4f5e6a...",
      gasUsed: "21,000",
      status: "confirmed"
    },
    {
      id: "0x4d5e6f...",
      type: "transfer",
      from: "0xFarmer123...",
      to: "0xDistrib456...",
      batchId: "BATCH001",
      timestamp: "2024-01-17 11:15:30",
      blockHash: "0x8e5f6a7b...",
      gasUsed: "35,000",
      status: "confirmed"
    },
    {
      id: "0x7g8h9i...",
      type: "delivery",
      from: "0xDistrib456...",
      to: "0xRetail789...",
      batchId: "BATCH001",
      timestamp: "2024-01-17 14:45:20",
      blockHash: "0x9f6a7b8c...",
      gasUsed: "28,000",
      status: "pending"
    }
  ]);

  const [blocks, setBlocks] = useState<Block[]>([
    {
      number: 18234567,
      hash: "0x9f6a7b8c...",
      timestamp: "2024-01-17 14:45:20",
      transactions: 47,
      miner: "0xMiner001..."
    },
    {
      number: 18234566,
      hash: "0x8e5f6a7b...",
      timestamp: "2024-01-17 14:44:08",
      transactions: 52,
      miner: "0xMiner002..."
    },
    {
      number: 18234565,
      hash: "0x7d4f5e6a...",
      timestamp: "2024-01-17 14:42:45",
      transactions: 39,
      miner: "0xMiner003..."
    }
  ]);

  const [isLive, setIsLive] = useState(false);
  
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Simulate new block creation
      const newBlock: Block = {
        number: blocks[0].number + 1,
        hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
        timestamp: new Date().toLocaleString(),
        transactions: Math.floor(Math.random() * 50) + 20,
        miner: `0xMiner${Math.floor(Math.random() * 999).toString().padStart(3, '0')}...`
      };
      
      setBlocks(prev => [newBlock, ...prev.slice(0, 4)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isLive, blocks]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'batch_created': return "🌱";
      case 'transfer': return "🚚";
      case 'delivery': return "🏪";
      case 'payment': return "💰";
      default: return "📝";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="h-6 w-6 text-blockchain" />
          <h2 className="text-2xl font-bold">Blockchain Explorer</h2>
          <Badge variant="secondary">Sepolia Testnet</Badge>
        </div>
        <Button 
          variant={isLive ? "destructive" : "blockchain"}
          onClick={() => setIsLive(!isLive)}
        >
          {isLive ? "Stop Live Updates" : "Start Live Updates"}
        </Button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Link className="h-5 w-5 text-blockchain" />
              <div>
                <p className="text-sm text-muted-foreground">Latest Block</p>
                <p className="text-xl font-bold">{blocks[0]?.number.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Block Time</p>
                <p className="text-xl font-bold">12.5s</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Total TXs</p>
                <p className="text-xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                <p className="text-xl font-bold">15 gwei</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AgriChain Transactions</CardTitle>
          <CardDescription>
            Latest blockchain transactions for agricultural supply chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getTransactionIcon(tx.type)}</div>
                  <div>
                    <p className="font-mono text-sm font-semibold">{tx.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.type.replace('_', ' ').toUpperCase()} - Batch: {tx.batchId}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(tx.status) as any}>
                    {tx.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gas: {tx.gasUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Blocks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Latest Blocks
          </CardTitle>
          <CardDescription>Recently mined blocks on the network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {blocks.map((block) => (
              <div key={block.number} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">Block #{block.number.toLocaleString()}</p>
                  <p className="font-mono text-sm text-muted-foreground">{block.hash}</p>
                  <p className="text-xs text-muted-foreground">{block.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{block.transactions} TXs</p>
                  <p className="text-xs text-muted-foreground">Miner: {block.miner}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Star, 
  BookOpen, 
  Award,
  TrendingUp,
  Heart,
  Share2,
  Search,
  Plus,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: string;
  location: string;
  title: string;
  content: string;
  category: 'tips' | 'problem' | 'success' | 'market' | 'weather';
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
  isExpert: boolean;
}

interface Expert {
  name: string;
  expertise: string;
  rating: number;
  consultations: number;
  location: string;
  languages: string[];
}

interface MarketInfo {
  crop: string;
  location: string;
  price: number;
  change: number;
  demand: 'high' | 'medium' | 'low';
  updatedAt: string;
}

export const CommunityPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "tips" as const
  });

  const [posts] = useState<Post[]>([
    {
      id: "1",
      author: "Ramesh Kumar",
      location: "Bhubaneswar, Odisha",
      title: "Organic Pest Control for Tomatoes - My Success Story",
      content: "After switching to neem oil and companion planting with marigolds, I've reduced pest damage by 80%. Here's my complete method...",
      category: "success",
      likes: 45,
      comments: 12,
      timestamp: "2 hours ago",
      tags: ["organic", "tomatoes", "pest-control", "neem"],
      isExpert: true
    },
    {
      id: "2",
      author: "Priya Dash",
      location: "Cuttack, Odisha",
      title: "Need Help: Yellowing Leaves in Rice Crop",
      content: "My rice plants are showing yellow leaves in patches. Started 3 days ago. Soil test shows normal nitrogen levels. Weather has been humid...",
      category: "problem",
      likes: 8,
      comments: 6,
      timestamp: "4 hours ago",
      tags: ["rice", "disease", "help-needed"],
      isExpert: false
    },
    {
      id: "3",
      author: "Dr. Suresh Patel",
      location: "Agricultural University, Bhubaneswar",
      title: "Best Practices for Monsoon Farming in Odisha",
      content: "With monsoon approaching, here are evidence-based practices for maximizing yield while minimizing disease risk...",
      category: "tips",
      likes: 156,
      comments: 28,
      timestamp: "1 day ago",
      tags: ["monsoon", "best-practices", "odisha", "scientific"],
      isExpert: true
    }
  ]);

  const [experts] = useState<Expert[]>([
    {
      name: "Dr. Suresh Patel",
      expertise: "Crop Disease Management",
      rating: 4.9,
      consultations: 234,
      location: "Bhubaneswar",
      languages: ["English", "Hindi", "Odia"]
    },
    {
      name: "Meera Sahoo",
      expertise: "Organic Farming",
      rating: 4.8,
      consultations: 189,
      location: "Cuttack",
      languages: ["Odia", "Hindi"]
    },
    {
      name: "Ravi Sharma",
      expertise: "Market Analytics",
      rating: 4.7,
      consultations: 156,
      location: "Bhubaneswar",
      languages: ["English", "Hindi", "Odia"]
    }
  ]);

  const [marketData] = useState<MarketInfo[]>([
    {
      crop: "Tomatoes",
      location: "Bhubaneswar Mandi",
      price: 45,
      change: 12.5,
      demand: "high",
      updatedAt: "30 mins ago"
    },
    {
      crop: "Rice",
      location: "Cuttack Market",
      price: 28,
      change: -3.2,
      demand: "medium",
      updatedAt: "1 hour ago"
    },
    {
      crop: "Onions",
      location: "Puri Market",
      price: 35,
      change: 8.7,
      demand: "high",
      updatedAt: "45 mins ago"
    }
  ]);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community"
    });

    setNewPost({ title: "", content: "", category: "tips" });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'success': return 'success';
      case 'problem': return 'destructive';
      case 'tips': return 'primary';
      case 'market': return 'blockchain';
      case 'weather': return 'warning';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'success': return '🏆';
      case 'problem': return '❓';
      case 'tips': return '💡';
      case 'market': return '📈';
      case 'weather': return '🌦️';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Community Hub</h2>
        <span className="text-sm text-muted-foreground">ସମୁଦାୟ କେନ୍ଦ୍ର</span>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">
            <MessageCircle className="h-4 w-4 mr-2" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="experts">
            <Award className="h-4 w-4 mr-2" />
            Experts
          </TabsTrigger>
          <TabsTrigger value="market">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <BookOpen className="h-4 w-4 mr-2" />
            Knowledge
          </TabsTrigger>
        </TabsList>

        {/* Community Feed */}
        <TabsContent value="feed" className="space-y-4">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Share Your Knowledge
              </CardTitle>
              <CardDescription>
                Help fellow farmers by sharing tips, asking questions, or celebrating successes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    placeholder="What's your farming insight today?"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value as any }))}
                  >
                    <option value="tips">Tips & Advice</option>
                    <option value="problem">Need Help</option>
                    <option value="success">Success Story</option>
                    <option value="market">Market Info</option>
                    <option value="weather">Weather Alert</option>
                  </select>
                </div>
              </div>
              <Textarea 
                placeholder="Share your detailed experience, tips, or questions..."
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={3}
              />
              <Button onClick={handleCreatePost} className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Community
              </Button>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search posts, topics, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{post.author}</p>
                          {post.isExpert && (
                            <Badge variant="blockchain" className="text-xs">Expert</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.location} • {post.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(post.category)}</span>
                      <Badge variant={getCategoryColor(post.category) as any}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Expert Consultants */}
        <TabsContent value="experts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map((expert, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.expertise}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{expert.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consultations</span>
                      <span className="text-sm font-semibold">{expert.consultations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Location</span>
                      <span className="text-sm">{expert.location}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Languages:</span>
                      <div className="flex gap-1 mt-1">
                        {expert.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Information */}
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blockchain" />
                Live Market Prices
              </CardTitle>
              <CardDescription>
                Real-time commodity prices from major mandis in Odisha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{item.crop}</h4>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <p className="text-xs text-muted-foreground">Updated {item.updatedAt}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{item.price}/kg</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.change > 0 ? "success" : "destructive"}>
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </Badge>
                        <Badge variant={item.demand === 'high' ? 'success' : item.demand === 'medium' ? 'warning' : 'secondary'}>
                          {item.demand} demand
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Trends & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Weekly Market Insight</h4>
                  <p className="text-sm">
                    Tomato prices are expected to rise by 15-20% next week due to increased demand 
                    for festival season. Farmers with ready harvest should consider timing their sales.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Government Procurement Updates</h4>
                  <p className="text-sm">
                    MSP for paddy increased to ₹2,183/quintal. Registration for government 
                    procurement centers opens next Monday.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base */}
        <TabsContent value="knowledge" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Farming Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <h4 className="font-semibold text-sm">Complete Guide to Organic Farming</h4>
                    <p className="text-xs text-muted-foreground">Comprehensive resource for transitioning to organic methods</p>
                  </div>
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <h4 className="font-semibold text-sm">Pest Management in Odisha</h4>
                    <p className="text-xs text-muted-foreground">Region-specific pest control strategies</p>
                  </div>
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <h4 className="font-semibold text-sm">Monsoon Farming Best Practices</h4>
                    <p className="text-xs text-muted-foreground">Maximize yield during rainy season</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2 mb-2">#organic-farming</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#pest-control</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#monsoon-tips</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#market-prices</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#government-schemes</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#crop-insurance</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#water-management</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">#sustainable-farming</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Featured Learning Resources</CardTitle>
              <CardDescription>
                Expert-curated content to improve your farming knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <h4 className="font-semibold">Study Materials</h4>
                  <p className="text-sm text-muted-foreground">Government-approved farming guides</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <h4 className="font-semibold">Video Tutorials</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step farming techniques</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-semibold">Success Stories</h4>
                  <p className="text-sm text-muted-foreground">Learn from fellow farmers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
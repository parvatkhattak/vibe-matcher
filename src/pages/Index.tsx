import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchMetricsDisplay } from "@/components/SearchMetrics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateEmbedding, cosineSimilarity } from "@/lib/embeddings";
import { MatchResult, SearchMetrics } from "@/types/product";
import { Sparkles, Search, Loader2 } from "lucide-react";

const exampleQueries = [
  "energetic urban chic",
  "cozy comfortable weekend vibes",
  "elegant sophisticated evening",
  "casual relaxed bohemian style",
  "bold athletic streetwear"
];

const Index = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [metrics, setMetrics] = useState<SearchMetrics | null>(null);
  const [productEmbeddings, setProductEmbeddings] = useState<Map<string, number[]>>(new Map());
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a vibe to search for.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    const startTime = performance.now();

    try {
      // Generate embedding for query
      const embeddingStart = performance.now();
      const queryEmbedding = await generateEmbedding(query);
      const embeddingTime = performance.now() - embeddingStart;

      // Generate embeddings for products if not cached
      const matchingStart = performance.now();
      const newEmbeddings = new Map(productEmbeddings);
      
      for (const product of products) {
        if (!newEmbeddings.has(product.id)) {
          const embedding = await generateEmbedding(product.description);
          newEmbeddings.set(product.id, embedding);
        }
      }
      
      setProductEmbeddings(newEmbeddings);

      // Calculate similarities
      const results: MatchResult[] = products.map(product => ({
        product,
        score: cosineSimilarity(queryEmbedding, newEmbeddings.get(product.id)!)
      }));

      // Sort by score and get top 3
      results.sort((a, b) => b.score - a.score);
      const topMatches = results.slice(0, 3);
      
      const matchingTime = performance.now() - matchingStart;
      const totalLatency = performance.now() - startTime;

      setMatches(topMatches);
      setMetrics({
        latency: totalLatency,
        queryEmbeddingTime: embeddingTime,
        matchingTime: matchingTime,
        topScore: topMatches[0]?.score || 0
      });

      toast({
        title: "Search Complete!",
        description: `Found ${topMatches.length} matching products in ${totalLatency.toFixed(0)}ms`
      });

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "An error occurred during search",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Vibe Matcher
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            AI-powered fashion recommendation system using embeddings and vector similarity
          </p>

          {/* Search Section */}
          <div className="bg-card rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Describe your vibe... (e.g., energetic urban chic)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-base"
              />
              <Button 
                onClick={handleSearch} 
                disabled={isSearching}
                className="px-6"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="ml-2">Search</span>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Try:</span>
              {exampleQueries.map((example) => (
                <Button
                  key={example}
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuery(example)}
                  className="text-xs"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {metrics && (
          <div className="mb-8">
            <SearchMetricsDisplay metrics={metrics} />
          </div>
        )}

        {matches.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Top 3 Matches for "{query}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <ProductCard
                  key={match.product.id}
                  product={match.product}
                  score={match.score}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {!matches.length && !isSearching && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Enter a vibe to discover your perfect fashion match
            </p>
          </div>
        )}
      </div>

      {/* Product Catalog */}
      <div className="max-w-6xl mx-auto px-4 py-12 border-t border-border">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Product Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

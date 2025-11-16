export interface Product {
  id: string;
  name: string;
  description: string;
  vibes: string[];
  price: number;
  imageUrl: string;
}

export interface MatchResult {
  product: Product;
  score: number;
}

export interface SearchMetrics {
  latency: number;
  queryEmbeddingTime: number;
  matchingTime: number;
  topScore: number;
}

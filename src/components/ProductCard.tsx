import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  score?: number;
  rank?: number;
}

export function ProductCard({ product, score, rank }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {rank && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
            #{rank}
          </div>
        )}
        {score !== undefined && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold text-sm shadow-md">
            {(score * 100).toFixed(1)}%
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.vibes.map((vibe) => (
            <Badge key={vibe} variant="secondary" className="text-xs">
              {vibe}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-2xl font-bold text-primary">${product.price}</p>
      </CardFooter>
    </Card>
  );
}

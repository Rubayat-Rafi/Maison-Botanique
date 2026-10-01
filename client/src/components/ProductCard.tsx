import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={800}
          height={800}
        />
      </Link>
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.tagline}</p>
        <p className="text-sm font-medium text-foreground">${product.price}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => addToCart(product)}
          className="text-[11px] tracking-[0.15em] uppercase border border-border text-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground px-4 py-2 hover:text-foreground transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
}

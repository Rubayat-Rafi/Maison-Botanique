import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <main className="pt-24">
      <div className="container px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
              width={800}
              height={800}
            />
          </div>
          <div className="py-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              {product.size}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">{product.tagline}</p>
            <p className="text-2xl font-serif text-foreground mb-8">${product.price}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs border border-border text-foreground px-3 py-1 rounded-lg"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className="text-xs tracking-[0.15em] uppercase border border-foreground text-foreground px-8 py-3 rounded-lg hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

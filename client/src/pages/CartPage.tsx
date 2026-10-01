import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-20">
        <div className="container px-6 py-16 md:py-24 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <ShoppingBag size={24} strokeWidth={1.3} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Your Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
            Discover our botanically derived formulas to start your daily skin ritual.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase bg-primary text-primary-foreground px-7 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <span>Explore The Collection</span>
            <ArrowRight size={13} />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-20">
      <div className="container px-6 py-8 md:py-10">
        <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-border/60">
          <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground">
            Shopping Bag
          </h1>
          <span className="text-xs text-muted-foreground">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 sm:gap-5 p-4 rounded-xl bg-card/50 border border-border/70 hover:border-primary/30 transition-colors"
              >
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-secondary"
                    loading="lazy"
                    width={96}
                    height={96}
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
                        {product.category}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-serif text-base sm:text-lg text-foreground hover:text-primary transition-colors block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 border border-border rounded-lg bg-background">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs text-foreground w-6 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-serif font-medium text-foreground">
                      ${product.price * quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-secondary/70 rounded-xl p-6 border border-border/80 h-fit space-y-4">
            <h2 className="font-serif text-xl text-foreground pb-3 border-b border-border/60">
              Order Summary
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">${total}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Climate-Neutral Shipping</span>
                <span className="text-primary font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Signature Samples (2)</span>
                <span className="text-primary font-medium">Included</span>
              </div>
              <div className="border-t border-border/70 pt-3 flex justify-between text-foreground font-serif text-lg font-medium">
                <span>Estimated Total</span>
                <span>${total}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block text-center text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity font-medium mt-4 shadow-sm"
            >
              Proceed to Checkout
            </Link>

            <div className="pt-3 border-t border-border/50 text-center">
              <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} className="text-primary" />
                Guaranteed Safe & Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

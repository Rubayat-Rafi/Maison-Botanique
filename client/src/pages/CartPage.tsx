import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-24">
        <div className="container px-6 py-32 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Your Cart</h1>
          <p className="text-sm text-muted-foreground mb-8">Your cart is empty.</p>
          <Link
            to="/#shop"
            className="text-xs tracking-[0.15em] uppercase border border-foreground text-foreground px-8 py-3 rounded-lg hover:bg-foreground hover:text-background transition-all"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="pt-24">
      <div className="container px-6 py-16">
        <h1 className="font-serif text-4xl text-foreground mb-12">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-6 border-b border-border pb-6">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    loading="lazy"
                    width={96}
                    height={96}
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${product.id}`} className="font-serif text-lg text-foreground">
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-foreground">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm text-foreground w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      ${product.price * quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-lg p-8 h-fit">
            <h2 className="font-serif text-xl text-foreground mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-foreground font-medium">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block text-center text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity mt-8"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

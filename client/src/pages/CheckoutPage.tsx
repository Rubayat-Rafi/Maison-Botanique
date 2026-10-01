import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "France",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.address || !form.cardNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    if (user) {
      try {
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            total,
            shipping_address: form.address,
            city: form.city,
            zip: form.zip,
            country: form.country,
          })
          .select()
          .single();

        if (!orderError && order) {
          const orderItems = items.map(({ product, quantity }) => ({
            order_id: order.id,
            product_id: product.id,
            product_name: product.name,
            product_image: product.image,
            price: product.price,
            quantity,
          }));
          await supabase.from("order_items").insert(orderItems);
        }
      } catch (err) {
        console.error("Order save error:", err);
      }
    }

    clearCart();
    setSubmitting(false);
    toast.success("Order confirmed! Your botanical ritual package is being prepared.");
    navigate(user ? "/orders" : "/");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClasses =
    "w-full bg-background border border-border/90 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm";

  return (
    <main className="pt-20">
      <div className="container px-6 py-8 md:py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
          <div>
            <Link to="/cart" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 mb-1 transition-colors">
              <ArrowLeft size={12} />
              Return to Bag
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              Express Checkout
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Lock size={13} />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 md:gap-10">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-card/40 p-5 rounded-xl border border-border/70 space-y-3">
              <h2 className="text-xs tracking-[0.18em] uppercase font-semibold text-foreground flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] inline-flex items-center justify-center font-mono">1</span>
                Contact Information
              </h2>
              <input
                type="email"
                placeholder="Email address for order tracking *"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Shipping */}
            <div className="bg-card/40 p-5 rounded-xl border border-border/70 space-y-3">
              <h2 className="text-xs tracking-[0.18em] uppercase font-semibold text-foreground flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] inline-flex items-center justify-center font-mono">2</span>
                Shipping Destination
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="First name *"
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={inputClasses}
                />
                <input
                  placeholder="Last name *"
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={inputClasses}
                />
                <input
                  placeholder="Street address *"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={`${inputClasses} col-span-2`}
                />
                <input
                  placeholder="City *"
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClasses}
                />
                <input
                  placeholder="ZIP / Postal code *"
                  required
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className={inputClasses}
                />
                <input
                  placeholder="Country *"
                  required
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={`${inputClasses} col-span-2`}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card/40 p-5 rounded-xl border border-border/70 space-y-3">
              <h2 className="text-xs tracking-[0.18em] uppercase font-semibold text-foreground flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] inline-flex items-center justify-center font-mono">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                <input
                  placeholder="Card Number (4242 •••• •••• 4242) *"
                  required
                  value={form.cardNumber}
                  onChange={(e) => update("cardNumber", e.target.value)}
                  className={inputClasses}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM / YY *"
                    required
                    value={form.expiry}
                    onChange={(e) => update("expiry", e.target.value)}
                    className={inputClasses}
                  />
                  <input
                    placeholder="CVC *"
                    required
                    value={form.cvc}
                    onChange={(e) => update("cvc", e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground py-3.5 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? "Securing Order…" : `Complete Order — $${total}`}
            </button>
          </div>

          {/* Right Order Summary */}
          <div className="bg-secondary/70 rounded-xl p-5 border border-border/80 h-fit space-y-4">
            <h2 className="font-serif text-lg text-foreground pb-2 border-b border-border/60">
              Order Items ({items.length})
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-background"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">Qty: {quantity} × ${product.price}</p>
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    ${product.price * quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-primary font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Botanical Samples (2)</span>
                <span className="text-primary font-medium">Included</span>
              </div>
              <div className="border-t border-border/60 pt-2 flex justify-between text-foreground font-serif text-base font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-primary" />
              <span>30-Day Pure Skin Guarantee Included</span>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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
    country: "",
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
      // Save order to database
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

      if (orderError || !order) {
        toast.error("Failed to place order. Please try again.");
        setSubmitting(false);
        return;
      }

      // Save order items
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

    clearCart();
    setSubmitting(false);
    toast.success("Order placed successfully!");
    navigate(user ? "/orders" : "/");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClasses =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <main className="pt-24">
      <div className="container px-6 py-16">
        <h1 className="font-serif text-4xl text-foreground mb-4">Checkout</h1>
        {!user && (
          <p className="text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate("/login")} className="text-foreground underline underline-offset-4 hover:text-primary">Sign in</button>
            {" "}to track your order after purchase.
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Contact</h2>
              <input type="email" placeholder="Email address" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClasses} />
            </div>

            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClasses} />
                <input placeholder="Last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClasses} />
                <input placeholder="Address" value={form.address} onChange={(e) => update("address", e.target.value)} className={`${inputClasses} col-span-2`} />
                <input placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClasses} />
                <input placeholder="ZIP code" value={form.zip} onChange={(e) => update("zip", e.target.value)} className={inputClasses} />
                <input placeholder="Country" value={form.country} onChange={(e) => update("country", e.target.value)} className={`${inputClasses} col-span-2`} />
              </div>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Payment</h2>
              <div className="space-y-4">
                <input placeholder="Card number" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} className={inputClasses} />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM / YY" value={form.expiry} onChange={(e) => update("expiry", e.target.value)} className={inputClasses} />
                  <input placeholder="CVC" value={form.cvc} onChange={(e) => update("cvc", e.target.value)} className={inputClasses} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Placing order…" : `Place Order — $${total}`}
            </button>
          </div>

          <div className="bg-secondary rounded-lg p-8 h-fit">
            <h2 className="font-serif text-xl text-foreground mb-6">Your Order</h2>
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" width={64} height={64} />
                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm text-foreground">${product.price * quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-6 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-foreground font-medium">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}

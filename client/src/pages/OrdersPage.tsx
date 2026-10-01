import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import Footer from "@/components/Footer";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: string | null;
  city: string | null;
  created_at: string;
  items: OrderItem[];
}

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  pending: { icon: <Clock size={16} />, label: "Pending", color: "text-yellow-600 bg-yellow-50" },
  processing: { icon: <Package size={16} />, label: "Processing", color: "text-blue-600 bg-blue-50" },
  shipped: { icon: <Truck size={16} />, label: "Shipped", color: "text-purple-600 bg-purple-50" },
  delivered: { icon: <CheckCircle size={16} />, label: "Delivered", color: "text-green-600 bg-green-50" },
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) fetchOrders();
  }, [user, authLoading]);

  const fetchOrders = async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!ordersData) { setLoading(false); return; }

    const ordersWithItems: Order[] = await Promise.all(
      ordersData.map(async (order) => {
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);
        return { ...order, items: items || [] };
      })
    );

    setOrders(ordersWithItems);
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <main className="pt-24">
        <div className="container px-6 py-16 text-center text-muted-foreground">Loading...</div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <div className="container px-6 py-16 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-foreground mb-2">My Orders</h1>
        <p className="text-sm text-muted-foreground mb-12">Track and manage your orders.</p>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-muted-foreground mb-4" strokeWidth={1} />
            <p className="text-muted-foreground mb-6">No orders yet.</p>
            <button
              onClick={() => navigate("/shop")}
              className="text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.pending;
              return (
                <div key={order.id} className="border border-border rounded-lg overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-secondary">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Order </span>
                        <span className="text-foreground font-medium">#{order.id.slice(0, 8)}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">${order.total}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-1">
                      {["pending", "processing", "shipped", "delivered"].map((step, i) => {
                        const steps = ["pending", "processing", "shipped", "delivered"];
                        const currentIdx = steps.indexOf(order.status);
                        const active = i <= currentIdx;
                        return (
                          <div key={step} className="flex-1 flex items-center gap-1">
                            <div className={`h-1.5 flex-1 rounded-full ${active ? "bg-primary" : "bg-border"}`} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1">
                      {["Placed", "Processing", "Shipped", "Delivered"].map((l) => (
                        <span key={l} className="text-[10px] text-muted-foreground">{l}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        {item.product_image && (
                          <img src={item.product_image} alt={item.product_name} className="w-14 h-14 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{item.product_name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm text-foreground">${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { User, Package, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClasses =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (user) {
      supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name || "");
          setPhone(data.phone || "");
        }
      });
    }
  }, [user, authLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, phone })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) toast.error("Failed to update profile.");
    else toast.success("Profile updated!");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out successfully.");
  };

  if (authLoading) return null;

  return (
    <main className="pt-24">
      <div className="container px-6 py-16 max-w-lg mx-auto">
        <h1 className="font-serif text-4xl text-foreground mb-10 text-center">My Account</h1>

        <div className="space-y-4 mb-10">
          <Link
            to="/orders"
            className="flex items-center gap-3 border border-border rounded-lg px-5 py-4 hover:bg-secondary transition-colors"
          >
            <Package size={20} className="text-muted-foreground" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">My Orders</p>
              <p className="text-xs text-muted-foreground">Track and view order history</p>
            </div>
          </Link>
        </div>

        <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Profile Details</h2>
        <form onSubmit={handleSave} className="space-y-4 mb-10">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={user?.email || ""} disabled className={`${inputClasses} opacity-60`} />
          </div>
          <input type="text" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputClasses} />
          <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} />
          <button
            type="submit"
            disabled={saving}
            className="w-full text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase border border-border text-foreground px-8 py-4 rounded-lg hover:bg-secondary transition-colors"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
      <Footer />
    </main>
  );
}

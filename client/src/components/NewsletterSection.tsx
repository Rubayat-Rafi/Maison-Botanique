import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-24 md:py-32 bg-accent">
      <div className="container px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Stay Connected
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          Join the Maison
        </h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
          Receive early access to new launches, exclusive offers, and curated skincare rituals — delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center max-w-md mx-auto gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground p-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

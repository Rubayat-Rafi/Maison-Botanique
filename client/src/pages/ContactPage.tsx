import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Clock, MessageSquare, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Votre message a été reçu. Our Paris concierge will reply within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  const inputClasses =
    "w-full bg-background border border-border/90 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm";

  return (
    <main className="pt-20">
      <div className="container px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-primary font-semibold mb-1">
            <Sparkles size={11} className="text-gold" />
            <span>Client Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-6 md:mb-8 pb-4 border-b border-border/60">
            Get in Touch
          </h1>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card/60 border border-border/70 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Direct Concierge</p>
                  <p className="text-xs text-muted-foreground">hello@maisonbotanique.com</p>
                  <p className="text-[10px] text-primary mt-1">Reply within 24h</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/60 border border-border/70 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Parisian Atelier</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    12 Rue de la Paix<br />75002 Paris, France
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/60 border border-border/70 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Clock size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Consultation Hours</p>
                  <p className="text-xs text-muted-foreground">Mon–Fri: 9am–6pm CET</p>
                  <p className="text-[10px] text-muted-foreground">Sat: 10am–3pm CET</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 bg-card/40 p-6 rounded-2xl border border-border/70 space-y-3.5">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                <MessageSquare size={14} className="text-primary" />
                <h2 className="text-xs tracking-wider uppercase font-semibold text-foreground">
                  Send a Private Inquiry
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">
                    Your Name *
                  </label>
                  <input
                    placeholder="e.g. Camille Dupont"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="camille@example.com"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">
                  Inquiry Topic
                </label>
                <input
                  placeholder="e.g. Skin ritual consultation or order inquiry"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase text-muted-foreground block mb-1">
                  Message *
                </label>
                <textarea
                  placeholder="How can our skin specialists assist you?"
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  className={inputClasses + " resize-none"}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-7 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 shadow-sm"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

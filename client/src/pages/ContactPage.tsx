import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Clock } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll be in touch shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClasses = "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <main className="pt-24">
      <div className="container px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Get In Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-12">Contact Us</h1>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div className="flex gap-3">
                <Mail size={18} className="text-primary mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">hello@maisonbotanique.com</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={18} className="text-primary mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-xs text-muted-foreground">12 Rue de la Paix<br />75002 Paris, France</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="text-primary mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">Hours</p>
                  <p className="text-xs text-muted-foreground">Mon–Fri: 9am–6pm CET</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Your name *" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClasses} />
                <input type="email" placeholder="Email address *" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClasses} />
              </div>
              <input placeholder="Subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} className={inputClasses} />
              <textarea placeholder="Your message *" value={form.message} onChange={(e) => update("message", e.target.value)} rows={6} className={inputClasses + " resize-none"} />
              <button type="submit" className="text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

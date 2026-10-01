import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      <div className="container px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Legal</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-6 md:mb-8 pb-3 border-b border-border/60">Privacy Policy</h1>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <p className="text-xs text-muted-foreground">Last updated: April 11, 2026</p>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including your name, email address, shipping address, and payment information when you make a purchase. We also collect browsing data such as pages visited and time spent on our site to improve your experience.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">2. How We Use Your Information</h2>
              <p>Your information is used to process orders, communicate about your purchases, send promotional materials (with your consent), improve our products and services, and comply with legal obligations. We never sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">3. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure payment processing through PCI-compliant providers, and regular security audits to protect your personal information.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">4. Cookies</h2>
              <p>We use essential cookies to operate our website and analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings at any time.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. For GDPR requests, please contact us at privacy@maisonbotanique.com.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">6. Contact</h2>
              <p>For questions about this Privacy Policy, contact us at privacy@maisonbotanique.com or write to: Maison Botanique, 12 Rue de la Paix, 75002 Paris, France.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

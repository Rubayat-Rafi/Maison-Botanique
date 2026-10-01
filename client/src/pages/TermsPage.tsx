import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="pt-20">
      <div className="container px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Legal</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-6 md:mb-8 pb-3 border-b border-border/60">Terms of Service</h1>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <p className="text-xs text-muted-foreground">Last updated: April 11, 2026</p>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">1. General</h2>
              <p>By accessing and using the Maison Botanique website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">2. Products & Orders</h2>
              <p>All products are subject to availability. Prices are listed in USD and include applicable taxes unless otherwise stated. We reserve the right to refuse or cancel any order for any reason, including suspected fraud.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">3. Shipping & Returns</h2>
              <p>We offer complimentary shipping on all orders. Deliveries typically arrive within 5–7 business days. If you are not satisfied with your purchase, you may return unopened items within 30 days for a full refund.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">4. Intellectual Property</h2>
              <p>All content on this website — including text, images, logos, and product formulations — is the property of Maison Botanique and is protected by international copyright law. Unauthorized reproduction is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">5. Limitation of Liability</h2>
              <p>Maison Botanique shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the product in question.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">6. Governing Law</h2>
              <p>These terms are governed by the laws of France. Any disputes shall be resolved in the courts of Paris, France.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

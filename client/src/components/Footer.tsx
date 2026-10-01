import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 bg-secondary">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-xl text-foreground mb-3">MAISON BOTANIQUE</p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Luxury skincare rooted in nature, refined by science. Every product is a promise to your skin.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Serums" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Serums</Link></li>
              <li><Link to="/shop?category=Moisturizers" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Moisturizers</Link></li>
              <li><Link to="/shop?category=Cleansers" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cleansers</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Maison Botanique. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">hello@maisonbotanique.com</p>
        </div>
      </div>
    </footer>
  );
}

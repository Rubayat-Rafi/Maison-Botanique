import { Link } from "react-router-dom";
import lifestyleImage from "@/assets/lifestyle-spa.jpg";

export default function LifestyleBanner() {
  return (
    <section id="ritual" className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[460px]">
        <div className="relative">
          <img
            src={lifestyleImage}
            alt="Luxury spa setting with botanical skincare"
            className="w-full h-full object-cover min-h-[380px]"
            loading="lazy"
            width={1200}
            height={800}
          />
        </div>
        <div className="flex items-center bg-accent px-8 py-12 md:px-14 md:py-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Ritual
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Your Evening
              <br />
              Sanctuary
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Transform your nightly routine into a moment of pure indulgence. Our three-step ritual — cleanse, treat, nourish — takes just five minutes to reveal your most radiant self.
            </p>
            <Link
              to="/shop"
              className="inline-block text-xs tracking-[0.15em] uppercase bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Shop the Ritual
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

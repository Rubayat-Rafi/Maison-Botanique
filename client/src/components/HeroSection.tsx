import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-serum.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury serum bottle with soft shadows"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>
      <div className="relative container px-6">
        <div className="max-w-lg">
          <p className="text-xs tracking-[0.3em] uppercase text-warm-white mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            Botanically Derived · Consciously Crafted
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-warm-white leading-[1.1] mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            The Art of
            <br />
            Pure Skin
          </h1>
          <p className="text-sm text-warm-white/80 leading-relaxed mb-8 max-w-sm animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            Formulated with rare botanicals and backed by science. Experience skincare elevated to its purest form.
          </p>
          <Link
            to="/#shop"
            className="inline-block text-xs tracking-[0.2em] uppercase border border-warm-white text-warm-white px-8 py-3 rounded-lg hover:bg-warm-white hover:text-foreground transition-all duration-300 animate-fade-in opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            Discover Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

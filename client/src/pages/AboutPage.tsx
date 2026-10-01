import Footer from "@/components/Footer";
import lifestyleImage from "@/assets/lifestyle-spa.jpg";
import ingredientsImage from "@/assets/ingredients.jpg";
import { Sparkles, ShieldCheck, HeartHandshake, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[44vh] md:h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={lifestyleImage}
            alt="Our story"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative container px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-white/10 backdrop-blur-md text-warm-white text-[10px] tracking-[0.25em] uppercase font-semibold mb-3 border border-warm-white/20">
            <Sparkles size={11} className="text-gold" />
            <span>Maison Heritage · Est. 2020</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-warm-white leading-[1.1] max-w-xl">
            Pure Botanical Science <br />
            <span className="italic">Without Compromise</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-2">
                Origin Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-tight mb-5">
                Born from a love for botany, proven by cosmetic chemistry
              </h2>
              <div className="space-y-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <p>
                  Maison Botanique began in a private apothecary laboratory in Grasse, France. Our founder — a botanical biochemist — set out to resolve an industry dilemma: clean formulas often lacked visible clinical potency, while clinical products relied heavily on synthetic petroleum derivatives.
                </p>
                <p>
                  We proved that cold-pressed, bio-fermented plant actives can match or exceed synthetic benchmarks. By maintaining intact cellular envelopes during extraction, every drop preserves living antioxidants, fatty acids, and phytonutrients.
                </p>
                <p>
                  Today, we partner exclusively with certified organic agricultural co-ops across France, guaranteeing 100% fair trade and traceable harvest batches.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border/80 shadow-md">
              <img
                src={ingredientsImage}
                alt="Our botanical ingredients"
                className="w-full h-[320px] sm:h-[380px] object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Pillars */}
      <section className="py-12 md:py-16 bg-secondary/60 border-t border-border/60">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-2">
              Our Core Tenets
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3">
              The Principles That Guide Us
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every formula, packaging choice, and farm partnership adheres to strict ethical standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="bg-background rounded-xl p-5 border border-border/70 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center text-primary mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1.5 font-medium">Radical Transparency</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full disclosure of every ingredient source, terroir of origin, and clinical efficacy metric. Zero hidden fillers.
              </p>
            </div>

            <div className="bg-background rounded-xl p-5 border border-border/70 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center text-primary mb-3">
                <Leaf size={20} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1.5 font-medium">Ecological Stewardship</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                100% recyclable UV-filtering glass, FSC-certified outer cartons, and carbon-neutral transit logistics worldwide.
              </p>
            </div>

            <div className="bg-background rounded-xl p-5 border border-border/70 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center text-primary mb-3">
                <HeartHandshake size={20} />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1.5 font-medium">Derm-Grade Results</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Independent double-blind clinical trials for every SKU. Formulated specifically to honor and heal reactive skin barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Footer from "@/components/Footer";
import lifestyleImage from "@/assets/lifestyle-spa.jpg";
import ingredientsImage from "@/assets/ingredients.jpg";

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={lifestyleImage} alt="Our story" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="relative container px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-warm-white mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-warm-white leading-[1.1]">
            Beauty in<br />Its Purest Form
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="container px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Founded in 2020</p>
              <h2 className="font-serif text-4xl font-light text-foreground leading-tight mb-6">
                Born from a love for nature and a respect for science
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Maison Botanique began in a small laboratory in the south of France, where our founder — a botanist and cosmetic chemist — sought to bridge the gap between nature and modern skincare.
                </p>
                <p>
                  Frustrated by the industry's reliance on synthetic ingredients, she set out to create formulas that harness the full potency of botanical extracts without compromise. Every product is a testament to that mission.
                </p>
                <p>
                  Today, we source from over 30 organic farms across five continents, working directly with growers who share our commitment to sustainability and purity.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src={ingredientsImage} alt="Our botanical ingredients" className="w-full h-[500px] object-cover" loading="lazy" width={1024} height={1024} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Values</p>
            <h2 className="font-serif text-4xl font-light text-foreground mb-8">What Guides Us</h2>
            <div className="space-y-8 text-sm text-muted-foreground leading-relaxed text-left">
              <div className="border-b border-border pb-6">
                <h3 className="font-serif text-xl text-foreground mb-2">Radical Transparency</h3>
                <p>Every ingredient, every source, every process — fully traceable and fully disclosed. We believe you deserve to know exactly what goes on your skin.</p>
              </div>
              <div className="border-b border-border pb-6">
                <h3 className="font-serif text-xl text-foreground mb-2">Sustainable at Every Step</h3>
                <p>From biodegradable formulas to recycled glass packaging, we minimize our environmental footprint without ever compromising on quality or efficacy.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-2">Results You Can Feel</h3>
                <p>Every formula undergoes rigorous clinical testing. We don't launch until the results are undeniable — because beautiful skin shouldn't require blind faith.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

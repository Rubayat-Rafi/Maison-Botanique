import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amélie Laurent",
    location: "Paris, France",
    text: "The Radiance Serum transformed my skin in two weeks. I've never felt more confident without makeup.",
    rating: 5,
    product: "Radiance Serum",
  },
  {
    name: "Sofia Chen",
    location: "New York, USA",
    text: "Maison Botanique is the only brand I trust. The ingredients are pure, and my sensitive skin has never looked better.",
    rating: 5,
    product: "Gentle Cleanser",
  },
  {
    name: "Elena Rossi",
    location: "Milan, Italy",
    text: "The Botanical Face Oil is liquid gold. My aesthetician asked what I changed — it's this. Just this.",
    rating: 5,
    product: "Botanical Face Oil",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="container px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Words of Trust
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-lg p-8 flex flex-col justify-between"
            >
              <div>
                <Quote size={20} className="text-sand-dark mb-4" strokeWidth={1.2} />
                <p className="text-sm text-foreground leading-relaxed mb-6 italic font-serif text-lg">
                  "{t.text}"
                </p>
              </div>
              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
                <p className="text-[11px] text-primary mt-1">Verified — {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

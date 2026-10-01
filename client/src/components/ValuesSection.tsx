import { Leaf, Recycle, Heart, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: <Leaf size={28} strokeWidth={1.2} />,
    title: "100% Natural",
    desc: "Every ingredient sourced from organic, sustainable farms.",
  },
  {
    icon: <Recycle size={28} strokeWidth={1.2} />,
    title: "Eco Packaging",
    desc: "Recyclable glass and soy-based inks. Zero plastic.",
  },
  {
    icon: <Heart size={28} strokeWidth={1.2} />,
    title: "Cruelty Free",
    desc: "Never tested on animals. Leaping Bunny certified.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.2} />,
    title: "Dermatologist Tested",
    desc: "Clinically validated for all skin types, including sensitive.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="container px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Promise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-light text-primary mb-4">
                {v.icon}
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

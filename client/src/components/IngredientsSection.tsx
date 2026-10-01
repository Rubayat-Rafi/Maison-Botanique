import ingredientsImage from "@/assets/ingredients.jpg";

const ingredients = [
  { name: "Hyaluronic Acid", benefit: "Deep hydration & plumping" },
  { name: "Rosehip Extract", benefit: "Brightening & repair" },
  { name: "Chamomile", benefit: "Calming & anti-inflammatory" },
  { name: "Green Tea", benefit: "Antioxidant protection" },
];

export default function IngredientsSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={ingredientsImage}
              alt="Macro photography of botanical skincare ingredients"
              className="w-full h-[500px] object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Ingredients
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Sourced from
              <br />
              Nature's Finest
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-md">
              Every formula begins with the world's most potent botanicals — ethically sourced, cold-pressed, and handled with care to preserve their living benefits.
            </p>
            <div className="space-y-6">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex items-start gap-4 border-b border-border pb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{ing.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ing.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

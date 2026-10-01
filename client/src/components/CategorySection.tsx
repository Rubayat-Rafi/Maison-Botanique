import { Link } from "react-router-dom";
import { categories } from "@/lib/products";
import { Droplets, Sparkles, Leaf, Wind, Eye, FlaskConical } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Serums: <FlaskConical size={24} strokeWidth={1.2} />,
  Moisturizers: <Droplets size={24} strokeWidth={1.2} />,
  Oils: <Sparkles size={24} strokeWidth={1.2} />,
  Cleansers: <Wind size={24} strokeWidth={1.2} />,
  Toners: <Leaf size={24} strokeWidth={1.2} />,
  "Eye Care": <Eye size={24} strokeWidth={1.2} />,
};

export default function CategorySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Browse By
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center text-center p-6 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-all duration-300"
            >
              <div className="text-muted-foreground group-hover:text-primary transition-colors mb-4">
                {categoryIcons[cat.name]}
              </div>
              <h3 className="font-serif text-base text-foreground mb-1">{cat.name}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block text-xs tracking-[0.15em] uppercase border border-foreground text-foreground px-8 py-3 rounded-lg hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

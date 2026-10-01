import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { X } from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const priceRanges = [
  { label: "Under $60", min: 0, max: 60 },
  { label: "$60 – $100", min: 60, max: 100 },
  { label: "$100 – $130", min: 100, max: 130 },
  { label: "Over $130", min: 130, max: Infinity },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    // Clear URL param when toggling
    if (searchParams.has("category")) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSortBy("featured");
    setSearchParams({});
  };

  const hasFilters = selectedCategories.length > 0 || selectedPriceRange !== null;

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedCategories, selectedPriceRange, sortBy]);

  return (
    <main className="pt-24">
      <div className="container px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            The Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            All Products
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Sort */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A–Z</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.name}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range, i) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === i}
                      onChange={() => setSelectedPriceRange(i)}
                      className="w-4 h-4 border-border text-primary focus:ring-ring accent-primary"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1.5 text-xs border border-border text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors"
                  >
                    {cat}
                    <X size={12} />
                  </button>
                ))}
                {selectedPriceRange !== null && (
                  <button
                    onClick={() => setSelectedPriceRange(null)}
                    className="flex items-center gap-1.5 text-xs border border-border text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors"
                  >
                    {priceRanges[selectedPriceRange].label}
                    <X size={12} />
                  </button>
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground mb-6">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

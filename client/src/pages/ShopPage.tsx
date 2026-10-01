import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";

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
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
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
  const activeCount = selectedCategories.length + (selectedPriceRange !== null ? 1 : 0);

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

  const renderActiveChips = () => {
    if (!hasFilters) return null;
    return (
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {selectedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className="inline-flex items-center gap-1.5 text-xs border border-border text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <span>{cat}</span>
            <X size={12} />
          </button>
        ))}
        {selectedPriceRange !== null && (
          <button
            onClick={() => setSelectedPriceRange(null)}
            className="inline-flex items-center gap-1.5 text-xs border border-border text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <span>{priceRanges[selectedPriceRange].label}</span>
            <X size={12} />
          </button>
        )}
        <button
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-foreground ml-2 transition-colors underline-offset-4 hover:underline"
        >
          Clear all
        </button>
      </div>
    );
  };

  return (
    <main className="pt-20">
      <div className="container px-6 py-10 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            The Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            All Products
          </h1>
        </div>

        {/* Small Devices Only (< lg): Mobile Filter Bar with slide drawer trigger */}
        <div className="lg:hidden flex items-center justify-between gap-4 pb-5 mb-6 border-b border-border">
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-border text-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors font-medium shadow-sm"
            aria-label="Open filter drawer"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-mono">
                {activeCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              aria-label="Sort by"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Small Devices Active Filters Chips */}
        <div className="lg:hidden">
          {renderActiveChips()}
        </div>

        {/* Main Layout: Desktop Sidebar (Left) + Products (Right) */}
        <div className="grid lg:grid-cols-4 gap-10 md:gap-12">
          {/* Big Devices Only (>= lg): Persistent Classic Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8">
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
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range, i) => (
                  <label
                    key={range.label}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPriceRange(selectedPriceRange === i ? null : i);
                    }}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                  >
                    <input
                      type="radio"
                      name="desktop-price"
                      checked={selectedPriceRange === i}
                      readOnly
                      className="w-4 h-4 border-border text-primary focus:ring-ring accent-primary cursor-pointer"
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

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Big Devices Active Filters Chips */}
            <div className="hidden lg:block">
              {renderActiveChips()}
            </div>

            <p className="hidden lg:block text-xs text-muted-foreground mb-6">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-card/20 rounded-xl border border-border">
                <p className="font-serif text-2xl text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-[0.15em] uppercase border border-foreground text-foreground px-6 py-2.5 rounded-lg hover:bg-foreground hover:text-background transition-all"
                >
                  Reset Filters
                </button>
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

      {/* Slide-out Filter Drawer (Used only on small devices below lg) */}
      <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-background p-6 flex flex-col justify-between">
          <div>
            <SheetHeader className="text-left pb-4 border-b border-border">
              <SheetTitle className="font-serif text-2xl font-light text-foreground">
                Filter & Refine
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Tailor the collection by category and price.
              </SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-8 overflow-y-auto max-h-[calc(100vh-210px)] pr-1">
              {/* Category Filter */}
              <div>
                <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">
                  Category
                </p>
                <div className="space-y-3">
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat.name).length;
                    const isChecked = selectedCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.name}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.name)}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary cursor-pointer"
                          />
                          <span className={`text-sm transition-colors ${isChecked ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-4 font-medium">
                  Price Range
                </p>
                <div className="space-y-3">
                  {priceRanges.map((range, i) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="drawer-price"
                        checked={selectedPriceRange === i}
                        onChange={() => setSelectedPriceRange(i)}
                        className="w-4 h-4 border-border text-primary focus:ring-ring accent-primary cursor-pointer"
                      />
                      <span className={`text-sm transition-colors ${selectedPriceRange === i ? "text-primary font-medium" : "text-foreground group-hover:text-primary"}`}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-full sm:w-auto text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground py-2.5 transition-colors"
              >
                Clear All
              </button>
            )}
            <SheetClose asChild>
              <button
                type="button"
                className="w-full sm:flex-1 text-xs tracking-[0.15em] uppercase bg-foreground text-background py-3 rounded-lg hover:bg-foreground/90 transition-colors font-medium text-center"
              >
                Show {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
              </button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Footer />
    </main>
  );
}

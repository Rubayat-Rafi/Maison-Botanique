import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import LifestyleBanner from "@/components/LifestyleBanner";
import IngredientsSection from "@/components/IngredientsSection";
import ValuesSection from "@/components/ValuesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Category */}
      <CategorySection />

      {/* 3. Featured Products */}
      <ProductGrid />

      {/* 4. The Daily Ritual */}
      <LifestyleBanner />

      {/* 5. Botanical Ingredients */}
      <IngredientsSection />

      {/* 6. Brand Values & Standards */}
      <ValuesSection />

      {/* 7. Client Reviews */}
      <TestimonialsSection />

      {/* 8. Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

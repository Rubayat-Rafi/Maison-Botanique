import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ValuesSection from "@/components/ValuesSection";
import IngredientsSection from "@/components/IngredientsSection";
import LifestyleBanner from "@/components/LifestyleBanner";
import ProductGrid from "@/components/ProductGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <main>
      <HeroSection />
      <ValuesSection />
      <CategorySection />
      <IngredientsSection />
      <LifestyleBanner />
      <ProductGrid />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

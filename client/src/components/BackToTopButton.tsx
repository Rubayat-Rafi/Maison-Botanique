import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-background/90 backdrop-blur-md border border-border/80 text-foreground hover:bg-foreground hover:text-background shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center group active:scale-95 animate-in fade-in zoom-in-75"
    >
      <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

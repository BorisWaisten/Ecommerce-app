import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import HeroModern from "@/components/hero-modern";
import TrendingProducts from "@/components/trending-products";
import BrandSection from "@/components/brand-section";
import StatsSection from "@/components/stats-section";
import NewsletterSection from "@/components/newsletter-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section Moderno */}
      <div className="bg-white dark:bg-gray-800">
        <HeroModern />
      </div>

      {/* Productos Destacados con Carrusel Automático */}
      <div className="">
        <FeaturedProducts />
      </div>

      {/* Productos Trending con Gráficos */}
      <div className="bg-white dark:bg-gray-800 ">
        <TrendingProducts />
      </div>

      {/* Categorías con Animaciones Escalonadas */}
      <div className="">
        <ChooseCategory />
      </div>

      {/* Sección de Marca - WaistenProgramación */}
      <div className="bg-white dark:bg-gray-800 ">
        <BrandSection />
      </div>
    </main>
  );
}

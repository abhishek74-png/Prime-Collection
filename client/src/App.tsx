import { ProductPage } from './components/ProductPage';
import { AuthPage } from './components/AuthPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartPage } from './components/CartPage';
import { BrandStory } from './components/BrandStory';
import { CustomerTrust } from './components/CustomerTrust';
import { FeaturedCollections } from './components/FeaturedCollections';
import { Footer } from './components/Footer';
import { Globe } from './components/Globe';
import { HeroScroll } from './components/HeroScroll';
import { Navbar } from './components/Navbar';
import { ProductMorph } from './components/ProductMorph';
import { ProductShowcase } from './components/ProductShowcase';

export const App = () => (
  <main className="noise bg-ink">
    <Navbar />
    <HeroScroll />
    <BrandStory />
    <FeaturedCollections />
    <ProductShowcase />
    <ProductMorph />
    <ProductPage />
    <CartPage />
    <AuthPage />
    <CheckoutPage />
    <CustomerTrust />
    <Globe />
    <Footer />
  </main>
);

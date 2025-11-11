import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Amazing Products
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Shop the latest trends with unbeatable prices and fast shipping
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Fast Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    100% secure payment processing
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Quality Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated selection of premium items
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                <p className="text-muted-foreground mt-2">Check out our handpicked selection</p>
              </div>
              <Link to="/products">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

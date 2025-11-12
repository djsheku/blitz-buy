import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
              <Link
  to="/"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="flex items-center gap-2 font-bold text-lg"
>
  <Package className="h-5 w-5 text-primary" />
  BlitzBuy
</Link>

            <p className="text-sm text-muted-foreground">
              Your trusted online marketplace for quality products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/store" className="text-muted-foreground hover:text-foreground transition-colors">
                  Store
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BlitzBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

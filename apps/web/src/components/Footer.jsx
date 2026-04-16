import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'hsl(var(--black))',
        color: 'hsl(var(--cream))',
        padding: '4rem 2rem 2rem'
      }}
    >
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span
              className="text-4xl md:text-5xl block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Nadeel
            </span>
            <p
              className="leading-relaxed text-base"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                opacity: 0.85
              }}
            >
              Crafting luxury fragrances that tell your story. Experience the art of Arabian perfumery with timeless elegance.
            </p>
          </div>

          <div className="space-y-4">
            <span
              className="text-lg block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500
              }}
            >
              Quick links
            </span>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="transition-all duration-200 text-base hover:opacity-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="transition-all duration-200 text-base hover:opacity-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="transition-all duration-200 text-base hover:opacity-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="transition-all duration-200 text-base hover:opacity-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <span
              className="text-lg block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500
              }}
            >
              Customer care
            </span>
            <nav className="flex flex-col gap-3">
              <Link
                to="/reviews"
                className="transition-all duration-200 text-base hover:opacity-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Reviews
              </Link>
              <span
                className="text-base cursor-default"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Privacy Policy
              </span>
              <span
                className="text-base cursor-default"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Terms of Service
              </span>
              <span
                className="text-base cursor-default"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.8
                }}
              >
                Shipping Info
              </span>
            </nav>
          </div>

          <div className="space-y-4">
            <span
              className="text-lg block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500
              }}
            >
              Connect with us
            </span>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 luxury-shadow"
                style={{
                  backgroundColor: 'hsl(var(--cream) / 0.15)'
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" style={{ color: 'hsl(var(--cream))' }} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 luxury-shadow"
                style={{
                  backgroundColor: 'hsl(var(--cream) / 0.15)'
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" style={{ color: 'hsl(var(--cream))' }} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 luxury-shadow"
                style={{
                  backgroundColor: 'hsl(var(--cream) / 0.15)'
                }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" style={{ color: 'hsl(var(--cream))' }} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8"
          style={{
            borderColor: 'hsl(var(--cream) / 0.15)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p
              className="text-sm text-center md:text-left"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                opacity: 0.7
              }}
            >
              &copy; 2026 Nadeel. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span
                className="text-sm transition-all cursor-default hover:opacity-90"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.7
                }}
              >
                Privacy Policy
              </span>
              <span
                className="text-sm transition-all cursor-default hover:opacity-90"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  opacity: 0.7
                }}
              >
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;